let sol = {
  jeuJ1: 0,
  jeuJ2: 0,
  ptsJ1: 0,
  ptsJ2: 0,
  serveur: 1,
  joueurQuiMarque: 1 // 1 ou 2
};

function genererScore() {
  // Score de départ (état avant le point)
  sol.jeuJ1 = Math.floor(Math.random() * 4);
  sol.jeuJ2 = Math.floor(Math.random() * 4);
  sol.ptsJ1 = Math.floor(Math.random() * 4);
  sol.ptsJ2 = Math.floor(Math.random() * 4);

  // Gestion du cas d'avantage
  if (sol.ptsJ1 === 3 && sol.ptsJ2 === 3) {
    if (Math.random() < 0.5) {
      sol.ptsJ1 = 4;
      sol.ptsJ2 = 3;
    } else {
      sol.ptsJ1 = 3;
      sol.ptsJ2 = 4;
    }
  }

  sol.serveur = Math.random() < 0.5 ? 1 : 2;
  sol.joueurQuiMarque = Math.random() < 0.5 ? 1 : 2;

  // Affichage de la situation actuelle
  afficherScore();

  // Affiche la question
  document.getElementById("question").textContent = `Quel sera le score si le Joueur ${sol.joueurQuiMarque} marque le point ?`;

  // Calculer l’état après point
  calculerReponse();
}

let solution = {};

function calculerReponse() {
  // On part d'une copie de l'état initial
  let j1 = sol.ptsJ1;
  let j2 = sol.ptsJ2;
  let jeuJ1 = sol.jeuJ1;
  let jeuJ2 = sol.jeuJ2;

  if (sol.joueurQuiMarque === 1) {
    // J1 marque
    if (j1 === 3 && j2 < 3) {
      jeuJ1++;
      j1 = 0;
      j2 = 0;
    } else if (j1 === 4) {
      jeuJ1++;
      j1 = 0;
      j2 = 0;
    } else if (j1 === 3 && j2 === 3) {
      j1 = 4; // AD
    } else if (j1 === 3 && j2 === 4) {
      j1 = 3;
      j2 = 3;
    } else {
      j1++;
    }
  } else {
    // J2 marque
    if (j2 === 3 && j1 < 3) {
      jeuJ2++;
      j1 = 0;
      j2 = 0;
    } else if (j2 === 4) {
      jeuJ2++;
      j1 = 0;
      j2 = 0;
    } else if (j1 === 3 && j2 === 3) {
      j2 = 4; // AD
    } else if (j2 === 3 && j1 === 4) {
      j1 = 3;
      j2 = 3;
    } else {
      j2++;
    }
  }

  solution = {
    jeuJ1,
    jeuJ2,
    ptsJ1: j1,
    ptsJ2: j2,
    serveur: sol.serveur
  };
}

function afficherScore() {
  document.getElementById("jeuJ1").textContent = sol.jeuJ1;
  document.getElementById("jeuJ2").textContent = sol.jeuJ2;
  document.getElementById("ptsJ1").textContent = afficherPts(sol.ptsJ1);
  document.getElementById("ptsJ2").textContent = afficherPts(sol.ptsJ2);
  document.getElementById("serveur").textContent = sol.serveur === 1 ? "J1" : "J2";
}

function afficherPts(val) {
  return ["0", "15", "30", "40", "AD"][val] || "0";
}

function verifierReponse() {
  const rj1 = parseInt(document.getElementById("rep_jeu_j1").value);
  const rj2 = parseInt(document.getElementById("rep_jeu_j2").value);
  const rp1 = parseInt(document.getElementById("rep_pts_j1").value);
  const rp2 = parseInt(document.getElementById("rep_pts_j2").value);
  const rs = parseInt(document.getElementById("rep_serv").value);

  let res = [];

  if (rj1 === solution.jeuJ1 && rj2 === solution.jeuJ2) res.push("✅ Jeux corrects");
  else res.push("❌ Jeux incorrects");

  if (rp1 === solution.ptsJ1 && rp2 === solution.ptsJ2) res.push("✅ Points corrects");
  else res.push("❌ Points incorrects");

  if (rs === solution.serveur) res.push("✅ Serveur correct");
  else res.push("❌ Serveur incorrect");

  document.getElementById("resultat").innerHTML = res.join("<br>");
}
