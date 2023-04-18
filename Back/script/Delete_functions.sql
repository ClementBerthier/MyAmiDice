
BEGIN;

DROP FUNCTION IF EXISTS create_or_update_characteristics_with_result(),
get_character_by_id_with_all(),
create_or_update_characters_with_result(),
delete_characters_by_id(),
user_login(),
get_games(),
create_or_update_games_with_result(),
get_game_by_id_with_all(),
delete_games_by_id(),
create_or_update_invite_with_result(),
delete_invite_by_id(),
create_or_update_items_with_result(),
delete_items_by_id(),
create_or_update_maps_with_result(),
delete_maps_by_id(),
create_or_update_news_with_result(),
delete_news_by_id(),
get_news(),
create_or_update_skills_with_result(),
delete_skills_by_id(),
get_users(),
update_users_with_result(),
delete_users_by_id(),
create_users_with_result();

COMMIT;