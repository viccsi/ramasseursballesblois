let jeu_J1 = Math.floor(Math.random() * 5);
let jeu_J2 = Math.floor(Math.random() * 3);
let serveur = 1;

let pts_J1 = Math.floor(Math.random() * 5);
let pts_J2 = pts_J1 === 4 ? 5 : (pts_J1 === 5 ? 4 : Math.floor(Math.random() * 5));

let sol_jeu_j1, sol_jeu_j2, sol_pts_j1, sol_pts_j2;
let sol_serv = 0, sol_cote = 0;
let statut = 1;

function afficherPts(val) {
  return ["0", "15", "30", "40", "/", "AD"][val] || "/";
}

function majAffichage() {
  document.getElementById("jeuJ1").textContent = jeu_J1;
  document.getElementById("jeuJ2").textContent = jeu_J2;
  document.getElementById("points").textContent = `${afficherPts(pts_J1)} - ${afficherPts(pts_J2)}`;
  document.getElementById("serveJ1").style.visibility = serveur === 1 ? "visible" : "hidden";
  document.getElementById("serveJ2").style.visibility = serveur === 2 ? "visible" : "hidden";
}

function jeuPts() {
  if (pts_J1 === 4 && pts_J2 <= 2 || pts_J1 > 5) {
    jeu_J1++;
    statut = 0;
  } else if (pts_J2 === 4 && pts_J1 <= 2 || pts_J2 > 5) {
    jeu_J2++;
    statut = 0;
  } else if (pts_J1 === 4 && pts_J2 === 4) {
    pts_J1 = 3;
    pts_J2 = 3;
  }
}

function nouveauPoint() {
  let joueur = Math.random() < 0.5 ? 0 : 1;
  document.getElementById("logText").textContent = `Le J${joueur + 1} gagne le point.`;

  if (joueur === 0) pts_J1++;
  else pts_J2++;

  jeuPts();

  if (statut === 0) {
    serveur = serveur === 1 ? 2 : 1;
    sol_serv = 1;
    statut = 1;
    if ((jeu_J1 + jeu_J2) % 2 === 1) sol_cote = 1;
    pts_J1 = 0;
    pts_J2 = 0;
  }

  sol_jeu_j1 = jeu_J1;
  sol_jeu_j2 = jeu_J2;
  sol_pts_j1 = pts_J1;
  sol_pts_j2 = pts_J2;

  majAffichage();
}

function verifierReponses() {
  const rj1 = parseInt(document.getElementById("rep_jeu_j1").value);
  const rj2 = parseInt(document.getElementById("rep_jeu_j2").value);
  const rp1 = parseInt(document.getElementById("rep_pts_j1").value);
  const rp2 = parseInt(document.getElementById("rep_pts_j2").value);
  const rs = document.getElementById("rep_serv").value.trim().toLowerCase();
  const rc = document.getElementById("rep_cote").value.trim().toLowerCase();

  let res = [];

  res.push(rj1 === sol_jeu_j1 && rj2 === sol_jeu_j2 && rp1 === sol_pts_j1 && rp2 === sol_pts_j2
    ? "✅ Score correct"
    : "❌ Score incorrect");

  res.push((rs === "oui" && sol_serv === 1) || (rs === "non" && sol_serv === 0)
    ? "✅ Serveur correct"
    : "❌ Serveur incorrect");

  res.push((rc === "oui" && sol_cote === 1) || (rc === "non" && sol_cote === 0)
    ? "✅ Côté correct"
    : "❌ Côté incorrect");

  document.getElementById("resultat").innerHTML = res.join("<br>");
}
