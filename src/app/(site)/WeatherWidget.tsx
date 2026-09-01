"use client";

import { useEffect, useState } from "react";

const LAT = -20.4486;
const LON = -52.8761;
const FUSO = "America/Campo_Grande";

function wmo(c: number): [string, string] {
  if (c === 0) return ["Céu limpo", "☀️"];
  if ([1, 2].includes(c)) return ["Sol entre nuvens", "🌤️"];
  if (c === 3) return ["Nublado", "☁️"];
  if ([45, 48].includes(c)) return ["Névoa", "🌫️"];
  if ([51, 53, 55, 56, 57].includes(c)) return ["Garoa", "🌦️"];
  if ([61, 63, 65, 80, 81, 82].includes(c)) return ["Chuva", "🌧️"];
  if ([66, 67].includes(c)) return ["Chuva gelada", "🌧️"];
  if ([71, 73, 75, 77, 85, 86].includes(c)) return ["Neve", "❄️"];
  if ([95, 96, 99].includes(c)) return ["Tempestade", "⛈️"];
  return ["Tempo instável", "🌥️"];
}

type Estado =
  | { status: "carregando" }
  | { status: "erro" }
  | { status: "ok"; temp: number; desc: string; icone: string; max: number; min: number };

export function WeatherWidget() {
  const [estado, setEstado] = useState<Estado>({ status: "carregando" });

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(FUSO)}`;

    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        const [desc, icone] = wmo(j.current.weather_code);
        setEstado({
          status: "ok",
          temp: Math.round(j.current.temperature_2m),
          desc,
          icone,
          max: Math.round(j.daily.temperature_2m_max[0]),
          min: Math.round(j.daily.temperature_2m_min[0]),
        });
      })
      .catch(() => setEstado({ status: "erro" }));
  }, []);

  if (estado.status === "erro") {
    return (
      <div className="weather err">
        <div className="ico">🌡️</div>
        <div>
          <div className="desc">Não foi possível carregar o tempo agora.</div>
          <div className="sub">Tente novamente em instantes.</div>
        </div>
      </div>
    );
  }

  if (estado.status === "carregando") {
    return (
      <div className="weather">
        <div className="ico">⏳</div>
        <div>
          <div className="temp">--°</div>
          <div className="desc">Carregando o tempo…</div>
        </div>
        <div className="loc">
          <b>Água Clara</b>
          <span>Mato Grosso do Sul</span>
        </div>
      </div>
    );
  }

  return (
    <div className="weather">
      <div className="ico">{estado.icone}</div>
      <div>
        <div className="temp">{estado.temp}°</div>
        <div className="desc">{estado.desc}</div>
        <div className="sub">
          Máxima {estado.max}° · mínima {estado.min}°
        </div>
      </div>
      <div className="loc">
        <b>Água Clara</b>
        <span>Mato Grosso do Sul</span>
      </div>
    </div>
  );
}
