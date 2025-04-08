let sol = {
  jeuJ1: 0,
  jeuJ2: 0,
  ptsJ1: 0,
  ptsJ2: 0,
  serveur: 1
};

function genererScore() {
  // Génère un score aléatoire cohérent
  sol.jeuJ1 = Math.floor(Math.random() * 6);
  sol.jeuJ2 = Math.floor(Math.random() * 6);
  sol.ptsJ1 = Math.floor(Math.random() * 5);
  sol.ptsJ2 = Math.floor(Math.random() * 5);

  // Si égalité à 40, assure que AD est cohérent
  if (sol.ptsJ1 >= 3 && sol.ptsJ2 >= 3 && sol.ptsJ1 !== sol.ptsJ2) {
    if (Math.random() < 0.5) {
      sol.ptsJ1 = 4; // Avantage J1
      sol.ptsJ2 = 3;
    } else {
      sol.ptsJ1 = 3;
      sol.ptsJ2 = 4; // Avantage J2
    }
  }

  sol.serveur = Math.random() < 0.5 ? 1 : 2;

  afficherScore();
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

  if (rj1 === sol.jeuJ1 && rj2 === sol.jeuJ2) res.push("✅ Jeux corrects");
  else res.push("❌ Jeux incorrects");

  if (rp1 === sol.ptsJ1 && rp2 === sol.ptsJ2) res.push("✅ Points corrects");
  else res.push("❌ Points incorrects");

  if (rs === sol.serveur) res.push("✅ Serveur correct");
  else res.push("❌ Serveur incorrect");

  document.getElementById("resultat").innerHTML = res.join("<br>");
}
