# Challenge Routage

On va continuer la mise en place du blog.

Tu peux repartir de ton code du challenge précédent s'il est fonctionnel, ou alors du code fourni avec cet énoncé.

## 1. Mise en place du router

- Installe `react-router`
- Mets en place le composant `BrowserRouter`

## 2. Liens

### 2.1. liens vers la page categorie

Remplace les liens du menu des catégories par des `NavLink`.

Urls des liens :

- `/categ/react`
- `/categ/angular`
- ...

### 2.2 liens vers la page post

Crée des `Link` sur les blocs articles.

Utilise le slug du post pour créer l'url des liens :

- `/post/react-une-vraie-bonne-idee`
- ...

## 3. Routes

### 3.1 Route Categorie

Ajoute une route pour la page catégorie, qui affiche uniquement les articles dont la catégorie correspond à celle passée dans l’URL.

→ `/categ/react` n'affiche que les posts qui ont pour catégorie `react`.

### 3.2 Route Post

Ajoute une route pour la page d'un post (qui affiche le contenu du post dont le slug est dans l'URL).

Il faudra créer le nouveau composant `PostPage`.

## **Bonus `useRef`**

Comme pour notre input du filtre macaron, place le focus automatiquement sur l’input de recherche d’articles dès le premier rendu.
