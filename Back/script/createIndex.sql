BEGIN;

CREATE INDEX charactersId ON "Characters" (id);
CREATE INDEX userId ON "Users" (id);
CREATE INDEX gameId ON "Games" (id);
CREATE INDEX characteristicsId ON "Characteristics" (id);
CREATE INDEX userMail ON "Users" (email);
CREATE INDEX inviteId ON "Invite" (id);
CREATE INDEX userPseudo ON "Users" (pseudo);
CREATE INDEX itemId ON "Items" (id);
CREATE INDEX mapId ON "Maps" (id);
CREATE INDEX newId ON "News" (id);

COMMIT;
