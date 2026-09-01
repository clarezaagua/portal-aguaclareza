import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { SECOES, STATUS_MATERIA, labelFor } from "@/lib/constants";
import { Plus, Newspaper } from "lucide-react";

export default async function MateriasPage() {
  const materias = await prisma.materia.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Matérias</h1>
        <Link
          href="/admin/materias/novo"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Nova matéria
        </Link>
      </div>

      {materias.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <Newspaper className="mx-auto mb-3 text-slate-300" size={40} />
          Nenhuma matéria cadastrada ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materias.map((m) => {
            const secao = SECOES.find((s) => s.value === m.secao);
            const status = STATUS_MATERIA.find((s) => s.value === m.status);
            return (
              <Link
                key={m.id}
                href={`/admin/materias/${m.id}`}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-video w-full bg-slate-100">
                  {m.imagemUrl ? (
                    <Image src={m.imagemUrl} alt={m.titulo} fill className="object-cover" sizes="360px" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <Newspaper size={32} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge color={secao?.color}>{secao?.label}</Badge>
                    <Badge color={status?.color}>{status?.label}</Badge>
                  </div>
                  <h2 className="truncate font-medium text-slate-900">{m.titulo}</h2>
                  <p className="line-clamp-2 text-sm text-slate-500">{m.resumo}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    {labelFor(SECOES, m.secao)}
                    {m.tag ? ` · ${m.tag}` : ""}
                    {m.destaque ? " · destaque" : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
