import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./styles/index.scss";
import { StrictMode } from "react";
// Import Browser Router
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
