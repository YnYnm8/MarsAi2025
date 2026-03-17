 import React from "react";
import { VITE_API_URL_FRONTEND } from "../../services/config";
const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${VITE_API_URL_FRONTEND}/logout`, {
        method: "POST",
        credentials: "include", // cookie jwt
      });

      if (response.ok) {
        console.log("Déconnexion réussie");

        // Redirection vers login
        window.location.href = "/login";
      } else {
        const data = await response.json();
        console.error("Erreur logout:", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau logout:", error);
    }
  };

  return (
    <div>
      <h1>Déconnexion</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default Logout;