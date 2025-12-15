import ReactDOM from "react-dom/client"
import App from "./components/App/App"
import "./styles/index.scss"
import { StrictMode } from "react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
