import { useState } from "react";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");


  return (
    <div>
      <h1>Inscription</h1>
      <input
        type="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />
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
      <input
        type="verifiedPassword"
        id="verifiedPassword"
        value={verifiedPassword}
        onChange={(e) => setVerifiedPassword(e.target.value)}
        placeholder="verifier mot de passe"
        required
      />

      <button type="submit">
        S'inscrire
      </button>


      <a href="/login">
        Se connecter
      </a>
    </div>
  );

}