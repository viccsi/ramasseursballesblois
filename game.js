// game.js

// Initialisation des scores et des variables
let jeu_J1 = 0;  // Score de jeu pour le Joueur 1
let jeu_J2 = 0;  // Score de jeu pour le Joueur 2
let point_J1 = 0;  // Points du joueur 1
let point_J2 = 0;  // Points du joueur 2
let serveur = 1;  // Joueur 1 commence à servir

// Fonction pour mettre à jour l'affichage des scores
function updateScore() {
    document.getElementById("scoreJ1").textContent = pointToScore(point_J1);
    document.getElementById("scoreJ2").textContent = pointToScore(point_J2);
    document.getElementById("jeuJ1").textContent = jeu_J1;
    document.getElementById("jeuJ2").textContent = jeu_J2;
}

// Convertit un score de point en format tennis
function pointToScore(point) {
    if (point === 0) return "0";
    if (point === 1) return "15";
    if (point === 2) return "30";
    if (point === 3) return "40";
    if (point === 4) return "AD";
    return "/";
}

// Fonction pour démarrer un nouveau jeu
function startGame() {
    // Réinitialisation des scores de point et des jeux
    point_J1 = 0;
    point_J2 = 0;
    updateScore();
    
    // Lancer un jeu
    playGame();
}

// Fonction pour jouer un jeu
function playGame() {
    let interval = setInterval(() => {
        // Simule la prise de points pour un joueur au hasard
        let winner = Math.random() < 0.5 ? 0 : 1;  // 0 pour Joueur 1, 1 pour Joueur 2
        if (winner === 0) {
            point_J1++;
        } else {
            point_J2++;
        }

        // Met à jour le score à chaque point
        updateScore();

        // Vérifie si quelqu'un a gagné le jeu
        if (point_J1 > 4 || point_J2 > 4) {
            clearInterval(interval);  // Arrête l'intervalle
            if (point_J1 > point_J2) {
                jeu_J1++;
                alert("Le Jeu est terminé! Joueur 1 gagne.");
            } else {
                jeu_J2++;
                alert("Le Jeu est terminé! Joueur 2 gagne.");
            }

            // Réinitialiser les scores pour un nouveau jeu
            setTimeout(() => {
                startGame();  // Commence un nouveau jeu après 2 secondes
            }, 2000);
        }
    }, 2000);  // Un point est marqué toutes les 2 secondes
}

// Fonction pour mettre à jour le serveur visuel (point jaune)
function updateServer() {
    if (serveur === 1) {
        document.getElementById("serveurStatus").textContent = "Joueur 1 sert ";
        document.getElementById("serveurPoint").style.color = "yellow";
    } else {
        document.getElementById("serveurStatus").textContent = "Joueur 2 sert ";
        document.getElementById("serveurPoint").style.color = "yellow";
    }
}

// Fonction pour changer de serveur après chaque jeu
function changeServer() {
    serveur = serveur === 1 ? 2 : 1;
    updateServer();
}

// Lancer le jeu quand le bouton est cliqué
document.getElementById("startGame").addEventListener("click", function() {
    changeServer();  // Changer de serveur au début
    startGame();
});
