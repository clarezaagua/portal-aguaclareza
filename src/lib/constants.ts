export const SECOES = [
  { value: "ALERTA", label: "Alerta Golpe", color: "red" },
  { value: "CIDADE", label: "Cidade & Região", color: "blue" },
  { value: "UTILIDADE", label: "Utilidade pública", color: "green" },
] as const;

export const STATUS_MATERIA = [
  { value: "PUBLICADO", label: "Publicado", color: "green" },
  { value: "RASCUNHO", label: "Rascunho", color: "gray" },
] as const;

export function labelFor(
  list: readonly { value: string; label: string }[],
  value: string | null | undefined
) {
  return list.find((i) => i.value === value)?.label ?? value ?? "-";
}
