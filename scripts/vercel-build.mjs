// Build usado só na Vercel (definido em vercel.json como buildCommand).
// O schema do repositório aponta para SQLite (zero-config em desenvolvimento
// local); em produção trocamos o provider para Postgres antes de gerar o
// client e sincronizar o schema — sem precisar manter dois arquivos de schema.
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const schemaPath = "prisma/schema.prisma";
const schema = readFileSync(schemaPath, "utf-8")
  .replace('provider = "sqlite"', 'provider = "postgresql"\n  directUrl = env("DATABASE_URL_UNPOOLED")');
writeFileSync(schemaPath, schema);

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run("npx prisma generate");
run("npx prisma db push --skip-generate");
run("npx tsx prisma/seed.ts");
run("next build");
