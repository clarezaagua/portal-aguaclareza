import Image from "next/image";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { SECOES, STATUS_MATERIA } from "@/lib/constants";
import type { Materia } from "@prisma/client";

export function MateriaForm({
  materia,
  action,
}: {
  materia?: Materia | null;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-8">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input label="Título" name="titulo" defaultValue={materia?.titulo} required />
        </div>

        <Select label="Seção" name="secao" defaultValue={materia?.secao ?? "CIDADE"} required>
          {SECOES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>

        <Input label="Tag (opcional)" name="tag" placeholder="Ex: Pix, Infraestrutura" defaultValue={materia?.tag ?? ""} />

        <div className="md:col-span-2">
          <Textarea
            label="Resumo (aparece no card da home)"
            name="resumo"
            defaultValue={materia?.resumo ?? ""}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Corpo da matéria (opcional — texto completo da página da matéria)"
            name="corpo"
            rows={10}
            defaultValue={materia?.corpo ?? ""}
          />
        </div>

        <Input
          label="Link externo (opcional, no lugar da página da matéria)"
          name="link"
          type="url"
          placeholder="https://..."
          defaultValue={materia?.link ?? ""}
        />

        <Select label="Status" name="status" defaultValue={materia?.status ?? "PUBLICADO"} required>
          {STATUS_MATERIA.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" name="destaque" defaultChecked={materia?.destaque} />
            Destaque
          </label>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Imagem</h3>
        {materia?.imagemUrl && (
          <div className="mb-3 flex items-center gap-4">
            <div className="relative h-20 w-32 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              <Image src={materia.imagemUrl} alt="" fill className="object-cover" sizes="128px" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="removerImagem" />
              Remover imagem atual
            </label>
          </div>
        )}
        <input
          type="file"
          name="imagem"
          accept="image/*"
          className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
        />
      </section>

      <div className="flex justify-end gap-3">
        <Button type="submit">{materia ? "Salvar alterações" : "Cadastrar matéria"}</Button>
      </div>
    </form>
  );
}
