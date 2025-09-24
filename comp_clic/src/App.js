import React from "react";
import Counter from "./comp";

function App() {
  return (
    <div className="app">
      <h1>Compteur de clics animé</h1>
      <Counter />
      <footer style={{marginTop:20}}>Projet rapide • React + localStorage (+ option serveur)</footer>
    </div>
  );
}

export default App;
