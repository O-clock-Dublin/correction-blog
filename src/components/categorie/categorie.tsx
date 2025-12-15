import { NavLink } from "react-router-dom"; 
import { ICategory } from "../../@types"
import "./categorie.scss"

interface CategorieProps {
  category: ICategory
}

function Categorie({ category }: CategorieProps) {
  return (
     <nav>
      <ul>
        <li>
          <NavLink 
            to="/categ/react" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            React
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/categ/angular" 
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Angular
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Categorie    