"use server";

import { prisma } from "@/lib/prisma";
import { materiaSchema } from "@/lib/validations";
import { saveUploadedImage, deleteImageFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseMateriaForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = materiaSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }
  return { ...parsed.data, destaque: !!parsed.data.destaque };
}

export async function createMateria(formData: FormData) {
  const data = parseMateriaForm(formData);

  const imagem = formData.get("imagem") as File | null;
  const imagemUrl = imagem && imagem.size > 0 ? await saveUploadedImage(imagem) : null;

  const materia = await prisma.materia.create({ data: { ...data, imagemUrl } });

  revalidatePath("/admin/materias");
  revalidatePath("/");
  redirect(`/admin/materias/${materia.id}`);
}

export async function updateMateria(id: string, formData: FormData) {
  const data = parseMateriaForm(formData);

  const imagem = formData.get("imagem") as File | null;
  const removerImagem = formData.get("removerImagem") === "on";

  const atual = await prisma.materia.findUnique({ where: { id } });

  let imagemUrl = atual?.imagemUrl ?? null;
  if (imagem && imagem.size > 0) {
    await deleteImageFile(atual?.imagemUrl);
    imagemUrl = await saveUploadedImage(imagem);
  } else if (removerImagem) {
    await deleteImageFile(atual?.imagemUrl);
    imagemUrl = null;
  }

  await prisma.materia.update({ where: { id }, data: { ...data, imagemUrl } });

  revalidatePath("/admin/materias");
  revalidatePath(`/admin/materias/${id}`);
  revalidatePath("/");
}

export async function deleteMateria(formData: FormData) {
  const id = formData.get("id") as string;

  const materia = await prisma.materia.findUnique({ where: { id } });
  if (materia) await deleteImageFile(materia.imagemUrl);

  await prisma.materia.delete({ where: { id } });

  revalidatePath("/admin/materias");
  revalidatePath("/");
  redirect("/admin/materias");
}
