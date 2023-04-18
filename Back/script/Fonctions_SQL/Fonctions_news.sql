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