# Pokedex S6 - BUT MMI Developpement Web

> Projet realise dans le cadre du devoir note de S6 - Developpement Web et dispositif interactif (BUT MMI, option developpement).

---

## Membres du groupe

| Pseudonyme | Profil GitHub |
|---|---|
| lucasl0 | [github.com/lucasl0](https://github.com/lucasl0) |
| Badiane95 | [github.com/Badiane95](https://github.com/Badiane95) |
| ShaunQ0 | [github.com/ShaunQ0](https://github.com/ShaunQ0) |

---

## Mise en place du projet

### Prerequis

- Node.js >= 20
- npm >= 9

### Installation

```bash
git clone https://github.com/lucasl0/Pokedex-s6.git
cd Pokedex-s6/github-actions/partie-3
npm install
```

### Configuration de l'environnement

Copier le fichier `.env.example` en `.env` :

```bash
cp .env.example .env
```

Template `.env` :

```env
# Token GitHub API (ne pas commiter)
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Infos du depot
VITE_GITHUB_OWNER=lucasl0
VITE_GITHUB_REPO=Pokedex-s6

# Injectes automatiquement par CI/CD
# VITE_ACTOR=
# VITE_BUILD_DATE=
```

> Le fichier `.env` est dans le `.gitignore` - ne jamais le commiter.

### Lancer en developpement

```bash
npm run dev
```

### Build de production

```bash
npm run build
```

---

## Technologies utilisees

| Outil | Role |
|---|---|
| [Vite](https://vitejs.dev/) | Bundler et serveur de dev |
| [TailwindCSS v4](https://tailwindcss.com/) | Styles CSS |
| [Vitest](https://vitest.dev/) | Tests unitaires |
| [Playwright](https://playwright.dev/) | Tests end-to-end |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [wavesurfer.js](https://wavesurfer.xyz/) | Spectre sonore du cri Pokemon |
| rsync via SSH | Deploiement |

---

## APIs utilisees

| API | Usage |
|---|---|
| [Tyradex](https://tyradex.vercel.app/) | Donnees Pokemon en francais |
| [PokeAPI](https://pokeapi.co/) | Donnees detaillees, cris, sprites |
| [TCGdex](https://tcgdex.dev/) | Cartes Pokemon TCG |
| [GitHub API](https://docs.github.com/fr/rest) | Liste des collaborateurs |

---

## Schema base de donnees

La base de donnees MySQL est utilisee pour stocker les jaquettes de jeux.

```sql
CREATE TABLE game_covers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration

Exporter le schema :

```bash
mysqldump -u {USER} -p{PASSWORD} --no-data --no-create-db {DATABASE} > database.sql
```

Importer :

```bash
cat > .my.cnf << EOF
[client]
user=$MYSQL_USER
password=$MYSQL_PASSWORD
database=$MYSQL_DATABASE
host=$MYSQL_SERVER
EOF

chmod 400 .my.cnf
mysql --defaults-extra-file=.my.cnf < database.sql
rm .my.cnf
```

---

## Pipeline CI/CD

Le pipeline se declenche sur `push` ou `pull_request` vers `main`.

```
lint ──┐
       ├──> build ──> e2e ──> deploy (main push uniquement)
unit ──┘
```

### Secrets GitHub a configurer

| Nom | Description |
|---|---|
| `SSH_KEY` | Cle SSH privee pour le deploiement |
| `SSH_USER` | Utilisateur SSH du serveur |
| `SSH_SERVER` | Adresse du serveur de production |
| `MYSQL_USER` | Utilisateur base de donnees |
| `MYSQL_PASSWORD` | Mot de passe base de donnees |
| `MYSQL_SERVER` | Serveur base de donnees |
| `MYSQL_DATABASE` | Nom de la base de donnees |
| `VITE_GITHUB_TOKEN` | Token GitHub API (ne pas commiter) |

### Variables GitHub a configurer

| Nom | Valeur |
|---|---|
| `VITE_GITHUB_OWNER` | `lucasl0` |
| `VITE_GITHUB_REPO` | `Pokedex-s6` |

---

## Tests

```bash
# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e
```

---

## Securite

- Les `.env` sont proteges via `.htaccess` genere automatiquement par le CI
- Le token GitHub est injecte via les Secrets GitHub Actions, jamais commite
- `VITE_ACTOR` et `VITE_BUILD_DATE` sont injectes par CI pour afficher le dernier deployeur

---

## Credits

- APIs : [Tyradex](https://tyradex.vercel.app/), [PokeAPI](https://pokeapi.co/), [TCGdex](https://tcgdex.dev/)
- Icones types : [pokemon-type-icons](https://github.com/duiker101/pokemon-type-icons)
- Logo : BUT MMI - Annee universitaire 2024-2025
