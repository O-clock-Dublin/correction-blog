import { ICategory } from "../../@types"
import { NavLink } from "react-router"
import "./Header.scss"

interface HeaderProps {
  categories: ICategory[]
  isZenModeEnabled: boolean
  changeZenMode: React.Dispatch<React.SetStateAction<boolean>>
  search?: string  // tu peux mettre optionnel ou supprimer
}

function Header({
  categories,
  isZenModeEnabled,
  changeZenMode,
  search,
}: HeaderProps) {
  return (
    <header className="menu" id="header">
      <nav>
        {categories.map((category) => (
          <NavLink
            key={category.label}
            to={category.route === "/" ? "/" : `/categ${category.route}`}
            className={({ isActive }) =>
              isActive ? "menu-link selected" : "menu-link"
            }
          >
            {category.label}
          </NavLink>
        ))}
        <button
          className="menu-btn"
          type="button"
          onClick={() => changeZenMode(!isZenModeEnabled)}
        >
          {isZenModeEnabled ? "Désactiver" : "Activer"} le mode zen
        </button>
      </nav>
    </header>
  )
}

export default Header
