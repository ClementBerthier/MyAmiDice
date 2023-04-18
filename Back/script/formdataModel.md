# Exemple des FormData

## Gestion des FormData pour les User 

 - Pour la création du User

``` js

const formData = {

    "pseudo" : "Exemple",
    "email" : "email",
    "password" : "password"
};

// Url de la route : POST localhost:3000/users/create

/* Commentaire Backeux 

Revoir les arguments et les valeur de retour de la fonction create_users. Pas besoin du new_id ? Ne pas récupérer les valeur firstname, lastname ? Avatar à mettre par défaut dans la création de table ???

*/

```

  - Pour l'update d'un User

``` js 

const formData = {

    "user_id" : 1, // Doit être un integer, url ou body ? 
    "pseudo" : "example", // Obligatoire ? 
    "avatar" : "ulr/truc"
    "email" : "email" // Obligatoire ?
    "firstname" : "firstname" // Default ? 
    "lastname" : "lastname" // Default ? 

}

// Url de la route : POST localhost:3000/users/update/:id

/* Commentaire Backeux 

Revoir les arguments, ne pas les rendre obligatoire possible ? 
Interêt req.params ou req.body ? 

*/

 ```

  - Pour le Delete d'un user

```js 

    // Pas besoin de form, on passe l'id du user dans la requête

    // url de la route : delete localhost:3000/users

```


  - Pour récupérer tous les users


```js 

    // Pas besoin de form, appel de la route suffit

    // url de la route : get localhost:3000/users

```

  - Pour le login d'un User

```js

    const formData = {

        "email" : "email",
        "password" : "password"
    }

    // url de la route : POST localhost:3000/users/login
    // Cette route renvera le User avec ses games, ses invites et ses characters sous ce format 

    user = {

        "id" : 1,
        "email" : "email",
        "is_admin" : true,
        "firstname" : "link"
        "lastname" : "ocarina"
        "pseudo" : "OfTime"
        "Games" : [
            {
                "name" : " Fight Ganondorf !",
                "status" : "Branche la Nintendo",
                "description" : "Terminons ce combat pour sauver Zelda... encore !",
                "max_players" : 1 // Why not ? 
            }
        ],
        "Characters" : [
            {
                "firstname" : "Sheik",
                "lastname" : "Impa"
            }
        ],
        "Invite" : [
            {
                "user_id" : 1,
                "game" : 5
            },
            {
                "user_id" : 12,
                "game" : 8
            }
        ]
    }

/* Commentaire Backeux : On à pas pensé à faire une jointure sur l'invite pour récupérer peut-être le nom de la game associé, sa description et le pseudo du User qui à lancé l'invite ???? 

*/

```

 - Question sur l'interêt d'une route pour récupérer le user par son id avec uniquement les informations de la table Users ??? 

## Gestion des Characters

  - Pour récupérer le character avec tout ses éléments

```js

    // Pas besoin de form mais uniquement de l'id du characters, la route renverra le character avec tous les éléments lui étant associé dans un json sous ce format : 

    "Characters" : {

        "firstname" : "Tom",
        "lastname" : "Cruse",
        "race" :"humain",
        "is_alive" : true,
        "class" : "Dernier Samouraï"
        "skills" : [
            {
                "id" : 1,
                "name" : "coup de katana",
                "description" : "pas de besoin d'un dessin"
            }
        ],
        "items" : [
            {
                "id" : 1
                "name" : "Boule de feu",
                "description" : " Attaque bouilllante !",
            }
        ],
        "characteristic" : [
                {
                    "strength" : 17,
                    "dexterity" : 17,
                    "constitution" : 17,
                    "wisdom" : 17,
                    "charisma" : 17,
                    "intelligence" : 17,
                    "level" : 17,
                    "max_hp" : 17,
                    "current_hp" : 17,
                    "max_mana" : 17,
                    "current_mana" : 17
                }   
            ]
    }

    // Url de la route : GET localhost:3000/characters/:id

```

  - Pour la création de character

Le formulaire passé devrait être sous ce format 

```js 

const FormData = [
    
    "characters" : {
        "fake_id" : 0,
        "firstname" : "Tom",
        "lastname" : "Cruse",
        "race" :"humain",
        "is_alive" : true,
        "class" : "Dernier Samouraï",
        "game_id" : 1

        },
        "characteristic" : {
            
                "strength" : 17,
                "dexterity" : 17,
                "constitution" : 17,
                "wisdom" : 17,
                "charisma" : 17,
                "intelligence" : 17,
                "level" : 17,
                "max_hp" : 17,
                "max_mana" : 17
            }   
    ]
```


## Gestion des Characteristics 

  - Pour update les characteristics

```js

const formData = {

    "id" : 1 // Obligatoire
    "strength" : 17,
    "dexterity" : 17,
    "constitution" : 17,
    "wisdom" : 17,
    "charisma" : 17,
    "intelligence" : 17,
    "level" : 17,
    "max_hp" : 17,
    "max_mana" : 17,
    "current_hp" : 15,
    "current_mana" : 10
}

    // Url de la route : POST localhost:3000/characteristics/:id

```


## Gestion des Items 

  - Création

```js

    const formData  = 
                {

                    "fake_id" : 0// Obligatoire
                    "name" : "Journal",
                    "quantity" : 1,
                    "description" : " Pour raconter son histoire...",
                    "character_id" : 10
                }

    // Url de la route : POSTS localhost:3000/items/:id

```

  - Pour le Delete d'un items

```js 

    // Pas besoin de form, on passe l'id du items dans la requête

    // url de la route : delete localhost:3000/items

```

  - Pour l'update d'un items

``` js 

 const formData  = 
                {

                    "fake_id" : 0// Obligatoire
                    "name" : "Journal",
                    "quantity" : 1,
                    "description" : " Pour raconter son histoire...",
                    "character_id" : 10
                }

                // Url de la route : POST localhost:3000/items/:id

```

## Gestion des Skills 

  - Création d'un skill


```js



    const formData  = 
                {

                    "fake_id" : 0// Obligatoire
                    "name" : "Boule de feu",
                    "description" : " Attaque bouilllante !",
                    "character_id" : 10
                }

    // Url de la route : POSTS localhost:3000/skills/:id

```

  - Pour le Delete d'un skill

```js 

    // Pas besoin de form, on passe l'id du skill dans la requête

    // url de la route : delete localhost:3000/skills/:id

```


  - Pour l'update d'une Skill

``` js 

const formData = {

    "id" : 1, // obligatoire
    "name" : "bouya",
    "description" : "bababouille"
    "character_id" : 1

}

// Url de la route : POST localhost:3000/skills/:id

```

## Gestion des Invite 

  - Creation d'une invite

```js

    const formData  = 
                {

                    "fake_id" : 0// Obligatoire
                    "status" : "start",
                    "game_id" : 1,
                    "pseudo" : "banane", // Pseudo du user qui reçoit l'invite
                    "user_id" : 2 // Id du use qui envoie l'invite
                },


    // Url de la route : POSTS localhost:3000/invites/:id

```

  - Pour le Delete d'une invite

```js 

    // Pas besoin de form, on passe l'id de l'invite dans la requête

    // url de la route : delete localhost:3000/invites/:id

```


  - Pour l'update d'une invite

``` js 

const formData = {

    "id" : 1, // Obligatoire
    "status" : "in progress",
    "game_id" : 1,
    "pseudo" : "banane", // Pseudo du user qui reçoit l'invite
    "user_id" : 2 // Id du use qui envoie l'invite

}

// Url de la route : POST localhost:3000/invites/:id

```

## Gestion des News 

 - Creation d'une news

```js

    const formData = {

        "fake_id" : 0,
        "title" : "Let's Begin !"
        "content" : "Lorem Ipsum X 50"
        "user_id" : 1 // id du user qui crée la news
    }

    // url de la route : POST localhost:/news/:id

```

- Delete d'une news

```js 

    // Pas besoin de form, on passe l'id de la news dans la requête

    // url de la route : delete localhost:3000/news/:id

```

 - Pour l'update d'une news

```js

 const formData  = 
                {

                    "id" : 0// Obligatoire
                    "status" : "start",
                    "game_id" : 1,
                    "pseudo" : "banane", // Pseudo du user qui reçoit l'invite
                    "user_id" : 2 // Id du use qui envoie l'invite
                },


    // Url de la route : POST localhost:3000/invites/:id


```

## Gestion des Maps

- Pour la création 

```js

const formData = {

    "fake_id" : 1, // Obligatoire
    "name" : "donjon de glace",
    "category" : "donjon",
    "url" : "/donjons/donjonsDeGlace.jpeg",
    "game_id" : 5
}

// url de la route : POST localhost:/maps/:id

```

  - Pour le delete d'une map 

```js 

    // Pas besoin de form, on passe l'id de la map dans la requête

    // url de la route : delete localhost:3000/maps/:id

```

 - Pour l'update d'une map

```js

const formData = {

    "fake_id" : 1, // Obligatoire
    "name" : "donjon de glace",
    "category" : "donjon",
    "url" : "/donjons/donjonsDeGlace.jpeg",
    "game_id" : 5
}

// url de la route : POST localhost:/maps/:id

```