-- SQLBook: Code
-- Renvoie la liste de toutes les games
CREATE OR REPLACE FUNCTION get_games() 
RETURNS TABLE("id" INTEGER, "name" TEXT, "description" TEXT, "max_players" INT, "notes" TEXT, "status" TEXT,  "user_id" INT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "Games";
$$ LANGUAGE SQL;

/*
Script de test de la fonction:

SELECT get_games()
*/
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
Script de test de la fonction:

SELECT create_or_update_games_with_result(0, 'maGame', 'test', 4, 2); -- Creer un nouvelle utilisateur quand "id" vaut 0
SELECT create_or_update_games_with_result(1, 'maGame2', 'test2', 4, 4, "break"); -- Update un utilisateur quand "id" existe
SELECT * FROM "Games"

*/


-- Supprime la games “:id”
CREATE OR REPLACE FUNCTION delete_games_by_id(game_id INT)
RETURNS VOID AS $$
    DELETE FROM "Games" WHERE "id" = game_id;
$$ LANGUAGE SQL;

/*
Script de TEST de la fonction:

SELECT delete_characters_by_id(1);
SELECT * FROM "Characters";

*/