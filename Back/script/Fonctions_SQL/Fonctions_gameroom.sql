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
						SELECT "Characteristics".id, "Characteristics".strength, "Characteristics".dexterity, "Characteristics".wisdom, "Characteristics".charisma, "Characteristics".constitution, "Characteristics".intelligence, "Characteristics".level, "Characteristics".max_hp, "Characteristics".current_hp, "Characteristics".max_mana, "Characteristics".current_mana
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