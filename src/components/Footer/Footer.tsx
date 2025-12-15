import { useState } from "react"
import "./Footer.scss"

function Footer() {
  const now = new Date()
  const year = now.getFullYear()

  //Je crée un useState pour controler le champ
  const [email, setEmail] = useState("")

  //Je crée un state boolean qui va vérifier si l'email est envoyé ou non
  const [isSubmitted, setIsSubmitted] = useState(false)

  //Je crée une fonction qui gère l'input password
  //qui modifie la valeur de password
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //Je cache l'encart de confirmation
    setIsSubmitted(false)
    //Je recupère la valeur de l'input utilisateur
    const input = e.target.value
    // Je la stocke dans mon state email
    setEmail(input)
  }

  //Je crée une fonction qui gère l'envoi du formulaire
  function handleSubmit() {
    //je pass la valeur de isSubmitted à true
    // Ce qui affiche l'encadré de confirmation dans le footer
    setIsSubmitted(true)
    alert(email)
    //Je reinitialise l'input email
    setEmail("")
  }

  // Alternative écriture
  // const handleSubmit = () => {

  // }

  return (
    <footer className="copyright">
      DevOfThrones, le blog du développeur React - {year} ©
      {/* Depuis React 19 action remplace onSubmit
      Et vous evite de devoir crée un formData
      et de devoir utiliser l'event pour preventDefault()
      !!!! l'utilisation du formData ne sert QUE pour les champs NON-controlés
      On utilise Action pour gagner  */}
      <form className="newsletter" action={handleSubmit}>
        <label htmlFor="emailInput">
          Indiquez votre adresse e-mail pour vous abonner à la newsletter&nbsp;:{" "}
        </label>
        <input
          className="input-newsletter"
          name="emailInput"
          id="emailInput"
          value={email}
          type="text"
          placeholder="Adresse e-mail"
          onChange={handleChange}
        />
        <button type="submit">Valider l&nbsp;abonnement</button>
      </form>
      {isSubmitted && (
        <div className="confirm">
          Vous êtes maintenant abonné à la newsletter avec l'adresse
          toto@mail.com
        </div>
      )}
    </footer>
  )
}

export default Footer
