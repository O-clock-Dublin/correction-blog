// main.tsx
import ReactDOM from "react-dom/client"
import App from "./components/App/App"
import "./styles/index.scss"
import { StrictMode } from "react"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router global : toute l'app doit être à l'intérieur */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
