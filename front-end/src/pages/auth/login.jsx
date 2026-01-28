import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div>
      <h1>Connexion</h1>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="mot de passe"
        required
      />

      <button type="submit">
        Se connecter
      </button>


      <a href="/register">
        Se créer un compte
      </a>
    </div>
  );

}