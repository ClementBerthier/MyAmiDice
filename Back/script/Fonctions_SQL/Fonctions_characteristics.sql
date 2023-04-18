-- SQLBook: Code
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
/*
Script de test de la fonction:
SELECT * FROM update_characteristics_by_char_id(0, 19, 18, 5, 15, 20, 12, 50, 500, 499, 100, 100, 3);
SELECT * FROM update_characteristics_by_char_id(1, 17, 12, 8, 11, 14, 15, 7, 150, 125, 50, 50, 1);
*/
