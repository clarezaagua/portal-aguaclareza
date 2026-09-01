import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const EXEMPLOS = [
  {
    secao: "ALERTA",
    tag: "Pix",
    titulo: "“Recebi por engano, me devolve”",
    resumo:
      "Mandam um falso comprovante de Pix e pedem a devolução. O dinheiro nunca entrou na sua conta — confira no app antes de devolver.",
  },
  {
    secao: "ALERTA",
    tag: "WhatsApp",
    titulo: "Clonagem de conta",
    resumo:
      "Pedem o código de 6 dígitos que chegou no seu SMS. Nunca passe esse código e ative a verificação em duas etapas.",
  },
  {
    secao: "CIDADE",
    tag: "Infraestrutura",
    titulo: "Título da matéria principal",
    resumo: "Um resumo de duas linhas, em linguagem simples, sempre baseado em fonte oficial ou apuração própria.",
  },
  {
    secao: "UTILIDADE",
    tag: "Serviços",
    titulo: "Horário do posto e da prefeitura",
    resumo: "Atendimentos, telefones úteis e onde resolver cada serviço sem dar voltas.",
  },
];

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@aguaclareza.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name: "Administrador", email, passwordHash, role: "ADMIN" },
    });
    console.log(`Usuário admin criado: ${email} / senha: ${password}`);
  } else {
    console.log(`Usuário admin já existe: ${email}`);
  }

  const totalMaterias = await prisma.materia.count();
  if (totalMaterias === 0) {
    await prisma.materia.createMany({ data: EXEMPLOS });
    console.log(`${EXEMPLOS.length} matérias de exemplo criadas.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
