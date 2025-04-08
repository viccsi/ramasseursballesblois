let jeuJ1 = 0;
let jeuJ2 = 0;
let ptsJ1 = 0;
let ptsJ2 = 0;
let soljeuJ1 = 0;
let soljeuJ2 = 0;
let solptsJ1 = 0;
let solptsJ2 = 0;
let serveur = 1;
let solServ = 0;
let solCote = 0;
let joueurQuiMarque = 1;
let statut = 1;

function afficherScore(pts) {
  switch (pts) {
    case 0: return "0";
    case 1: return "15";
    case 2: return "30";
    case 3: return "40";
    case 4: return "/";
    case 5: return "AD";
    default: return "?";
  }
}

function genererScore() {
  jeuJ1 = Math.floor(Math.random() * 5);
  jeuJ2 = Math.floor(Math.random() * 3);
  serveur = Math.random() < 0.5 ? 1 : 2;
  solServ = 0;
  solCote = 0;
  statut = 1;

  ptsJ1 = Math.floor(Math.random() * 6);
  if (ptsJ1 === 4) {
    ptsJ2 = 5;
  } else if (ptsJ1 === 5) {
    ptsJ2 = 4;
  } else {
    ptsJ2 = Math.floor(Math.random() * 4);
  }

  joueurQuiMarque = Math.random() < 0.5 ? 1 : 2;
  document.getElementById("question").innerText = `Quel sera le score si le Joueur ${joueurQuiMarque} marque le point ?`;

  resolveScore();
  majInterface();
}

function resolveScore() {
  if (joueurQuiMarque === 1) ptsJ1++;
  else ptsJ2++;

  if (ptsJ1 === 4 && ptsJ2 <= 2) {
    jeuJ1++;
    statut = 0;
  } else if (ptsJ1 > 5) {
    jeuJ1++;
    statut = 0;
  } else if (ptsJ2 === 4 && ptsJ1 <= 2) {
    jeuJ2++;
    statut = 0;
  } else if (ptsJ2 > 5) {
    jeuJ2++;
    statut = 0;
  } else if (ptsJ1 === 4 && ptsJ2 === 4) {
    ptsJ1 = 3;
    ptsJ2 = 3;
  }

  soljeuJ1 = jeuJ1;
  soljeuJ2 = jeuJ2;
  solptsJ1 = ptsJ1;
  solptsJ2 = ptsJ2;

  if (statut === 0) {
    serveur = serveur === 1 ? 2 : 1;
    solServ = 1;
    if ((jeuJ1 + jeuJ2) % 2 === 1) {
      solCote = 1;
    }
    statut = 1;
  }
}

function majInterface() {
  document.getElementById("jeuJ1").innerText = jeuJ1;
  document.getElementById("jeuJ2").innerText = jeuJ2;
  document.getElementById("ptsJ1").innerText = afficherScore(ptsJ1);
  document.getElementById("ptsJ2").innerText = afficherScore(ptsJ2);
  document.getElementById("serve1").style.display = serveur === 1 ? "inline-block" : "none";
  document.getElementById("serve2").style.display = serveur === 2 ? "inline-block" : "none";
}

function verifierReponse() {
  let repJeuJ1 = parseInt(document.getElementById("repJeuJ1").value);
  let repJeuJ2 = parseInt(document.getElementById("repJeuJ2").value);
  let repPtsJ1 = parseInt(document.getElementById("repPtsJ1").value);
  let repPtsJ2 = parseInt(document.getElementById("repPtsJ2").value);
  let repServ = document.getElementById("repServ").value;
  let repCote = document.getElementById("repCote").value;

  let msg = "";

  if (repJeuJ1 === soljeuJ1 && repJeuJ2 === soljeuJ2 && repPtsJ1 === solptsJ1 && repPtsJ2 === solptsJ2) {
    msg += "✅ Score juste<br>";
  } else {
    msg += "❌ Score incorrect<br>";
  }

  if ((repServ === "non" && solServ === 0) || (repServ === "oui" && solServ === 1)) {
    msg += "✅ Serveur correct<br>";
  } else {
    msg += "❌ Erreur serveur<br>";
  }

  if ((repCote === "non" && solCote === 0) || (repCote === "oui" && solCote === 1)) {
    msg += "✅ Côté correct<br>";
  } else {
    msg += "❌ Erreur côté<br>";
  }

  document.getElementById("resultat").innerHTML = msg;
}
