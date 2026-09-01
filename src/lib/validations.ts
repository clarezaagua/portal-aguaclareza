import { z } from "zod";

const optionalString = z
  .string()
  .optional()
  .transform((v) => (v && v.trim() !== "" ? v.trim() : undefined));

export const materiaSchema = z.object({
  secao: z.enum(["ALERTA", "CIDADE", "UTILIDADE"]),
  tag: optionalString,
  titulo: z.string().min(3, "Informe um título"),
  resumo: z.string().min(10, "Informe um resumo"),
  corpo: optionalString,
  link: optionalString,
  destaque: z.coerce.boolean().optional(),
  status: z.enum(["PUBLICADO", "RASCUNHO"]),
});
