# MyAmiDice

MyAmiDice est un outil en ligne gratuit qui vous permet de jouer à des jeux de rôle papier avec d'autres joueurs à distance. Les fonctionnalités sont conçues pour vous fournir tout ce dont vous avez besoin pour jouer en ligne de manière simple et gratuite, comme si vous étiez autour d'une table.

Ce repository Git représente le travail coté front

## Fonctionnalités du projet

Le MVP de MyAmiDice inclut les fonctionnalités suivantes :

- Création de compte
- Connexion / déconnexion
- Comptes :
    - admin,
    - visiteurs (compte non créé),
    - user (MJ / Joueurs)
- L’admin peut consulter / supprimer des utilisateurs / parties
- L’admin peut rédiger des news consultables sur la page d’accueil
- Comptes avec droits différents suivant la partie qui est rejointe (MJ / joueurs)
- Le MJ invite des comptes à sa partie.
- Création de parties (+ évolutions)
- Création de personnage (style Formulaire pour commencer) (+ évolutions) :
    - Sauvegarde des statistiques
    - Le personnage est verrouillé pour une seule partie. Si la partie est clôturée, il devient exportable pendant une semaine(format à définir), puis est supprimé définitivement.
- Affichage d’une carte commune (+ évolutions)
- Lancer de dés qui affiche le résultat dans le tchat :
    - lancer public par les joueurs et le MJ,
    - lancer privé d’un joueur au MJ,
    - lancer privé du MJ visible par lui et le joueur concerné,
    - lancer privé du MJ visible uniquement par lui
- Tchat en temps réel : (+ évolutions)
    - système de MP au MJ,
- Section “Notes” qui permet au MJ d’écrire un résumé de chaque partie. Permet d’avoir le résumé de l’histoire du départ jusqu’au moment présent.
- Côté responsive Mobiles / tablettes : version bridée du site de base : uniquement accès aux fiches de perso en temps réel.

## Technologies utilisées

- React
- Socket.IO
- Sass
- React-router
- Semantic-ui-react

## Comment lancer le projet

Assurez-vous d'avoir installé les dépendances requises en utilisant la commande `npm install`

