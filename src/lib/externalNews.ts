import Parser from "rss-parser";

const FEED_URL = "https://www.informams.com.br/rss/latest-posts";
const FONTE = "Informa MS";
const MAX_ITEMS = 6;

export type NoticiaExterna = {
  titulo: string;
  resumo: string;
  link: string;
  data: string | undefined;
  fonte: string;
};

const parser = new Parser();

// Notícias de terceiros: só título + resumo curto + link para a fonte
// original (nunca o conteúdo completo) — evita republicar matéria alheia
// como se fosse nossa.
export async function getNoticiasExternas(): Promise<NoticiaExterna[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 900 } });
    if (!res.ok) return [];

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    return (feed.items ?? []).slice(0, MAX_ITEMS).map((item) => ({
      titulo: item.title?.trim() ?? "",
      resumo: (item.contentSnippet ?? "").trim().slice(0, 160),
      link: item.link ?? "",
      data: item.isoDate ?? item.pubDate,
      fonte: FONTE,
    }));
  } catch {
    return [];
  }
}
