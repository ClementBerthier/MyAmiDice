-- SQLBook: Code

-- SQLBook: Code
-- Renvoi la liste de tout les utilisateurs
CREATE OR REPLACE FUNCTION get_users() 
RETURNS TABLE("id" INTEGER, "pseudo" TEXT, "password" TEXT, "email" TEXT, "is_admin" BOOLEAN, "lastname" TEXT, "firstname" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "Users";
$$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT get_users()


CREATE OR REPLACE FUNCTION get_users_by_id(userid INTEGER)

RETURNS TABLE ("id" INTEGER, "pseudo" TEXT, "avatar" url, "password" TEXT, "email" TEXT, "is_admin" BOOLEAN, "lastname" TEXT, "firstname" TEXT, "created_at" TIMESTAMPTZ, "updated_at" TIMESTAMPTZ) AS $$
    SELECT * FROM "Users" WHERE "id" = userid;
$$ LANGUAGE SQL;
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
RETURNS TABLE("id" INTEGER, pseudo TEXT, email email, is_admin BOOLEAN, firstname TEXT, lastname TEXT) AS $$
BEGIN
    -- En first on essai l'update 
    UPDATE "Users" SET pseudo = new_pseudo, avatar = new_image, email = new_email, firstname = new_firstname, lastname = new_lastname, updated_at = now() WHERE "new_id" = "Users".id;
    RETURN QUERY SELECT "Users".id,"Users".pseudo, "Users".email, "Users".avatar "Users".is_admin, "Users".firstname, "Users".lastname  FROM "Users" WHERE "Users".id = new_id;
END
$$ LANGUAGE plpgsql;
-/*Test de la fonction
SELECT * from update_users_with_result(
	2, 'troman', 'tutu@ot.fr') 
*/


--Crer un utilisateur en bdd
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
    RETURN QUERY SELECT "Users".id, "Users".pseudo, "Users".email, "Users".is_admin, "Users".firstname, "Users".lastname FROM "Users" WHERE "Users".id = new_id;
END
$$ LANGUAGE plpgsql;

/*
SELECT * from create_users_with_result(
	'titidu18', 'man@toto.fr', 'password') 
*/

-- Supprime l’utilisateur “:id” de la base de données
CREATE OR REPLACE FUNCTION delete_users_by_id(userid INTEGER)
RETURNS VOID AS $$
    DELETE FROM "Users" WHERE "id" = userid;
$$ LANGUAGE SQL;
-- Test de fonction OK
-- SELECT delete_users_by_id(1);