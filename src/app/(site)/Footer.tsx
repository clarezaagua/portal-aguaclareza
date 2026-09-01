export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="grid">
          <div style={{ maxWidth: 280 }}>
            <span className="logo">
              <b>Água</b>clareza
            </span>
            <p style={{ marginTop: 12 }}>
              Notícias e utilidade pública para Água Clara e região — Mato Grosso do Sul.
            </p>
            <div className="social" style={{ marginTop: 18 }}>
              <a href="https://instagram.com/agua.clareza" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61591511755630"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Seções</h4>
            <ul>
              <li>
                <a href="/#alerta">Alerta Golpe</a>
              </li>
              <li>
                <a href="/#utilidade">Utilidade pública</a>
              </li>
              <li>
                <a href="/#cidade">Cidade &amp; Região</a>
              </li>
              <li>
                <a href="/#voz">Participe</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a href="#">WhatsApp da redação</a>
              </li>
              <li>
                <a href="#">E-mail</a>
              </li>
              <li>
                <a href="/#sobre">Sobre o Águaclareza</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© {new Date().getFullYear()} Águaclareza · Água Clara, MS. Feito de forma independente.</span>
          <span>Notícia limpa. Informação que serve.</span>
        </div>
      </div>
    </footer>
  );
}
