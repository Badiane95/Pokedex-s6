# Pokédex S6 — Projet BUT MMI Développement Web

Projet réalisé dans le cadre du devoir noté de S6 – Développement Web et dispositif interactif (BUT MMI, option développement).

## 👥 Membres du groupe

| Pseudonyme | Profil GitHub |
|---|---|
| lucasl0 | [github.com/lucasl0](https://github.com/lucasl0) |
| Badiane95 | [github.com/Badiane95](https://github.com/Badiane95) |
| ShaunQ0 | [github.com/ShaunQ0](https://github.com/ShaunQ0) |

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) v20+
- [npm](https://www.npmjs.com/) v9+
- [PHP](https://www.php.net/) 8.1+ (pour le back-end upload jaquettes)
- [MySQL](https://www.mysql.com/) 8.0+ (ou MariaDB)

### Installation

```bash
# Cloner le repo
git clone https://github.com/lucasl0/Pokedex-s6.git
cd Pokedex-s6/github-actions/partie-3

# Installer les dépendances
npm install

# Installer les navigateurs Playwright
npx playwright install
```

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine du dossier `github-actions/partie-3/` :

```env
# Token GitHub (Personal Access Token — ne pas commiter)
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Base de données (si applicable)
MYSQL_USER=votre_utilisateur
MYSQL_PASSWORD=votre_mot_de_passe
MYSQL_SERVER=localhost
MYSQL_DATABASE=pokedex
```

> ⚠️ **Important** : Ne jamais commiter le fichier `.env`. Il est dans le `.gitignore`.
> Utiliser [singleuse.link](https://singleuse.link/create) pour partager les tokens entre membres.

## 🗄️ Schéma de base de données

```sql
CREATE TABLE jaquettes (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    game_name   VARCHAR(100) NOT NULL COMMENT 'Correspond au champ name de PokéAPI (ex: red, blue, gold)',
    filename    VARCHAR(255) NOT NULL COMMENT 'Nom de fichier sanitizé (minuscules, sans accents)',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Exporter la base de données

```bash
mysqldump -u {USER} -p{PASSWORD} --no-create-db {DATABASE} > database.sql
```

### Importer la base de données

```bash
mysql -u {USER} -p{PASSWORD} -h {SERVER} {DATABASE} < database.sql
```

## 🛠️ Scripts disponibles

```bash
npm run dev          # Serveur de développement (Vite)
npm run build        # Build de production
npm run lint         # Linter ESLint
npm run test:unit    # Tests unitaires (Vitest)
npm run test:e2e     # Tests end-to-end (Playwright)
```

## 🔑 Secrets GitHub Actions

Configurer dans **Settings → Secrets and variables → Actions** :

| Nom du secret | Description |
|---|---|
| `SSH_KEY` | Clé SSH privée pour le déploiement rsync |
| `SSH_USER` | Nom d'utilisateur SSH du serveur |
| `SSH_SERVER` | Adresse IP ou domaine du serveur |
| `MYSQL_USER` | Utilisateur base de données |
| `MYSQL_PASSWORD` | Mot de passe base de données |
| `MYSQL_SERVER` | Hôte du serveur MySQL |
| `MYSQL_DATABASE` | Nom de la base de données |

> `GITHUB_TOKEN` est automatiquement fourni par GitHub Actions, pas besoin de le définir manuellement.

## 🔄 Pipeline CI/CD

Le workflow `.github/workflows/release.yml` se déclenche :
- Sur chaque **push** sur `main`
- Sur chaque **pull_request** vers `main`

```
┌─────────┐    ┌──────────────┐    ┌───────────────┐
│  Lint   │    │ Tests Vitest │    │ Tests e2e     │
│ ESLint  │    │ (+ artefact) │    │ Playwright    │
└────┬────┘    └──────┬───────┘    │ (artefact si  │
     │                │            │  échec)        │
     └────────────────┴────────────┤               │
                                   └───────┬───────┘
                                           │
                                   ┌───────▼───────┐
                                   │  Déploiement  │
                                   │  rsync SSH    │
                                   │  + Migration  │
                                   │  BDD MySQL    │
                                   └───────────────┘
```

## 📦 Versionnement

```bash
# Tag manuel
git tag 1.0.0
git push origin --tags

# Ou via release-it
npx release-it
```

## 🌐 APIs utilisées

- [Tyradex](https://tyradex.vercel.app/) — données Pokémon en français
- [PokéAPI](https://pokeapi.co/) — données complètes Pokémon
- [TCGdex](https://tcgdex.dev/) — cartes Pokémon TCG
- [API GitHub](https://docs.github.com/fr/rest) — liste des collaborateurs
