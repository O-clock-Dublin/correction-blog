// dans ce fichier on définit le typage qu'on utilise à plusieurs endroits

// objet qui correspond à un article
export interface IPost {
  id: number
  category: string
  slug: string
  title: string
  excerpt: string
  content: string
}

// objet qui correspond à une catégorie
export interface ICategory {
  id: number
  route: string
  label: string
}
