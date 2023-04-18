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
    UPDATE "Invite" SET "status" = new_status, updated_at = now() WHERE "new_id" = "Invite".id;
    IF NOT FOUND THEN --si l'update échou, alors on insert:
        INSERT INTO "Invite" ( game_id, user_id, status, created_at) VALUES ( new_gameid, new_userid, new_status, now()) RETURNING "Invite".id INTO new_id; -- on stock la valeur de l'id créer dans "new_id"
    END IF;
    RETURN QUERY SELECT "Invite".id, "Invite".game_id, "Invite"."user_id", "Invite"."status", "Invite".created_at, "Invite".updated_at FROM "Invite" WHERE "Invite".id = new_id;
END;
$$ LANGUAGE plpgsql;

/*
Script de test de la fonction:

SELECT * from create_or_update_invite_with_result(2, 'nop !', 14, 'Guillame') 

*/


CREATE OR REPLACE FUNCTION delete_invite_by_id(IN invite_id INT)
RETURNS VOID AS $$
    DELETE FROM "Invite" WHERE "Invite".id = invite_id;
$$ LANGUAGE SQL;
/*
Script de TEST de la fonction:

SELECT delete_invite_by_id(1);
SELECT * FROM "Invite";

*/