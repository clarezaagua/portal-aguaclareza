"use client";

import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site">
      <div className="wrap">
        <a className="brand" href="/" aria-label="Águaclareza — página inicial">
          <span className="brandmark" aria-hidden="true">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" fill="#E8F1FC" />
              <clipPath id="hw">
                <circle cx="24" cy="24" r="22" />
              </clipPath>
              <g clipPath="url(#hw)" fill="none" strokeWidth="3.4" strokeLinecap="round">
                <path d="M0,17 Q5,12.5 10,17 T20,17 T30,17 T40,17 T50,17" stroke="#1E73D6" />
                <path d="M0,24 Q5,19.5 10,24 T20,24 T30,24 T40,24 T50,24" stroke="#EE6C4D" />
                <path d="M0,31 Q5,26.5 10,31 T20,31 T30,31 T40,31 T50,31" stroke="#1E73D6" opacity="0.65" />
              </g>
            </svg>
          </span>
          <span className="brandtext">
            <span className="logo">
              <b>Água</b>clareza
            </span>
            <small>Água Clara · Região · MS</small>
          </span>
        </a>
        <nav className={`main${open ? " open" : ""}`} id="nav">
          <a href="/#alerta" onClick={() => setOpen(false)}>
            Alerta Golpe
          </a>
          <a href="/#utilidade" onClick={() => setOpen(false)}>
            Utilidade
          </a>
          <a href="/#cidade" onClick={() => setOpen(false)}>
            Cidade &amp; Região
          </a>
          <a href="/#voz" onClick={() => setOpen(false)}>
            Participe
          </a>
          <a href="/#sobre" onClick={() => setOpen(false)}>
            Sobre
          </a>
        </nav>
        <div className="social head">
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
        <button
          className="menu-btn"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
