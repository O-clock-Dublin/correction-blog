import { useParams } from "react-router"

export default function GetLabel() {
const {tag} = useParams()
return (
    <div>
        <h1>Catégorie : {tag}</h1>
    </div>
)
}