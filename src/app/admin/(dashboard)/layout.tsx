import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutAction } from "./logout-action";
import { LayoutDashboard, Newspaper, LogOut, ExternalLink } from "lucide-react";

// Painel autenticado: nunca deve ser pré-renderizado estaticamente.
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/materias", label: "Matérias", icon: Newspaper },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-60 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <span className="text-lg font-semibold text-slate-900">Águaclareza</span>
          <p className="text-xs text-slate-500">Painel administrativo</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <ExternalLink size={18} />
            Ver o site
          </a>
        </nav>
        <div className="border-t border-slate-200 p-3">
          <p className="truncate px-3 text-xs text-slate-500">{session?.user?.email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogOut size={18} />
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
