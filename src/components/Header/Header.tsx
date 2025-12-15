import { ICategory } from "../../@types"
import { Link } from "react-router"
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
        <Link
          className={location.pathname === "/" ? "menu-link selected" : "menu-link"}
          to="/"
        >
          Accueil
        </Link>
        {categories.slice(1).map((category) => {
          const isSelected =
            location.pathname === category.route ||
            search.toLowerCase() === category.label.toLowerCase();

          return (
            <Link
              className={isSelected ? "menu-link selected" : "menu-link"}
              to={`/categ/${category.label.toLowerCase()}`}
              key={category.label}
            >
              {category.label}
            </Link>
          );
        })}

        <button
          className="menu-btn"
          type="button"
          onClick={() => changeZenMode(!isZenModeEnabled)}
        >
          {isZenModeEnabled ? "Désactiver" : "Activer"} le mode zen
        </button>
      </nav>
    </header>
  );
}

export default Header
