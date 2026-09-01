import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MateriaForm } from "../MateriaForm";
import { updateMateria, deleteMateria } from "../actions";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { Card } from "@/components/ui/Card";

export default async function EditarMateriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const materia = await prisma.materia.findUnique({ where: { id } });
  if (!materia) notFound();

  const updateWithId = updateMateria.bind(null, id);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{materia.titulo}</h1>
        <Link href="/admin/materias" className="text-sm text-slate-500 hover:underline">
          Voltar para a lista
        </Link>
      </div>

      <Card>
        <MateriaForm materia={materia} action={updateWithId} />
      </Card>

      <Card className="border-red-200">
        <h2 className="mb-2 text-lg font-medium text-red-700">Excluir matéria</h2>
        <p className="mb-4 text-sm text-slate-500">Remove a matéria e sua imagem permanentemente.</p>
        <form action={deleteMateria}>
          <input type="hidden" name="id" value={materia.id} />
          <DeleteButton label="Excluir matéria" confirmMessage="Excluir esta matéria?" />
        </form>
      </Card>
    </div>
  );
}
