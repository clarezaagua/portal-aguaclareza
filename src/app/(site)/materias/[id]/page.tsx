import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SECOES, labelFor } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const materia = await prisma.materia.findUnique({ where: { id } });
  if (!materia) return {};
  return { title: `${materia.titulo} · Águaclareza`, description: materia.resumo };
}

export default async function MateriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const materia = await prisma.materia.findUnique({ where: { id } });

  if (!materia || materia.status !== "PUBLICADO") notFound();

  const paragrafos = (materia.corpo || materia.resumo)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="block materia">
      <div className="wrap">
        <a className="voltar" href="/">
          ← Voltar para a home
        </a>
        <span className="meta">
          {labelFor(SECOES, materia.secao)}
          {materia.tag ? ` · ${materia.tag}` : ""}
        </span>
        <h1>{materia.titulo}</h1>
        {materia.imagemUrl && (
          <div className="relative capa">
            <Image src={materia.imagemUrl} alt={materia.titulo} fill className="object-cover" sizes="760px" />
          </div>
        )}
        <div className="corpo">
          {paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
