let jeuJ1 = 0;
let jeuJ2 = 0;
let ptsJ1 = 0;
let ptsJ2 = 0;
let serveur = 1;
let solCote = 0;
let solServ = 0;
let joueurQuiMarque = 1;
let statut = 1;

function afficherScore(pts) 
{
  switch (pts) 
  {
    case 0: return "0";
    case 1: return "15";
    case 2: return "30";
    case 3: return "40";
    case 4: return "/";
    case 5: return "AD";
    default: return "?";
  }
}

function genererScore() 
{
  jeuJ1 = Math.floor(Math.random() * 6);
  jeuJ2 = Math.floor(Math.random() * 6);
  serveur = Math.random() < 0.5 ? 1 : 2;
  solServ = 0;
  solCote = 0;
  statut = 1;

  // Génération des points initiaux
  ptsJ1 = Math.floor(Math.random() * 6);
  if (ptsJ1 === 4) 
  {
    ptsJ2 = 5;
  }
  else if (ptsJ1 === 5)
  {
    ptsJ2 = 4;
  }
  else
  {
    ptsJ2 = Math.floor(Math.random() * 4);
  }
  

  // Sélection du joueur qui va marquer le point
  joueurQuiMarque = Math.random() < 0.5 ? 1 : 2;
  document.getElementById("question").innerText = `Quel sera le score si le Joueur ${joueurQuiMarque} marque le point ?`;

  // Le joueur marque le point
  if (joueurQuiMarque === 1) ptsJ1++;
  else ptsJ2++;

  // Résolution du score
  resolveScore();

  // Mise à jour UI
  majInterface();
}

function resolveScore() 
{
  if (ptsJ1 === 4 && ptsJ2 <= 2) //gestion jeu avant avantages J1
  {
    jeuJ1++;
    statut = 0;
    ptsJ1 = 0;
    ptsJ2 = 0;
  } 
  else if (ptsJ1 > 5) //gestion jeu aux avantages J1
  {
    jeuJ1++;
    statut = 0;
    ptsJ1 = 0;
    ptsJ2 = 0;
  } 
  else if (ptsJ2 === 4 && ptsJ1 <= 2) //gestion jeu avant avantages J2
  {
    jeuJ2++;
    statut = 0;
    ptsJ1 = 0;
    ptsJ2 = 0;
  } 
  else if (ptsJ2 > 5) //gestion jeu aux avantages J2
  {
    jeuJ2++;
    statut = 0;
    ptsJ1 = 0;
    ptsJ2 = 0;
  } 
  else if (ptsJ1 === 4 && ptsJ2 === 4) //gestion retour à 40-40
  {
    ptsJ1 = 3;
    ptsJ2 = 3;
  }

  if (statut === 0) 
  {
    serveur = serveur === 1 ? 2 : 1;
    solServ = 1;
    if ((jeuJ1 + jeuJ2) % 2 === 1) 
    {
      solCote = 1;
    }
    statut = 1;
  }
}

function majInterface() 
{
  document.getElementById("jeuJ1").innerText = jeuJ1;
  document.getElementById("jeuJ2").innerText = jeuJ2;
  document.getElementById("ptsJ1").innerText = afficherScore(ptsJ1);
  document.getElementById("ptsJ2").innerText = afficherScore(ptsJ2);
  document.getElementById("serve1").style.display = serveur === 1 ? "inline-block" : "none";
  document.getElementById("serve2").style.display = serveur === 2 ? "inline-block" : "none";
}

function verifierReponse() 
{
  let repJeuJ1 = parseInt(document.getElementById("repJeuJ1").value);
  let repJeuJ2 = parseInt(document.getElementById("repJeuJ2").value);
  let repPtsJ1 = parseInt(document.getElementById("repPtsJ1").value);
  let repPtsJ2 = parseInt(document.getElementById("repPtsJ2").value);
  let repServ = document.getElementById("repServ").value;
  let repCote = document.getElementById("repCote").value;

  let msg = "";

  // Vérif score
  if (repJeuJ1 === jeuJ1 && repJeuJ2 === jeuJ2 && repPtsJ1 === ptsJ1 && repPtsJ2 === ptsJ2) 
  {
    msg += "✅ Score juste<br>";
  } 
  else 
  {
    msg += "❌ Score incorrect<br>";
  }

  // Vérif serveur
  if ((repServ === "non" && solServ === 0) || (repServ === "oui" && solServ === 1)) 
  {
    msg += "✅ Serveur correct<br>";
  } 
  else 
  {
    msg += "❌ Erreur serveur<br>";
  }

  // Vérif côté
  if ((repCote === "non" && solCote === 0) || (repCote === "oui" && solCote === 1)) 
  {
    msg += "✅ Côté correct<br>";
  } 
  else 
  {
    msg += "❌ Erreur côté<br>";
  }

  document.getElementById("resultat").innerHTML = msg;
}
