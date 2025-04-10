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
let solServ = 0; // maintenant : joueur qui sert (1 ou 2)
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
  document.getElementById("resultat").innerHTML = "";

  jeuJ1 = Math.floor(Math.random() * 5);
  jeuJ2 = Math.floor(Math.random() * 3);
  serveur = Math.random() < 0.5 ? 1 : 2;
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

  calculerSolution();
  majInterface();
}

function calculerSolution() {
  
  let tempPtsJ1 = ptsJ1;
  let tempPtsJ2 = ptsJ2;
  let tempJeuJ1 = jeuJ1;
  let tempJeuJ2 = jeuJ2;
  let tempServeur = serveur;
  let tempStatut = 1;
  let tempSolCote = 0;
  let serveurApresPoint = serveur;

  if (joueurQuiMarque === 1) tempPtsJ1++;
  else tempPtsJ2++;

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

  // Passage à égalité si un joueur avait l'avantage et l'autre marque
  if (tempPtsJ1 === 5 && tempPtsJ2 === 5) {
    tempPtsJ1 = 3;
    tempPtsJ2 = 3;
  }
  if (tempStatut === 0) {
    serveurApresPoint = tempServeur === 1 ? 2 : 1;
    if ((tempJeuJ1 + tempJeuJ2) % 2 === 1) {
      tempSolCote = 1;
    }
  }
  
  // Appliquer les solutions
  soljeuJ1 = tempJeuJ1;
  soljeuJ2 = tempJeuJ2;
  solptsJ1 = tempPtsJ1;
  solptsJ2 = tempPtsJ2;
  solServ = tempStatut === 0 ? serveurApresPoint : tempServeur;
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
  let repServ = parseInt(document.getElementById("repServ").value);
  let repCote = document.getElementById("repCote").value;

  let msg = "";

  if (
    repJeuJ1 === soljeuJ1 &&
    repJeuJ2 === soljeuJ2 &&
    repPtsJ1 === solptsJ1 &&
    repPtsJ2 === solptsJ2
  ) {
    msg += "✅ Score juste<br>";
  } else {
    msg += `❌ Score incorrect<br>`;
    msg += `Bonne réponse : ${soljeuJ1}-${soljeuJ2}, ${afficherScore(solptsJ1)}-${afficherScore(solptsJ2)}<br>`;
  }

  if (repServ === solServ) {
    msg += "✅ Serveur correct<br>";
  } else {
    msg += `❌ Erreur serveur – c'était le Joueur ${solServ}<br>`;
  }

  if (
    (repCote === "non" && solCote === 0) ||
    (repCote === "oui" && solCote === 1)
  ) {
    msg += "✅ Côté correct<br>";
  } else {
    msg += "❌ Erreur côté<br>";
  }

  document.getElementById("resultat").innerHTML = msg;
}
