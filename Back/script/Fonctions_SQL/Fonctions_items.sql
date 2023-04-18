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
Script test de la fonction:

SELECT * from create_or_update_items_with_result(0, 'pain elfique', 2, 'rations pour taffioles !', 1)

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