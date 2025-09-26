# Compteur de clics animé

Mini-projet React + Flask / localStorage.  
Clique sur la bulle pour incrémenter un compteur animé.

## Fonctionnalités
- Compteur animé avec "pop" à chaque clic
- Réinitialisation du compteur
- Copier le score dans le presse-papiers
- Sauvegarde en localStorage ou via backend Flask

## Installation

**Backend (Flask)**
```bash
cd comp_clic
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors
cd src
python3 app.py
````

**Frontend (React)**

```bash
cd comp_clic
npm install
npm start
```

* Frontend : [http://localhost:3000](http://localhost:3000)
* Backend : [http://localhost:5002](http://localhost:5002)
* Pour activer Flask dans `Counter.js` :

```js
const SERVER_ENABLED = true;
```

* Proxy React dans `package.json` : `"proxy": "http://localhost:5002"`

## Structure

```
comp_clic/
├─ src/
│  ├─ app.py
│  ├─ Counter.js
│  └─ App.js
├─ package.json
├─ venv/
└─ README.md
```

💡 Astuce : Clique sur la bulle, vérifie le score dans `localStorage` ou avec `curl http://localhost:5002/api/count`.

```



