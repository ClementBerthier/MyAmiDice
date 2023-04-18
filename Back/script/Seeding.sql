-- SQLBook: Code
-- SCRIPT DE SEEDING DE LA BDD AFIN D'AVOIR N JEUX DE DONNÉES POUR LES TEST

BEGIN;

INSERT INTO "Users" ("pseudo", "password", "email", "is_admin") VALUES 
    ('clément', 'bouya', 'bouya@mail.com', true),
    ('guillaume', 'lolo-forever', 'elfedelamort@truc.game', false),
    ('alex', 'myamidice', 'duclos.alex85@outlook.fr', false),
    ('philippe', 'fonctionSQL', 'philippe@sql.fc', false),
    ('mathieu', 'motdepasse', 'test@sql.fc', false);

INSERT INTO "Games" ("name", "description", "max_players", "notes", "status", "user_id") VALUES 
    ('donjons et dragons', 'tout le monde est mort', 4, 'partie test', 'in progress', 4),
    ('WOW', 'tout le monde est en vie', 3, 'second test', 'closed', 4);

INSERT INTO "Characters" ("firstname", "lastname", "avatar", "description", "race","class", "game_id", "user_id") VALUES
    ( 'elfe', 'nain', '/avatar/nain', 'archer qui tue tout', 'nainlf', 'bestkiller', 1, 2 ),
    ( 'homme', 'lézard', '/avatar/homme', 'homme écailleux', 'hommzard', 'truccheelou', 2, 3);


INSERT INTO "Items" ("name", "quantity", "description", "character_id") VALUES
    ('épée d''acier', 1, 'tu as besoin d''un dessin ? ', 2),
    ('potion chelou', 3, 'tu veux vraiment boire ça ? ', 1),
    ('épée d''acier', 1, 'tu as besoin d''un dessin ? ', 1);

INSERT INTO "Skills" ("name","description", "character_id") VALUES 
    ( 'Coup de boule', 'technique venant d''un footbaleur légendaire', 1);

INSERT INTO "Characteristics" ("strength", "dexterity", "charisma", "wisdom", "constitution", "intelligence", "level", "max_hp", "current_hp", "max_mana", "current_mana", "character_id") VALUES
    (17, 12, 8, 11, 14, 15, 7, 150, 125, 50, 40, 1),
    (9, 2000, 251, 666, 42, 0, 1, 100, 100, 10, 0, 2);

INSERT INTO "News" ("title", "content", "user_id") VALUES
    ('On démarre !', 'C''est le debut d''une aventure qui nous amènera sous le soleil !', 1);

INSERT INTO "Maps" ("name", "category", "url") VALUES 
    ('bastion', 'donjon', '/bouya/com'),
    ('foret ennéigé', 'zone', '/foret/carte');

INSERT INTO "Invite" ("game_id", "user_id", "status") VALUES 
    (1,2, 'in progress');


INSERT INTO "game_has_maps" ("game_id", "map_id") VALUES 
    (1,1);

COMMIT;