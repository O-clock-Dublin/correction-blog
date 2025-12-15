/**
 * Génère un slug à partir d'un titre
 * Exemple: "React, une vraie bonne idée ?" -> "react-une-vraie-bonne-idee"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Remplace les caractères spéciaux et accents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^\w\s-]/g, "") // Supprime tout sauf lettres, chiffres, espaces et tirets
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/-+/g, "-") // Remplace les tirets multiples par un seul
    .replace(/^-|-$/g, "") // Supprime les tirets en début et fin
}

