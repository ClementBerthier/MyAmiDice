Se connecter à postgres

sudo -i -u postgres psql

Création du rôle

CREATE USER myamidice WITH LOGIN PASSWORD 'myamidice';

Création database

CREATE DATABASE myamidice OWNER myamidice;

Dans le terminal

Création des tables avec PSQL

psql -U myamidice -d myamidice -f script/createTable.sql

Insert dans la bdd

psql -U myamidice -d myamidice -f script/Seeding.sql