# Challenge Appels d'API & useEffect

Pour ce challenge, on continue à travailler sur notre blog. Cette fois-ci, on va s'attaquer à récupérer nos données depuis une API. Tu peux repartir de ton code du challenge précédent s'il est fonctionnel, ou alors du code fourni avec cet énoncé.

## 1 - Récupération des articles

Jusqu'ici, nos données sont récupérées depuis un fichier stocké dans un dossier local. Mais, on a désormais une API pour afficher nos articles : [Endpoint d'API ici](https://oclock-api.vercel.app/api/blog/posts).

Plan d'action :

- Créé un state permettant de stocker les articles (ce state est initialisé avec un tableau vide, on le remplira avec les données de l'API quand on les reçoit)
- Au premier rendu du composant (dans un useEffect avec tableau de dependances vide) :
- Créé et execute une fonction asynchrone qui fait :
  - le call API
  - l'enregistrement des posts reçus dans le state

## 2 - Gestion d'erreur

Dans le meilleur des mondes, notre application fonctionne bien et on récupère nos données à tous les coups 😃. Mais si l'API ne fonctionne pas, il faut l'indiquer à l'utilisateur !

Plan d'action :

- Créé un state dans `App.tsx` pour stocker l'état d'erreur (initialise le à chaine vide puisqu'au debut il n'y a pas d'erreur).
- Englobe ton call API d'une structure `try/catch`
- Après le fetch, ajoute une condition qui indique que si la propriété `httpResponse.ok` est `false`, on throw une erreur à traiter dans le bloc `catch`
- Dans le bloc catch, enregistre l'erreur dans le state.
- Utilise cet état pour conditionner l'affichage d'un message d'erreur dans le JSX.

## 3 - Gestion du loader

Au premier rendu on a pas encore les données donc on va afficher un loader à nos utilisateur pour les informer que la requete API est en cours.

Plan d'action :

- Créé un nouveau composant nommé `Loader.tsx` et ajoutez-y un loader de votre choix (un modèle est fourni à la suite)
- Créé un state dans `App.tsx` pour stocker l'état de chargement (initialise le à `true` puisque dès le premier rendu on voudra afficher le loader).
- Passe le state à `false` après le call API (qu'il se soit bien ou mal passé)
- Utilise cet état pour conditionner l'affichage du composant Loader.

<details>
<summary>Besoin d'un loader ?</summary>

```html
<span class="loader"></span>
```

```css
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

</details>

---

## BONUS - Récupération des catégories

On reprend les mêmes étapes ci-dessus mais cette fois-ci pour les catégories : [Endpoint d'API ici](https://oclock-api.vercel.app/api/blog/categories)

---

## BONUS useRef - scroll automatique quand on affiche le message de validation de l'abonnement à la newsletter

Pour ce bonus il faut avoir mis en place le formulaire d'abonnement à la newsletter dans le footer. C'était dans l'énoncé du challenge précédent, si tu ne l'as pas dans ton code tu peux récupérer le code du composant `Footer` dans la correction du challenge faite aujourd'hui en cours.

Quand le message de validation apparaît on ne voit pas le texte complet, parce que la page a changé de hauteur et la scrollbar est restée à la position où elle était :

![](./docs/footer.png)

On voudrait déplacer (en JavaScript) la scrollbar tout en bas quand le message vient d'apparaître.

<details><summary>Indices</summary>

- on veut faire ce scroll suite à un changement de l'affichage : _useEffect_

Mais on ne veut pas faire le changement suite à n'importe quel changement d'affichage. Vérifie avec console.log que tu as placé ton effet dans le bon composant et que tu as mis le bon paramétrage. Il faudra aussi que tu places ton console.log dans un _if_ : on ne veut pas faire le scroll automatique après le premier affichage, mais les effets s'appliquent obligatoirement après le premier affichage quel que soit le paramétrage.

- on veut manipuler la scrollbar de la page, quelques pistes : https://developer.mozilla.org/fr/docs/Web/API/Element/scrollTo / https://developer.mozilla.org/fr/docs/Web/API/Element/scrollHeight

</details>

<details><summary>Correction</summary>

Dans le composant Footer :

```ts
useEffect(() => {
  // on ne veut pas appliquer de traitement pour le premier rendu => à ce moment-là email est vide
  if (email !== "") {
    // console.log('il faudrait scroll en bas');

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo
    // => déplacer la scrollbar à la position indiquée
    window.scrollTo({
      // la hauteur totale du document (scrollHeight = la hauteur d'un élément y compris la zone non visible à cause d'un overflow)
      top: document.documentElement.scrollHeight,
      left: 0, // pas de scrollbar horizontale donc on met 0
      behavior: "smooth", // on veut un déplacement fluide, progressif
    })
  }
}, [email])
// effet qui se déclenche après le premier rendu et quand email change de valeur
```

`email` est la variable de state qui contient l'e-mail une fois que le formulaire a été soumis.

On peut appliquer `scrollTo` sur `document.documentElement` au lieu de `window`.

</details>
