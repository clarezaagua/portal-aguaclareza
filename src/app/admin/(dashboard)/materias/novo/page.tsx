import { MateriaForm } from "../MateriaForm";
import { createMateria } from "../actions";

export default function NovaMateriaPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Nova matéria</h1>
      <MateriaForm action={createMateria} />
    </div>
  );
}
