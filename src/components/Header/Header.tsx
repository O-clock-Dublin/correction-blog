import { NavLink } from "react-router-dom"
import { ICategory } from "../../@types"
import "./Header.scss"

interface HeaderProps {
  categories: ICategory[]
  isZenModeEnabled: boolean
  changeZenMode: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({
  categories,
  isZenModeEnabled,
  changeZenMode,
}: HeaderProps) {
  return (
    <header className="menu" id="header">
      <nav>
        {categories.map((category) => (
          <NavLink
            to={`/categ/${category.label.toLowerCase()}`}
            className={({ isActive }) =>
              isActive ? "menu-link selected" : "menu-link"
            }
            key={category.label}
          >
            {category.label}
          </NavLink>
        ))}
        <button
          className="menu-btn"
          type="button"
          onClick={() => {
            // on change dans le state de App : le contraire de la valeur actuelle
            changeZenMode(!isZenModeEnabled)

            // meilleure pratique : https://react.dev/learn/state-as-a-snapshot
          }}
        >
          {isZenModeEnabled ? "Désactiver" : "Activer"} le mode zen
        </button>
      </nav>
    </header>
  )
}

export default Header
