# Águaclareza

Portal de notícias e utilidade pública para Água Clara e região (MS), com painel
administrativo para publicar matérias sem precisar mexer em código.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Prisma 6** + SQLite em desenvolvimento (trocar para PostgreSQL em produção — veja abaixo)
- **NextAuth v5** (login com email/senha) para proteger o painel `/admin`
- **sharp** para otimizar as imagens enviadas (convertidas para `.webp`)
- **Vercel Blob** para armazenar as imagens em produção (a Vercel não mantém
  arquivos em disco entre execuções)

## Como rodar localmente

```bash
npm install
npm run seed   # cria o usuário admin (admin@aguaclareza.com / admin123)
npm run dev
```

Ou simplesmente rode `start.bat` (Windows), que faz tudo isso automaticamente.

Acesse:
- Portal público: http://localhost:3000
- Painel administrativo: http://localhost:3000/admin/login

As credenciais do usuário criado pelo seed podem ser trocadas antes de rodar
`npm run seed`, definindo `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD` no `.env`.

## Estrutura

- `src/app/(site)` — portal público (home com as seções Alerta Golpe, Utilidade
  pública e Cidade & Região, clima ao vivo via Open-Meteo, página de matéria)
- `src/app/admin` — painel administrativo (protegido por login)
  - `materias` — cadastro de matérias: título, seção, tag, resumo, corpo,
    imagem de capa, link externo opcional, destaque e status
    (publicado/rascunho)
- `prisma/schema.prisma` — modelo de dados
- `src/lib/` — helpers (Prisma client, auth, upload de imagem, validações)

## Banco de dados

Por padrão o projeto usa **SQLite** (`prisma/dev.db`), para zero configuração
local. Para produção na Vercel, é necessário Postgres (o disco da Vercel é
somente leitura/efêmero):

1. Na Vercel, crie um banco **Postgres** pela aba *Storage* do projeto (usa
   Neon por baixo dos panos) e conecte ao projeto — isso já injeta
   `DATABASE_URL` nas variáveis de ambiente automaticamente.
2. Troque `provider = "sqlite"` para `provider = "postgresql"` em
   `prisma/schema.prisma` antes do deploy (o schema não usa nenhum recurso
   exclusivo do SQLite).
3. Rode `npx prisma migrate deploy` apontando para o banco de produção (ou
   deixe como parte do comando de build na Vercel).

## Imagens das matérias

Em desenvolvimento, as imagens enviadas pelo painel ficam em `public/uploads`
(ignorado pelo git). Em produção, quando a variável `BLOB_READ_WRITE_TOKEN`
está definida (preenchida automaticamente ao conectar um **Blob Store** na
aba *Storage* da Vercel), as imagens vão para o Vercel Blob em vez do disco.

## Variáveis de ambiente (`.env`)

Veja `.env.example`. As principais:

- `DATABASE_URL` — conexão do banco
- `AUTH_SECRET` — chave usada pelo NextAuth para assinar sessões (gere uma nova em produção)
- `BLOB_READ_WRITE_TOKEN` — preenchido automaticamente pela Vercel ao conectar um Blob Store
