import { Header } from "./Header";
import { Footer } from "./Footer";

function hojeExtenso() {
  const d = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return "Água Clara · MS — " + d.charAt(0).toUpperCase() + d.slice(1);
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>{hojeExtenso()}</span>
          <span className="indep">Notícia limpa · informação que serve</span>
        </div>
      </div>
      <Header />
      {children}
      <Footer />
    </>
  );
}
