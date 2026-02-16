 import React from "react";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
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