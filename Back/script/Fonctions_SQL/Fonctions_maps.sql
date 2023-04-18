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
SELECT delete_maps_by_id(1);

