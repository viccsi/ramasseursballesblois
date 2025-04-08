let jeuJ1 = 0;
let jeuJ2 = 0;
let ptsJ1 = 0;
let ptsJ2 = 0;
let serveur = 1;
let joueurQuiMarque = 1;
let statut = 1;

// Solutions à vérifier
let soljeuJ1 = 0;
let soljeuJ2 = 0;
let solptsJ1 = 0;
let solptsJ2 = 0;
let solServ = 0;
let solCote = 0;

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

  // Génération des points initiaux
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

  calculerSolution();
  majInterface();
}

function calculerSolution() {
  // Copie des scores et états actuels
  let tempPtsJ1 = ptsJ1;
  let tempPtsJ2 = ptsJ2;
  let tempJeuJ1 = jeuJ1;
  let tempJeuJ2 = jeuJ2;
  let tempServeur = serveur;
  let tempStatut = 1;
  let tempSolServ = 0;
  let tempSolCote = 0;

  // Le joueur marque le point
  if (joueurQuiMarque === 1) tempPtsJ1++;
  else tempPtsJ2++;

  // Déroulement du jeu selon les règles
  if (tempPtsJ1 === 4 && tempPtsJ2 <= 2) {
    tempJeuJ1++;
    tempPtsJ1 = 0;
    tempPtsJ2 = 0;
    tempStatut = 0;
  } else if (tempPtsJ1 > 5) {
    tempJeuJ1++;
    tempPtsJ1 = 0;
    tempPtsJ2 = 0;
    tempStatut = 0;
  } else if (tempPtsJ2 === 4 && tempPtsJ1 <= 2) {
    tempJeuJ2++;
    tempPtsJ1 = 0;
    tempPtsJ2 = 0;
    tempStatut = 0;
  } else if (tempPtsJ2 > 5) {
    tempJeuJ2++;
    tempPtsJ1 = 0;
    tempPtsJ2 = 0;
    tempStatut = 0;
  }

  // Passage à égalité
  if (tempPtsJ1 === 4 && tempPtsJ2 === 4) {
    tempPtsJ1 = 3;
    tempPtsJ2 = 3;
  }

  // Changement de serveur ou de côté ?
  if (tempStatut === 0) {
    tempServeur = tempServeur === 1 ? 2 : 1;
    tempSolServ = 1;
    if ((tempJeuJ1 + tempJeuJ2) % 2 === 1) {
      tempSolCote = 1;
    }
  }

  // Stocker dans les vraies variables de solution
  soljeuJ1 = tempJeuJ1;
  soljeuJ2 = tempJeuJ2;
  solptsJ1 = tempPtsJ1;
  solptsJ2 = tempPtsJ2;
  solServ = tempSolServ;
  solCote = tempSolCote;
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
    msg += `❌ Score incorrect<br>`;
    msg += `Bonne réponse : ${soljeuJ1}-${soljeuJ2}, ${afficherScore(solptsJ1)}-${afficherScore(solptsJ2)}<br>`;
  }
  if (parseInt(repServ) === serveur) {
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
