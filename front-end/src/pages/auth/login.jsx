import { useState } from "react";
import { useLocation, useNavigate } from "react-router"; 
import { Link } from "react-router"; 
import mailIcon from "/src/assets/mail.png";
import logo from "/src/assets/icon-stars.png";
import cadenaIcon from "/src/assets/cadena.png";
import TopNavbar from "../../components/navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.successMessage;

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError(""); 

    if (!email || !password) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si mot de passe faux ou email inconnu
        setError(data.message || "Erreur de connexion");
        return;
      }

      // Si c'est bon, on redirige
      console.log("Connexion réussie !");
      navigate("/profile", { // TEST
        state: { successMessage: "Connexion réussie ! Bienvenue." },
      });

    } catch (err) {
      console.error(err);
      setError("Le serveur ne répond pas. Vérifiez qu'il est lancé.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      <TopNavbar />

      {/* --- BANNIÈRE DÉGRADÉE (Comme le Profil) --- */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black absolute top-0 left-0 z-0">
          <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-lg">
            CONNEXION
          </h1>

          <div className="flex items-center justify-center gap-3 mt-3">
            <img
              src={logo}
              alt="Logo"
              className="h-5 w-auto object-contain brightness-200" // Éclairci le logo pour le fond noir
            />
            <p className="text-xs tracking-[0.25em] text-gray-400 font-medium">
              ESPACE MEMBRE MARS.A.I
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/10 px-6 py-8">
          {/* Message de succès (venant de l'inscription) */}
          {successMessage && (
            <p className="text-green-400 text-sm mb-4 text-center font-bold bg-green-900/20 py-2 rounded border border-green-800/50">
              {successMessage}
            </p>
          )}

          {/* Message d'erreur */}
          {error && (
            <p className="text-red-400 text-sm mb-4 text-center font-bold bg-red-900/20 py-2 rounded border border-red-800/50">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                ADRESSE E-MAIL
              </label>
              <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                <img
                  src={mailIcon}
                  alt="logoMail"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70" // Inversion couleur pour dark mode
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@EXEMPLE.COM"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                MOT DE PASSE
              </label>
              <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                <img
                  src={cadenaIcon}
                  alt="logoCadena"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-full transition mt-4 tracking-wider text-sm"
            >
              ACCÉDER À L’ESPACE
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800"></div>

          {/* Register link */}
          <p className="text-center text-xs text-gray-500 tracking-wide">
            NOUVEAU SUR MARS.A.I ?{" "}
            <Link
              to="/register"
              className="font-bold text-gray-300 hover:text-white transition-colors ml-1"
            >
              INSCRIVEZ-VOUS
            </Link>
          </p>
        </div>

        {/* Bottom back link */}
        <Link
          to="/"
          className="mt-8 text-sm text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-2 transition-colors"
        >
          ← RETOUR ACCUEIL
        </Link>
      </div>
    </div>
  );
};

export default Login;