
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

			SELECT gi."name", gi.user_id, "Invite"."id",gi."description", uj."pseudo", "Invite".game_id
>>>>>>> c41834ecd1dfad2b69ec2b71614d988ce385c712
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
