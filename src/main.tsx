import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router"
import App from "./components/App/App"
import "./styles/index.scss"
import { StrictMode } from "react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
