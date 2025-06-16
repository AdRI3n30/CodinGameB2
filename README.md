# CodinGameB2 – API Sallesport

## Présentation

Cette API REST permet de gérer une salle de sport avec les entités principales : **abonnes**, **coachs**, **cours** et **participations**.  
Elle utilise Node.js, Express et MySQL (WAMP).

---

## Installation

1. **Cloner le projet**  
   ```bash
   git clone https://github.com/AdRI3n30/CodinGameB2
   cd CodinGameB2
   ```

2. **Installer les dépendances**  
   ```bash
   npm install
   ```

3. **Configurer la base de données**  
   - Importer le fichier `sallesport.sql` dans votre serveur MySQL (WAMP).
   - Adapter les identifiants de connexion dans `index.js` si besoin.

4. **Lancer l’API**  
   ```bash
   node index.js
   ```

---

## Endpoints de l’API

### Abonnés

| Méthode | URL                | Description                |
|---------|--------------------|----------------------------|
| GET     | `/abonnes`         | Liste tous les abonnés     |
| GET     | `/abonnes/:id`     | Détail d’un abonné         |
| POST    | `/abonnes`         | Créer un abonné            |
| PUT     | `/abonnes/:id`     | Modifier un abonné         |
| DELETE  | `/abonnes/:id`     | Supprimer un abonné        |

**Exemple de body POST/PUT** :
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

---

### Coachs

| Méthode | URL                | Description                |
|---------|--------------------|----------------------------|
| GET     | `/coachs`          | Liste tous les coachs      |
| GET     | `/coachs/:id`      | Détail d’un coach          |
| POST    | `/coachs`          | Créer un coach             |
| PUT     | `/coachs/:id`      | Modifier un coach          |
| DELETE  | `/coachs/:id`      | Supprimer un coach         |

**Exemple de body POST/PUT** :
```json
{
  "nom": "Dupont",
  "prenom": "Marie",
  "specialite": "Yoga",
  "email": "marie.dupont@exemple.com",
  "telephone": "0600000000"
}
```

---

### Cours

| Méthode | URL                | Description                |
|---------|--------------------|----------------------------|
| GET     | `/cours`           | Liste tous les cours       |
| GET     | `/cours/:id`       | Détail d’un cours          |
| POST    | `/cours`           | Créer un cours             |
| PUT     | `/cours/:id`       | Modifier un cours          |
| DELETE  | `/cours/:id`       | Supprimer un cours         |

**Exemple de body POST/PUT** :
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

---

### Participations

| Méthode | URL                                                          | Description                      |
|---------|--------------------------------------------------------------|----------------------------------|
| GET     | `/participations`                                            | Liste toutes les participations  |
| GET     | `/participations/:id_abonne/:id_cours/:date_participation`   | Détail d’une participation       |
| POST    | `/participations`                                            | Ajouter une participation        |
| DELETE  | `/participations/:id_abonne/:id_cours/:date_participation`   | Supprimer une participation      |

**Exemple de body POST** :
```json
{
  "id_abonne": 1,
  "id_cours": 2,
  "date_participation": "2025-06-17"
}
```

---

## Validation & gestion des erreurs

- Les champs obligatoires sont vérifiés à la création et à la modification.
- Les erreurs SQL ou de validation renvoient un code HTTP 400 ou 500 avec un message explicite.

---

## Tester l’API

Utilisez [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) pour tester les routes.  
N’oubliez pas d’envoyer les données au format JSON dans le body pour les POST/PUT.

---

## Auteur

Projet réalisé par Adrien Borée et Nathan Novarese pour  le module CodingGame.
