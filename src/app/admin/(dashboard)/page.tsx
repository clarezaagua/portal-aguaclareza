import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { SECOES, labelFor } from "@/lib/constants";
import { Newspaper, Plus } from "lucide-react";

export default async function DashboardPage() {
  const [total, publicadas, rascunhos] = await Promise.all([
    prisma.materia.count(),
    prisma.materia.count({ where: { status: "PUBLICADO" } }),
    prisma.materia.count({ where: { status: "RASCUNHO" } }),
  ]);

  const recentes = await prisma.materia.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <Link
          href="/admin/materias/novo"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Nova matéria
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Total de matérias</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">{total}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Publicadas</p>
          <p className="mt-1 text-3xl font-semibold text-emerald-700">{publicadas}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Rascunhos</p>
          <p className="mt-1 text-3xl font-semibold text-slate-500">{rascunhos}</p>
        </Card>
      </div>

      <h2 className="mb-3 text-lg font-medium text-slate-900">Matérias recentes</h2>
      {recentes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <Newspaper className="mx-auto mb-3 text-slate-300" size={40} />
          Nenhuma matéria cadastrada ainda.
        </div>
      ) : (
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {recentes.map((m) => (
            <Link
              key={m.id}
              href={`/admin/materias/${m.id}`}
              className="flex items-center justify-between gap-4 px-5 py-3 hover:bg-slate-50"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">{m.titulo}</p>
                <p className="text-xs text-slate-500">{labelFor(SECOES, m.secao)}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                {new Date(m.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
