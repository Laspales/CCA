import React, { useState, useEffect } from "react";

const SERVER_ENABLED = true; 

export default function Counter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("clickCounter");
    return saved ? Number(saved) : 0;
  });
  const [popping, setPopping] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("clickCounter", String(count));
  }, [count]);

  useEffect(() => {
    if (SERVER_ENABLED) {
      // récupération initiale depuis le serveur
      setLoading(true);
      fetch("/api/count")
        .then((r) => r.json())
        .then((data) => {
          if (typeof data.count === "number") setCount(data.count);
        })
        .catch((e) => console.warn("Erreur fetch count:", e))
        .finally(() => setLoading(false));
    }
  }, []);

  function handleClick() {
    setCount((c) => c + 1);
    setPopping(true);
    setTimeout(() => setPopping(false), 200);

    if (SERVER_ENABLED) {
      fetch("/api/increment", { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          if (typeof data.count === "number") setCount(data.count);
        })
        .catch((e) => console.warn("Erreur incrément serveur:", e));
    }
  }

  function handleReset() {
    if (!window.confirm("Réinitialiser le compteur ?")) return;
    setCount(0);
    if (SERVER_ENABLED) {
      fetch("/api/reset", { method: "POST" })
        .then((r) => r.json())
        .then((data) => {
          if (typeof data.count === "number") setCount(data.count);
        })
        .catch((e) => console.warn("Erreur reset serveur:", e));
    } else {
      localStorage.removeItem("clickCounter");
    }
  }

  return (
    <div className="counter-container">
      <div className={`bubble ${popping ? "pop" : ""}`} onClick={handleClick} role="button" tabIndex={0}>
        <div className="count">{loading ? "..." : count}</div>
        <div className="label">Clique ici</div>
      </div>

      <div className="controls">
        <button onClick={handleReset}>Réinitialiser</button>
        <button onClick={() => {
          const text = `Score: ${count} clics`;
          navigator.clipboard?.writeText(text).then(() => alert("Copié !"), () => alert("Impossible de copier"));
        }}>Copier</button>
      </div>

      <style jsx="true">{`
        .counter-container { display:flex; flex-direction:column; align-items:center; gap:12px; }
        .bubble {
          width:160px;
          height:160px;
          border-radius:50%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          cursor:pointer;
          user-select:none;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
          background: linear-gradient(180deg, #fff, #f0f4ff);
        }
        .bubble:hover { transform: translateY(-4px); box-shadow: 0 10px 22px rgba(0,0,0,0.14); }
        .bubble.pop { animation: pop 160ms ease; }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.16); }
          100% { transform: scale(1); }
        }
        .count { font-size:36px; font-weight:700; }
        .label { font-size:14px; color:#444; margin-top:6px; }
        .controls { display:flex; gap:8px; }
        button { padding:8px 12px; border-radius:8px; border:1px solid #ddd; background:#fff; cursor:pointer; }
      `}</style>
    </div>
  );
}
