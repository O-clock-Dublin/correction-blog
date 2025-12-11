import { ICategory } from "../../@types"
import "./Header.scss"

interface HeaderProps {
  categories: ICategory[]
  isZenModeEnabled: boolean
  changeZenMode: React.Dispatch<React.SetStateAction<boolean>>
  search: string
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
          <a
            className={
              search.toLowerCase() === category.label.toLowerCase()
                ? "menu-link selected"
                : "menu-link"
            }
            href={category.route}
            key={category.label}
          >
            {category.label}
          </a>
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
