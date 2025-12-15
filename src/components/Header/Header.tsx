import { ICategory } from "../../@types"
import "./Header.scss"
import { NavLink } from "react-router"

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
          <NavLink
            key={category.label}
            to={category.route}
            className={({ isActive }) =>
              [
                "menu-link",
                isActive ||
                search.toLowerCase() === category.label.toLowerCase()
                  ? "selected"
                  : "",
              ].join(" ")
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
  );
}


export default Header
