// game.js

// Variables globales
let jeu_J1 = Math.floor(Math.random() * 5);  // Score de jeux de J1
let jeu_J2 = Math.floor(Math.random() * 5);  // Score de jeux de J2
let point_J1 = 0;
let point_J2 = 0;
let serveur = 1;  // 1 = J1, 2 = J2
let set_de_jeu = 0;
let changement_cote = false;
let changement_serveur = false;

// Affichage des scores
function afficher_score(point) {
    const scores = ["0", "15", "30", "40", "AD"];
    return scores[point] || "/";
}

// Fonction pour mettre à jour l'affichage des scores
function updateScore() {
    document.getElementById('score-J1-pt').innerText = afficher_score(point_J1);
    document.getElementById('score-J1-game').innerText = jeu_J1;
    document.getElementById('score-J2-pt').innerText = afficher_score(point_J2);
    document.getElementById('score-J2-game').innerText = jeu_J2;
}

// Fonction de gestion des points
function marquerPoint() {
    // Choisir un joueur pour marquer le point
    const joueur = Math.floor(Math.random() * 2);  // 0 = J1, 1 = J2
    if (joueur === 0) {
        point_J1++;
    } else {
        point_J2++;
    }

    // Vérifier si un joueur a gagné le jeu
    if (point_J1 >= 4 && point_J2 <= 2) {
        jeu_J1++;
        point_J1 = 0;
        point_J2 = 0;
        set_de_jeu++;
        alert("Jeu pour J1 !");
    } else if (point_J2 >= 4 && point_J1 <= 2) {
        jeu_J2++;
        point_J1 = 0;
        point_J2 = 0;
        set_de_jeu++;
        alert("Jeu pour J2 !");
    } else if (point_J1 === 4 && point_J2 === 4) {
        point_J1 = 3;
        point_J2 = 3;
    }

    // Changer de serveur après chaque jeu
    if (set_de_jeu % 2 === 0) {
        serveur = serveur === 1 ? 2 : 1;
        changement_serveur = true;
        document.getElementById('serveur-info').innerText = `Le serveur actuel : Joueur ${serveur}`;
    }

    // Changement de côté si la somme des jeux est impaire
    if ((jeu_J1 + jeu_J2) % 2 === 1) {
        changement_cote = true;
        document.getElementById('changement-cote').innerText = "Changement de côté : Oui";
    } else {
        changement_cote = false;
        document.getElementById('changement-cote').innerText = "Changement de côté : Non";
    }

    // Mettre à jour l'affichage
    updateScore();
}

// Fonction de réinitialisation
function reset() {
    jeu_J1 = Math.floor(Math.random() * 5);
    jeu_J2 = Math.floor(Math.random() * 5);
    point_J1 = 0;
    point_J2 = 0;
    set_de_jeu = 0;
    changement_cote = false;
    changement_serveur = false;
    serveur = 1;
    document.getElementById('serveur-info').innerText = `Le serveur actuel : Joueur 1`;
    document.getElementById('changement-cote').innerText = "Changement de côté : Non";
    updateScore();
}

// Initialisation du jeu
document.getElementById('marquer-point').addEventListener('click', marquerPoint);
document.getElementById('reset').addEventListener('click', reset);

// Mettre à jour l'affichage initial
updateScore();
