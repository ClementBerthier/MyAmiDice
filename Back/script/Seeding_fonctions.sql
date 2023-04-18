-- SQLBook: Code
-- SCRIPT DE SEEDING DES FONCTIONS DE LA BDD.
BEGIN;

--Met à jour les stats(Characteristics) d'un personnage "id" en bdd
CREATE OR REPLACE FUNCTION create_or_update_characteristics_with_result(
    IN new_id INT,
    IN new_strength INT,
    IN new_dexterity INT,
    IN new_constitution INT,
    IN new_wisdom INT,
    IN new_charisma INT,
    IN new_intelligence INT,
    IN new_level INT,
    IN new_max_hp INT,
    IN new_max_mana INT,
    IN new_current_hp INT,
    IN new_current_mana INT,
    IN new_char_id INT
)
RETURNS TABLE("id" INTEGER, strength INT, dexterity INT, wisdom INT, charisma INT, constitution INT, intelligence INT, "level" INT, max_hp INT, current_hp INT, max_mana INT, current_mana INT, character_id INT) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Characteristics" SET strength = new_strength, dexterity = new_dexterity, wisdom = new_wisdom, charisma = new_charisma, constitution = new_constitution, intelligence = new_intelligence, "level" = new_level, max_hp = new_max_hp, current_hp = new_current_hp, max_mana = new_max_mana, current_mana = new_current_mana, "character_id" = new_char_id, updated_at = now() WHERE "new_id" = "Characteristics".id;
    IF NOT FOUND THEN 
        INSERT INTO "Characteristics" ( strength, dexterity, wisdom, charisma, constitution, intelligence, "level", max_hp, current_hp, max_mana, current_mana, character_id) VALUES ( new_strength, new_dexterity, new_wisdom, new_charisma, new_constitution, new_intelligence, new_level, new_max_hp, new_max_hp, new_max_mana, new_max_mana, new_char_id) RETURNING "Characteristics".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Characteristics".id, "Characteristics".strength, "Characteristics".dexterity, "Characteristics".wisdom, "Characteristics".charisma, "Characteristics".constitution, "Characteristics".intelligence, "Characteristics"."level", "Characteristics".max_hp, "Characteristics".current_hp, "Characteristics".max_mana, "Characteristics".current_mana, "Characteristics".character_id FROM "Characteristics" WHERE "Characteristics".id = new_id;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_character_by_id_with_all(
    IN character_id INT
)
RETURNS TABLE( "character" json) AS $$

BEGIN
	RETURN QUERY SELECT row_to_json(Charac) as "character"
	FROM (
	SELECT "Characters"."firstname", "Characters"."lastname", "Characters"."race", "Characters".is_alive, "Characters"."class", "Characters"."description", "Characters"."avatar", (
		SELECT json_agg(row_to_json((SELECT temptable FROM (SELECT id, "name", "description") temptable))) FROM "Skills" WHERE "Characters".id = "Skills".character_id
		) skills, (
		SELECT json_agg(row_to_json((SELECT temptable FROM (SELECT id, "name", "quantity", "description") temptable))) FROM "Items" WHERE "Characters".id = "Items".character_id
		) items, (
        SELECT json_agg(row_to_json((SELECT temptable FROM ( SELECT id, strength, dexterity, constitution, wisdom, charisma, intelligence, "level", max_hp, current_hp, max_mana, current_mana) temptable))) FROM "Characteristics" WHERE "Characters".id = "Characteristics".character_id
        ) "characteristics"
		FROM "Characters" WHERE "Characters".id = character_id
	) Charac;
END;
$$ LANGUAGE plpgsql;

-- Met le perso “:id” à jour ou Créer un nouveaux perso en base de données si il n'existe pas
CREATE OR REPLACE FUNCTION create_or_update_characters_with_result(
	IN new_id INT,
    IN new_firstname TEXT, 
    IN new_lastname TEXT, 
    IN new_description TEXT,
    IN new_race TEXT,
    IN new_class TEXT,
    IN new_user_id INT,
	IN new_game_id INT,
    IN new_avatar url,
    IN new_is_alive BOOLEAN DEFAULT true

)
RETURNS TABLE("id" INTEGER, firstname TEXT, lastname TEXT, "description" TEXT, race TEXT, "class" TEXT, avatar url, is_alive BOOLEAN) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Characters" SET firstname = new_firstname, lastname = new_lastname, avatar = new_avatar, "description" = new_description, race = new_race, is_alive= new_is_alive, "class" = new_class WHERE "new_id" = "Characters".id;
    IF NOT FOUND THEN 
        INSERT INTO "Characters" ( firstname, lastname, description, race, class, "user_id", "game_id", "avatar", is_alive ) VALUES ( new_firstname, new_lastname, new_description, new_race, new_class, new_user_id, new_game_id, new_avatar, new_is_alive) RETURNING "Characters".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Characters".id, "Characters".firstname, "Characters".lastname, "Characters".description, "Characters".race, "Characters".class, "Characters".avatar, "Characters".is_alive FROM "Characters" WHERE "Characters".id = new_id;
END
$$ LANGUAGE plpgsql;


/*
 Test de fonction OK
SELECT * FROM create_or_update_characters_with_result(0, 'Vaqh', 'Omega', '1m95', 'Hybride vampire/loug-garou', 'Guerrier/mage', true, 1, 1)
*/


CREATE OR REPLACE FUNCTION delete_characters_by_id(IN char_id INT)
RETURNS VOID AS $$
    DELETE FROM "Characters" WHERE "id" = char_id;
$$ LANGUAGE SQL;
/*
Script de TEST de la fonction:

SELECT delete_characters_by_id(1);
SELECT * FROM "Characters";
*/

-- Appele quand le users se connect et recupere ses info

-- Appele quand le users se connect et recupere ses info

CREATE OR REPLACE FUNCTION user_login(IN test_email email, IN test_password BOOLEAN)
RETURNS TABLE("user" json) AS $$
 
 
BEGIN
RETURN QUERY SELECT row_to_json(Joueurs) as "user"
FROM (
	SELECT us.id, us.email, us.is_admin, us.firstname, us.lastname, us.pseudo,  (
		SELECT json_agg(characters)
		FROM(
			SELECT "Characters".id, "Characters"."firstname", "Characters"."lastname"
			FROM "Characters"
			WHERE "Characters".user_id = us.id
		)AS characters
	) AS characters,
	(
		SELECT json_agg(Games)
		FROM (
			SELECT gmj."name", gmj.id, gmj."status", gmj."description", gmj."max_players", gmj.user_id, umj."pseudo"
			FROM "Games" as gmj
			JOIN "Characters" as cha ON cha.user_id = us.id
			JOIN "Users" as umj ON umj.id = gmj.user_id
			WHERE gmj.user_id = us.id OR gmj.id = cha.game_id
		) as Games
	) as Games,
	(
		SELECT json_agg(Games_Invite)
		FROM (
			SELECT gi."name", "Invite"."id",gi."description", uj."pseudo", "Invite".game_id
			FROM "Invite"
			LEFT JOIN "Games" as gi ON "Invite".game_id = gi.id
			LEFT JOIN "Users" as uj ON gi.user_id = uj.id
			WHERE "Invite".user_id = us.id
		) as Games_Invite
	) as Games_Invite
	FROM "Users" as us
	WHERE us."email" = test_email AND test_password = true
) AS Joueurs;

END;

$$ LANGUAGE plpgsql;



-- Renvoie la liste de toutes les games
CREATE OR REPLACE FUNCTION get_games() 
RETURNS TABLE("id" INTEGER, "name" TEXT, "description" TEXT, "max_players" INT, "notes" TEXT, "status" TEXT, "user_id" INT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "Games";
$$ LANGUAGE SQL;
-- Test de fonction OK
--SELECT get_games()

-- Créer la "Games" et retourne les info (mj=user_id) ou update le status et/ou nom
CREATE OR REPLACE FUNCTION create_or_update_games_with_result(
	IN "new_id" INT,
    IN "new_name" TEXT, 
	IN "new_description" TEXT,
    IN "new_max_players" INT, 
    IN "new_user_id" INT,
    IN "new_notes" TEXT DEFAULT null,
    IN "new_status" TEXT DEFAULT 'start'
        
)
RETURNS TABLE("id" INTEGER, "name" TEXT, "description" TEXT, "max_players" INT, "notes" TEXT, "status" TEXT, "user_id" INT) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Games" SET "name" = "new_name", "notes" = "new_notes", "status" = "new_status", "description" = "new_description", "user_id" = "new_user_id", "updated_at" = now() WHERE "new_id" = "Games".id;
    IF NOT FOUND THEN 
        INSERT INTO "Games" ( "name", "max_players", "description", "user_id", "status", "notes", created_at) VALUES ( "new_name", "new_max_players", "new_description", "new_user_id", "new_status", "new_notes", now()) RETURNING "Games".id INTO new_id;
    END IF;
    RETURN QUERY SELECT "Games".id,"Games"."name", "Games"."description", "Games"."max_players",  "Games"."notes", "Games"."status", "Games"."user_id" FROM "Games" WHERE "Games".id = new_id;
END
$$ LANGUAGE plpgsql;

/*
-- Test de fonction OK
SELECT create_or_update_game_with_result(0,'maGame',4, ' ', 'break',2); -- Creer un nouvelle utilisateur quand "id" vaut 0
SELECT create_or_update_game_with_result(1,'maGame2',4, ' ', 'break',4); -- Update un utilisateur quand "id" existe
SELECT * FROM "Games"

*/
CREATE OR REPLACE FUNCTION get_game_by_id_with_all(
	IN gameid INT,
	IN userid INT
)
RETURNS TABLE("Gameroom" json) AS $$
BEGIN
	RETURN QUERY SELECT row_to_json("gameroom") as "Gameroom"
	FROM (
		SELECT "Games".name, "Games".notes, 
		(
			SELECT jsonb_agg(Maps)
			FROM(	
				SELECT "Maps".url, "Maps".name, "Maps".category, "Maps".id
				FROM "Maps" FULL JOIN "game_has_maps" ON "Maps".id = "game_has_maps".map_id
				WHERE "Games".id = "game_has_maps".game_id
			) AS Maps
		) AS Maps,
		(
			SELECT jsonb_agg(personnages)
			FROM(
				SELECT "Characters".race, "Characters".class, "Characters".avatar, "Characters".lastname, "Characters".firstname, "Characters".description, "Characters".id,
				(
					SELECT json_agg(Skills)
					FROM(
						SELECT "Skills".name, "Skills".description
						FROM "Skills"
						WHERE "Skills".character_id = "Characters".id
					) AS Skills
				) AS Skills,
				(
					SELECT json_agg(Items)
					FROM(
						SELECT "Items".name, "Items".description, "Items".quantity
						FROM "Items"
						WHERE "Items".character_id = "Characters".id
					) AS Items
				) AS Items,
				(
					SELECT json_agg("Characteristics")
					FROM(
						SELECT  "Characteristics".strength, "Characteristics".dexterity, "Characteristics".wisdom, "Characteristics".charisma, "Characteristics".constitution, "Characteristics".intelligence, "Characteristics".level, "Characteristics".max_hp, "Characteristics".current_hp, "Characteristics".max_mana, "Characteristics".current_mana
						FROM "Characteristics"
						WHERE "Characteristics".character_id = "Characters".id
					) AS "Characteristics"
				) AS "Characteristics"
				FROM "Characters"
				WHERE "Characters".game_id = gameid
			)AS Personnages
		) AS Personnages
		FROM "Games"
		WHERE "Games".user_id = userid
		AND "Games".id = gameid
	) AS "gameroom";
	
	IF NOT FOUND THEN
	RETURN QUERY SELECT row_to_json("gameroom") as "Gameroom"
	FROM (
		SELECT "Games".name, "Games".notes, 
		(
			SELECT jsonb_agg(Maps)
			FROM(	
				SELECT "Maps".url, "Maps".name, "Maps".category
				FROM "Maps" FULL JOIN "game_has_maps" ON "Maps".id = "game_has_maps".map_id
				WHERE "Games".id = "game_has_maps".game_id
			) AS Maps
		) AS Maps,
		(
			SELECT jsonb_agg(personnages)
			FROM(
				SELECT "Characters".race, "Characters".class, "Characters".avatar, "Characters".lastname, "Characters".firstname, "Characters".description, "Characters".id,
				(
					SELECT json_agg(Skills)
					FROM(
						SELECT "Skills".name, "Skills".description, "Skills".id
						FROM "Skills"
						WHERE "Skills".character_id = "Characters".id
					) AS Skills
				) AS Skills,
				(
					SELECT json_agg(objets)
					FROM(
						SELECT "Items".name, "Items".description, "Items".quantity, "Items".id
						FROM "Items"
						WHERE "Items".character_id = "Characters".id
					) AS objets
				) AS objets,
				(
					SELECT json_agg(Stats)
					FROM(
						SELECT "Characteristics".id, "Characteristics".strength, "Characteristics".dexterity, "Characteristics".wisdom, "Characteristics".charisma, "Characteristics".constitution, "Characteristics".intelligence, "Characteristics".level, "Characteristics".max_hp, "Characteristics".current_hp, "Characteristics".max_mana, "Characteristics".current_mana, "Characteristics".id
						FROM "Characteristics"
						WHERE "Characteristics".character_id = "Characters".id
					) AS Stats
				) AS Stats
				FROM "Characters"
				WHERE "Characters".user_id = userid
			)AS Personnages
		) AS Personnages
		FROM "Games"
		WHERE "Games".id = gameid
	) AS "gameroom";
	END IF;
END;
$$ LANGUAGE plpgsql;

-- Supprime la games “:id”
CREATE OR REPLACE FUNCTION delete_games_by_id(game_id INT)
RETURNS VOID AS $$
    DELETE FROM "Games" WHERE "id" = game_id;
$$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT delete_games_by_id(1);

-- SQLBook: Code
-- Met l'invite “:id” à jour ou Créer une nouvelle invite en base de données si il n'existe pas
CREATE OR REPLACE FUNCTION create_or_update_invite_with_result(
	IN new_id INT,
    IN new_status TEXT,
    IN new_gameid INT,
	IN user_pseudo TEXT,
    IN new_userid INT DEFAULT 0
)
RETURNS TABLE("id" INTEGER, game_id INT, "user_id" INT, "status" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
BEGIN
    --en First on récupére l'id de l'invité dans new_userid
    SELECT "Users".id INTO new_userid FROM "Users" WHERE "Users".pseudo = user_pseudo;
    -- puis on essai l'update 
    UPDATE "Invite" SET "status" = new_status WHERE "new_id" = "Invite".id;
    IF NOT FOUND THEN --si l'update échou, alors on insert:
        INSERT INTO "Invite" ( game_id, user_id, status, updated_at) VALUES ( new_gameid, new_userid, new_status, now()) RETURNING "Invite".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Invite".id, "Invite".game_id, "Invite"."user_id", "Invite"."status", "Invite".created_at, "Invite".updated_at FROM "Invite" WHERE "Invite".id = new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_invite_by_id(IN invite_id INT)
RETURNS VOID AS $$
    DELETE FROM "Invite" WHERE "Invite".id = invite_id;
$$ LANGUAGE SQL;


-- SQLBook: Code
-- Met l'item “:id” à jour ou Créer un nouvel item en base de données si il n'existe pas
CREATE OR REPLACE FUNCTION create_or_update_items_with_result(
	IN new_id INT,
    IN new_name TEXT,
    IN new_quantity INT, 
    IN new_description TEXT,
    IN new_char_id INT
)
RETURNS TABLE("id" INTEGER, "name" TEXT, "description" TEXT, quantity INT, character_id INT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Items" SET "name" = new_name, "description" = new_description, quantity = new_quantity, character_id = new_char_id WHERE "new_id" = "Items".id;
    IF NOT FOUND THEN 
        INSERT INTO "Items" ( name, description, quantity, character_id) VALUES ( new_name, new_description, new_quantity, new_char_id) RETURNING "Items".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Items".id, "Items".name, "Items".description, "Items".quantity, "Items".character_id, "Items".created_at, "Items".updated_at FROM "Items" WHERE "Items".id = new_id;
END;
$$ LANGUAGE plpgsql;
/*
Test de la fonction ok
SELECT * from create_or_update_items_with_result(
	0, 'pain elfique', 2, 'rations pour taffioles !', 1)
*/


CREATE OR REPLACE FUNCTION delete_items_by_id(IN item_id INT)
RETURNS VOID AS $$
    DELETE FROM "Items" WHERE "id" = item_id;
$$ LANGUAGE SQL;
/*
Script de TEST de la fonction:

SELECT delete_items_by_id(1);
SELECT * FROM "Items";
*/

-- SQLBook: Code
--Créer ou update la map si elle existe en bdd
CREATE OR REPLACE FUNCTION create_or_update_maps_with_result(
	IN new_id INT,
    IN new_name TEXT,
    IN new_category TEXT,
    IN new_url url,
    IN gameid INT
)
RETURNS TABLE("id" INTEGER, name TEXT, category TEXT, "url" "url", "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
BEGIN
    -- en First on essai l'update 
    UPDATE "Maps" SET "name" = new_name, category = new_category WHERE "new_id" = "Maps".id;
    IF NOT FOUND THEN --si l'update échou, alors on insert:
        INSERT INTO "Maps" ( name, category, url) VALUES ( new_name, new_category, new_url) RETURNING "Maps".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
        INSERT INTO "game_has_maps" (game_id, map_id) VALUES (gameid, new_id);-- on insert aussi la liaison games => maps
    END IF;
    RETURN QUERY SELECT "Maps".id, "Maps".name, "Maps"."category", "Maps"."url", "Maps".created_at, "Maps".updated_at FROM "Maps" WHERE "Maps".id = new_id;
END;

$$ LANGUAGE plpgsql;

/*
Test à faire avec modif des tables
*/

-- Supprime la maps “:id”
CREATE OR REPLACE FUNCTION delete_maps_by_id(map_id INT)
RETURNS VOID AS $$
    DELETE FROM "Maps" WHERE "id" = map_id;
$$ LANGUAGE SQL;
-- Test de fonction OK
--SELECT delete_maps_by_id(1);

-- SQLBook: Code
-- Met la news “:id” à jour ou Créer une nouvelle News en base de données si elle n'existe pas
CREATE OR REPLACE FUNCTION create_or_update_news_with_result(
	IN new_id INT,
    IN new_title TEXT, 
    IN new_content TEXT, 
    IN new_user_id INT
)
RETURNS TABLE("id" INTEGER, title TEXT, content TEXT, "pseudo" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "News" SET title = new_title, content = new_content, "user_id" = new_user_id WHERE "new_id" = "News".id;
    IF NOT FOUND THEN 
        INSERT INTO "News" ( title, content, "user_id") VALUES ( new_title, new_content, new_user_id) RETURNING "News".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "News".id,"News".title, "News".content, "Users".pseudo, "News".created_at, "News".updated_at FROM "News" JOIN "Users" ON "News"."user_id" = "Users".id WHERE "News".id = new_id;
END
$$ LANGUAGE plpgsql;
-- Test de fonction OK
--SELECT create_or_update_news_with_result(0, 'o poil', 'allez !', 2);

-- Supprime la news “:id”
CREATE OR REPLACE FUNCTION delete_news_by_id(newsid INTEGER)
RETURNS VOID AS $$
    DELETE FROM "News" WHERE "id" = newsid;
$$ LANGUAGE SQL;
-- Test de fonction OK
--SELECT delete_news_by_id(5);

--fonction qui renvoie toutes les news
CREATE OR REPLACE FUNCTION get_news() 
RETURNS TABLE("id" INTEGER, "title" TEXT, "content" TEXT, "user_id" INT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "News";
$$ LANGUAGE sql;
--test la fonction get_news() OK
--SELECT get_news()

-- SQLBook: Code
-- Met le skill “:id” à jour ou Créer un nouveaux skill en base de données si il n'existe pas
CREATE OR REPLACE FUNCTION create_or_update_skills_with_result(
	IN new_id INT,
    IN new_name TEXT, 
    IN new_description TEXT,
    IN new_char_id INT
)
RETURNS TABLE("id" INTEGER, "name" TEXT, "description" TEXT, character_id INT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Skills" SET "name" = new_name, "description" = new_description, character_id = new_char_id WHERE "new_id" = "Skills".id;
    IF NOT FOUND THEN 
        INSERT INTO "Skills" ( name, description, character_id) VALUES ( new_name, new_description, new_char_id) RETURNING "Skills".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Skills".id, "Skills".name, "Skills".description, "Skills".character_id, "Skills".created_at, "Skills".updated_at FROM "Skills" WHERE "Skills".id = new_id;
END;
$$ LANGUAGE plpgsql;
/*
Test de la fonction OK :
SELECT * from create_or_update_skills_with_result(
	3, 'kikoup de la mort', 'casse tout !', 2) 
*/

CREATE OR REPLACE FUNCTION delete_skills_by_id(IN skill_id INT)
RETURNS VOID AS $$
    DELETE FROM "Skills" WHERE "id" = skill_id;
$$ LANGUAGE SQL;
/*
Script de TEST de la fonction:

SELECT delete_skills_by_id(1);
SELECT * FROM "Skills";
*/

-- SQLBook: Code
-- Renvoi la liste de tout les utilisateurs
CREATE OR REPLACE FUNCTION get_users() 
RETURNS TABLE("id" INTEGER, "pseudo" TEXT, "password" TEXT, "email" email, "is_admin" BOOLEAN, "lastname" TEXT, "firstname" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "Users";
$$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT get_users()


-- CREATE OR REPLACE FUNCTION get_users_by_id(userid INTEGER)
-- RETURNS TABLE ("id" INTEGER, "pseudo" TEXT, "password" TEXT, "email" TEXT, "is_admin" BOOLEAN, "lastname" TEXT, "firstname" TEXT, "avatar" url, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
--     SELECT * FROM "Users" WHERE "id" = userid;
-- $$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT get_users_by_id(1);


-- Met l’utilisateur “:id” à jour
CREATE OR REPLACE FUNCTION update_users_with_result(
	IN new_id INT,
    IN new_pseudo TEXT, 
    IN new_email email, 
    IN new_firstname TEXT DEFAULT NULL, 
    IN new_lastname TEXT DEFAULT NULL
)
RETURNS TABLE("id" INTEGER, pseudo TEXT, email email, is_admin BOOLEAN, firstname TEXT, lastname TEXT, updated_at TIMESTAMPTZ) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Users" SET pseudo = new_pseudo, email = new_email, firstname = new_firstname, lastname = new_lastname, updated_at = now() WHERE "new_id" = "Users".id;
    RETURN QUERY SELECT "Users".id,"Users".pseudo, "Users".email, "Users".is_admin, "Users".firstname, "Users".lastname , "Users".updated_at FROM "Users" WHERE "Users".id = new_id;
END
$$ LANGUAGE plpgsql;
/*Test de la fonction
SELECT * from update_users_with_result(
	2, 'troman', 'tutu@ot.fr') 
*/


-- Supprime l’utilisateur “:id” de la base de données
CREATE OR REPLACE FUNCTION delete_users_by_id(userid INTEGER)
RETURNS VOID AS $$
    DELETE FROM "Users" WHERE "id" = userid;
$$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT delete_users_by_id(1);



CREATE OR REPLACE FUNCTION create_users_with_result(
    IN new_pseudo TEXT, 
    IN new_email email,
    IN new_password TEXT,
    IN new_firstname TEXT,
    IN new_lastname TEXT,
    IN new_id INT DEFAULT -1

)
RETURNS TABLE("id" INTEGER, pseudo TEXT, email email, is_admin BOOLEAN, firstname TEXT, lastname TEXT ) AS $$
BEGIN
    INSERT INTO "Users" ( pseudo, email, "password", is_admin, firstname, lastname) VALUES ( new_pseudo, new_email, new_password, false, new_firstname, new_lastname ) RETURNING "Users".id INTO new_id ;
    RETURN QUERY SELECT "Users".id,"Users".pseudo, "Users".email, "Users".is_admin, "Users".firstname, "Users".lastname FROM "Users" WHERE "Users".id = new_id;
END
$$ LANGUAGE plpgsql;

/*
SELECT * from create_users_with_result(
	'titidu18', 'man@toto.fr', 'password') 
*/

COMMIT;