import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import logo from "/src/assets/icon-stars.png"; // Vérifie tes chemins d'import
import profile from "/src/assets/profil.png";
import mailIcon from "/src/assets/mail.png";
import cadenaIcon from "/src/assets/cadena.png";
import TopNavbar from "../../components/navbar";

const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit faire au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Format email invalide"),
  password: z
    .string()
    .min(8, "Min 8 caractères")
    .regex(/[A-Z]/, "Min 1 majuscule requise")
    .regex(/[a-z]/, "Min 1 minuscule requise")
    .regex(/[0-9]/, "Min 1 chiffre requis")
    .regex(/[^a-zA-Z0-9]/, "Min 1 caractère spécial requis"),
    
  verifiedPassword: z.string()
}).refine((data) => data.password === data.verifiedPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["verifiedPassword"],
});

const Register = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    // Configuration du formulaire
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onBlur" // Valide quand on quitte le champ (meilleure UX)
    });

    const onSubmit = async (formData) => {
        setServerError("");

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    // Le rôle est géré par défaut à "visitor" par le back
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Si Zod Back-end renvoie une erreur, on l'affiche
                if (data.errors) {
                    // On pourrait mapper les erreurs ici, mais pour l'instant on affiche le message global
                    setServerError(data.message || "Erreur de validation serveur");
                } else {
                    setServerError(data.message || "Erreur lors de l'inscription");
                }
                return;
            }

            navigate("/login", {
                state: { successMessage: "Inscription réussie ! Connectez-vous." },
            });

        } catch (err) {
            console.error(err);
            setServerError("Impossible de contacter le serveur.");
        }
    };

    return ( 
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
            <TopNavbar />
            
            <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black absolute top-0 left-0 z-0">
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-12 relative z-10">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-lg">
                        REJOINDRE MARS.A.I
                    </h1>
                    <div className="flex items-center justify-center mt-3 gap-2">
                        <img src={logo} alt="Logo" className="h-5 w-auto object-contain brightness-200" />
                        <p className="text-xs tracking-[0.25em] text-gray-400 font-medium uppercase">
                             Inscription
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/10 px-6 py-8">
                    
                    {serverError && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded text-red-400 text-xs text-center font-bold">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* NOM */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">NOM</label>
                            <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.lastName ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                                <img src={profile} className="h-5 w-auto object-contain mr-3 invert opacity-70" />
                                <input
                                    type="text"
                                    placeholder="VOTRE NOM"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    {...register("lastName")}
                                />
                            </div>
                            {errors.lastName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.lastName.message}</p>}
                        </div>

                        {/* PRENOM */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">PRENOM</label>
                            <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.firstName ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                                <img src={profile} className="h-5 w-auto object-contain mr-3 invert opacity-70" />
                                <input
                                    type="text"
                                    placeholder="VOTRE PRÉNOM"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    {...register("firstName")}
                                />
                            </div>
                            {errors.firstName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.firstName.message}</p>}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">ADRESSE E-MAIL</label>
                            <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.email ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                                <img src={mailIcon} className="h-5 w-auto object-contain mr-3 invert opacity-70" />
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
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">MOT DE PASSE</label>
                            <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.password ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                                <img src={cadenaIcon} className="h-5 w-auto object-contain mr-3 invert opacity-70" />
                                <input
                                    type="password"
                                    placeholder="••••••••••"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.password.message}</p>}
                        </div>

                        {/* CONFIRMATION MDP */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">VÉRIFIER MOT DE PASSE</label>
                            <div className={`flex items-center bg-black rounded-xl px-4 py-3 border transition-colors ${errors.verifiedPassword ? "border-red-500" : "border-gray-700 focus-within:border-blue-500"}`}>
                                <img src={cadenaIcon} className="h-5 w-auto object-contain mr-3 invert opacity-70" />
                                <input
                                    type="password"
                                    placeholder="••••••••••"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    {...register("verifiedPassword")}
                                />
                            </div>
                            {errors.verifiedPassword && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.verifiedPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-full transition mt-4 tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "TRAITEMENT..." : "CRÉER MON PROFIL"}
                        </button>
                    </form>

                    <div className="my-6 border-t border-gray-800"></div>

                    <p className="text-center text-xs text-gray-500 tracking-wide">
                        DÉJÀ INSCRIT ?{" "}
                        <Link to="/login" className="font-bold text-gray-300 hover:text-white transition-colors ml-1">
                            CONNECTEZ-VOUS ICI
                        </Link>
                    </p>
                </div>

                <Link to="/" className="mt-8 text-sm text-blue-500 hover:text-blue-400 font-semibold flex items-center gap-2 transition-colors">
                    ← RETOUR ACCUEIL
                </Link>

            </div>
        </div>
    );
};

export default Register;