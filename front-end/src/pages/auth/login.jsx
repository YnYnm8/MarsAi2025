import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Attention: import depuis 'react-router-dom'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import mailIcon from "/src/assets/mail.png";
import logo from "/src/assets/icon-stars.png";
import cadenaIcon from "/src/assets/cadena.png";

// SCHÉMA DE VALIDATION (Doit matcher ton authValidator.mjs)
const loginSchema = z.object({
  email: z.string().email("Format email invalide"),
  // Le backend est strict, on doit l'être aussi pour passer le middleware
      password: z
    .string({ required_error: 'Mots de passe obligatoire'})
    .min(8, 'Min 8 caracteres')
    .regex(/[A-Z]/, 'Min 1 majuscule requise')
    .regex(/[a-z]/, 'Min 1 minuscule requise')
    .regex(/[0-9]/, 'Min 1 chiffre requis')
    .regex(/[^a-zA-Z0-9]/, "Min 1 caractère spécial requis"),
});

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const successMessage = location.state?.successMessage;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (formData) => {
    setServerError("");

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important pour recevoir le cookie.
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestion des erreurs renvoyées par Zod backend ou erreur d'auth
        setServerError(data.message || "Email ou mot de passe incorrect");
        return;
      }

      console.log("Connexion réussie !");
      navigate("/profile", { 
        state: { successMessage: "Connexion réussie ! Bienvenue." },
      });

    } catch (err) {
      console.error(err);
      setServerError("Le serveur ne répond pas. Vérifiez qu'il est lancé.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">

      {/* --- BANNIÈRE --- */}
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
              className="h-5 w-auto object-contain brightness-200"
            />
            <p className="text-xs tracking-[0.25em] text-gray-400 font-medium">
              ESPACE MEMBRE MARS.A.I
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/10 px-6 py-8">
          
          {/* Message de succès (venant de l'inscription) */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-800/50 rounded text-green-400 text-xs text-center font-bold">
              {successMessage}
            </div>
          )}

          {/* Message d'erreur Serveur */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded text-red-400 text-xs text-center font-bold">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* EMAIL */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                ADRESSE E-MAIL
              </label>
              <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.email ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                <img
                  src={mailIcon}
                  alt="logoMail"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70"
                />
                <input
                  type="email"
                  placeholder="EMAIL@EXEMPLE.COM"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
            </div>

            {/* MOT DE PASSE */}
            <div>
              <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                MOT DE PASSE
              </label>
              <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.password ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                <img
                  src={cadenaIcon}
                  alt="logoCadena"
                  className="h-5 w-auto object-contain mr-3 invert opacity-70"
                />
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-full transition mt-4 tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "CONNEXION..." : "ACCÉDER À L’ESPACE"}
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