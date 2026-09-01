import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { WeatherWidget } from "./WeatherWidget";
import type { Materia } from "@prisma/client";

function Ripple() {
  return (
    <div className="ripple" aria-hidden="true">
      <svg viewBox="0 0 1200 14" preserveAspectRatio="none">
        <path
          d="M0 7 Q150 0 300 7 T600 7 T900 7 T1200 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".5"
        />
      </svg>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8 1 .8 1.7 1.1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.2.1.7-.1 1.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function cardHref(m: Materia) {
  return m.link || `/materias/${m.id}`;
}

function isExterno(m: Materia) {
  return !!m.link;
}

function CardAlerta({ m }: { m: Materia }) {
  const inner = (
    <>
      {m.tag && <span className="tag">{m.tag}</span>}
      <h3>{m.titulo}</h3>
      <p>{m.resumo}</p>
    </>
  );
  return isExterno(m) ? (
    <a className="acard" href={cardHref(m)} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <Link className="acard" href={cardHref(m)}>
      {inner}
    </Link>
  );
}

function CardLight({ m }: { m: Materia }) {
  const inner = (
    <>
      {m.imagemUrl && (
        <div className="relative -mx-6 -mt-6 mb-1 overflow-hidden rounded-t-[10px]" style={{ aspectRatio: "16/9" }}>
          <Image src={m.imagemUrl} alt="" fill className="object-cover" sizes="360px" />
        </div>
      )}
      {m.tag && <span className="meta">{m.tag}</span>}
      <h3>{m.titulo}</h3>
      <p>{m.resumo}</p>
    </>
  );
  return isExterno(m) ? (
    <a className="card" href={cardHref(m)} target="_blank" rel="noopener">
      {inner}
    </a>
  ) : (
    <Link className="card" href={cardHref(m)}>
      {inner}
    </Link>
  );
}

export default async function HomePage() {
  const materias = await prisma.materia.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { publicadoEm: "desc" },
  });

  const alerta = materias.filter((m) => m.secao === "ALERTA");
  const cidade = materias.filter((m) => m.secao === "CIDADE");
  const utilidade = materias.filter((m) => m.secao === "UTILIDADE");

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">Jornalismo de bairro, feito direito</span>
          <h1>
            A nossa cidade, com <em>clareza</em>.
          </h1>
          <p className="lead">
            Notícias e utilidade pública para Água Clara e a região. <b>Informação independente e cuidadosa</b>,
            feita para servir à sua família, todos os dias.
          </p>
          <div className="cta-row">
            <a className="btn btn-wa" href="#">
              <WhatsAppIcon />
              Entrar no canal do WhatsApp
            </a>
            <a className="btn btn-ig" href="https://instagram.com/agua.clareza" target="_blank" rel="noopener">
              <InstagramIcon />
              Seguir no Instagram
            </a>
          </div>
        </div>
      </section>

      <Ripple />

      <section className="block" id="utilidade">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="label">Pra usar hoje</span>
              <h2>Utilidade pública</h2>
              <p>O tempo agora e os serviços que você precisa para resolver o dia.</p>
            </div>
          </div>
          <WeatherWidget />
          <div className="cards" style={{ marginTop: 20 }}>
            {utilidade.length === 0 ? (
              <div className="empty">Nenhum serviço cadastrado ainda.</div>
            ) : (
              utilidade.map((m) => <CardLight key={m.id} m={m} />)
            )}
          </div>
        </div>
      </section>

      <Ripple />

      <section className="block alerta" id="alerta">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="label">Série diária</span>
              <h2>Alerta Golpe</h2>
              <p>Todo dia, um golpe digital explicado de um jeito simples — para você e os seus não caírem.</p>
            </div>
          </div>
          <div className="cards">
            {alerta.length === 0 ? (
              <div className="empty">Nenhum alerta publicado ainda.</div>
            ) : (
              alerta.map((m) => <CardAlerta key={m.id} m={m} />)
            )}
          </div>
        </div>
      </section>

      <Ripple />

      <section className="block" id="cidade">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="label">Acontece aqui</span>
              <h2>Cidade &amp; Região</h2>
              <p>O dia a dia de Água Clara e dos municípios vizinhos.</p>
            </div>
          </div>
          <div className="grid2">
            {cidade.length === 0 ? (
              <div className="empty">Nenhuma notícia publicada ainda.</div>
            ) : (
              cidade.map((m) => <CardLight key={m.id} m={m} />)
            )}
          </div>
        </div>
      </section>

      <section className="block voz" id="voz">
        <div className="wrap">
          <div className="panel">
            <div className="txt">
              <span className="label">Voz da comunidade</span>
              <h2>Viu algo que a cidade precisa saber?</h2>
              <p>
                Buraco na rua, golpe novo circulando, um evento do bairro. Mande pra gente — a pauta da cidade nasce
                de quem mora nela.
              </p>
            </div>
            <div>
              <a className="btn btn-wa" href="#">
                <WhatsAppIcon />
                Enviar pauta no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Ripple />

      <section className="block sobre" id="sobre">
        <div className="wrap">
          <span className="label">Quem somos</span>
          <h2>A nossa cidade merece informação de qualidade.</h2>
          <p>
            O Águaclareza existe por uma ideia simples: Água Clara e a região merecem um canal sério, organizado e
            feito com cuidado — que ajude o morador a se informar, participar e resolver o dia a dia.
          </p>
          <p>Quando publicamos, é com fato e fonte. Quando erramos, corrigimos. O resto é a cidade conversando com ela mesma.</p>
          <span className="pledge">Informação independente, a serviço de quem mora aqui.</span>
        </div>
      </section>
    </>
  );
}
