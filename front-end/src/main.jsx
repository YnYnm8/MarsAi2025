
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import App from "./App.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
 
);
