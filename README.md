# 🎮 Pokédex - Test QA Follow

Application Pokédex locale pour le test technique des QA Engineers chez Follow.

![Pokédex Preview](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## 🚀 Lancement rapide avec Docker

### Prérequis

- Docker
- Docker Compose

### Lancer l'application

```bash
# Cloner le repo et se placer dans le dossier
cd pokedex_qa

# Lancer les conteneurs
docker-compose up --build
```

L'application sera accessible sur :

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001

### Arrêter l'application

```bash
docker-compose down
```

## 📋 Fonctionnalités disponibles

### Recherche simple

- Recherche par **nom** de Pokémon (français)
- Recherche par **numéro** de Pokémon

### Recherche avancée

- Filtre par **type** (Feu, Eau, Plante, etc.)
- Filtre par **faiblesse**
- Filtre par **talent**
- Filtre par **taille** (min/max en mètres)
- Filtre par **poids** (min/max en kg)

## 🔌 API REST

L'API backend expose les endpoints suivants :

### GET `/api/pokemon`

Récupère la liste des Pokémon avec filtres optionnels.

**Paramètres de requête :**
| Paramètre | Type | Description |
|-----------|------|-------------|
| `search` | string | Recherche par nom ou numéro |
| `type` | string | Filtre par type (ex: "Feu") |
| `weakness` | string | Filtre par faiblesse |
| `ability` | string | Filtre par talent |
| `minHeight` | number | Taille minimum (en m) |
| `maxHeight` | number | Taille maximum (en m) |
| `minWeight` | number | Poids minimum (en kg) |
| `maxWeight` | number | Poids maximum (en kg) |

**Exemple :**

```bash
curl "http://localhost:3001/api/pokemon?type=Feu&minHeight=1"
```

### GET `/api/pokemon/:id`

Récupère un Pokémon par son numéro.

### GET `/api/types`

Récupère la liste des types disponibles.

### GET `/api/weaknesses`

Récupère la liste des faiblesses disponibles.

### GET `/api/abilities`

Récupère la liste des talents disponibles.

## 🗂 Structure du projet

```
test_qa_follow/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       └── data/
│           └── pokemon.js      # Base de données Pokémon
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── public/
    │   └── pokeball.svg
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── components/
            ├── SearchBar.jsx
            ├── SearchBar.css
            ├── AdvancedFilters.jsx
            ├── AdvancedFilters.css
            ├── PokemonCard.jsx
            ├── PokemonCard.css
            ├── PokemonModal.jsx
            └── PokemonModal.css
```

## 📦 Pokémon disponibles

L'application contient une sélection de Pokémon populaires avec leurs données complètes :

- Numéro, nom français et anglais
- Types (1 ou 2)
- Talents
- Faiblesses
- Taille et poids
- Description
- Image officielle

## 🛠 Développement local (sans Docker)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

**Pokédex QA Test** - © 2025 Follow  
Application de test pour le recrutement QA Engineer
