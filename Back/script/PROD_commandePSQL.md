
Se connecter à postgres

psql -h aws.server.adress -U user.creer.en.bdd

Création des tables avec PSQL

psql -U user -d nom.de.la.DB -f script/createTable.sql

Insert dans la bdd

psql -U myamidice -d myamidice -f script/Seeding.sql

psql -U myamidice -d myamidice -f script/Seeding_functions.sql
