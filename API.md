# Documentation de l'API Sallesport

## Abonnés

- **GET** `/abonnes` : Liste tous les abonnés
- **GET** `/abonnes/:id` : Détail d'un abonné
- **POST** `/abonnes` : Créer un abonné  
  **Body JSON** :  
  ```json
  {
    "nom": "Martin",
    "prenom": "Paul",
    "email": "paul.martin@exemple.com",
    "telephone": "0611111111",
    "date_naissance": "1990-03-15",
    "date_inscription": "2025-06-16"
  }
  ```
- **PUT** `/abonnes/:id` : Modifier un abonné (mêmes champs que POST)
- **DELETE** `/abonnes/:id` : Supprimer un abonné

## Coachs

- **GET** `/coachs`
- **GET** `/coachs/:id`
- **POST** `/coachs`  
  **Body JSON** :  
  ```json
  {
    "nom": "Dupont",
    "prenom": "Marie",
    "specialite": "Yoga",
    "email": "marie.dupont@exemple.com",
    "telephone": "0600000000"
  }
  ```
- **PUT** `/coachs/:id`
- **DELETE** `/coachs/:id`

## Cours

- **GET** `/cours`
- **GET** `/cours/:id`
- **POST** `/cours`  
  **Body JSON** :  
  ```json
  {
    "nom_cours": "Yoga Matinal",
    "description": "Séance de yoga douce",
    "jour_semaine": "Lundi",
    "heure": "08:00:00",
    "duree_minutes": 60,
    "id_coach": 1
  }
  ```
- **PUT** `/cours/:id`
- **DELETE** `/cours/:id`

## Participations

- **GET** `/participations`
- **GET** `/participations/:id_abonne/:id_cours/:date_participation`
- **POST** `/participations`  
  **Body JSON** :  
  ```json
  {
    "id_abonne": 1,
    "id_cours": 2,
    "date_participation": "2025-06-17"
  }
  ```
- **DELETE** `/participations/:id_abonne/:id_cours/:date_participation`