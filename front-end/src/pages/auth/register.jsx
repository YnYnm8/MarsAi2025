import { useState } from "react";
import { useNavigate, Link } from "react-router";
import logo from "/src/assets/icon-stars.png";
import profile from "/src/assets/profil.png";
import mailIcon from "/src/assets/mail.png";
import cadenaIcon from "/src/assets/cadena.png";
import TopNavbar from "../../components/navbar";

const Register = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifiedPassword, setVerifiedPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== verifiedPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    firstName: firstname,
                    lastName: username,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Erreur lors de l'inscription");
                return;
            }

            // redirige vers login
            navigate("/login", {
                state: { successMessage: "Inscription réussie ! Connectez-vous." },
            });
        } catch (err) {
            console.error(err);
            alert("Erreur serveur, réessayez plus tard.");
        }
    };


    return ( 
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
            <TopNavbar />
            
             {/* --- BANNIÈRE DÉGRADÉE --- */}
            <div className="h-48 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black absolute top-0 left-0 z-0">
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-12 relative z-10">

                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-widest text-white drop-shadow-lg">
                        REJOINDRE MARS.A.I
                    </h1>

                    <div className="flex items-center justify-center mt-3 gap-2">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-5 w-auto object-contain brightness-200"
                        />
                        <p className="text-xs tracking-[0.25em] text-gray-400 font-medium uppercase">
                             Inscription
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-sm bg-[#111] border border-gray-800 rounded-2xl shadow-2xl shadow-purple-900/10 px-6 py-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                                NOM
                            </label>
                            <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                                <img
                                    src={profile}
                                    alt="LogoProfile"
                                    className="h-5 w-auto object-contain mr-3 invert opacity-70"
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="VOTRE NOM"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                                PRENOM
                            </label>
                            <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                                <img
                                    src={profile}
                                    alt="Logoprofile"
                                    className="h-5 w-auto object-contain mr-3 invert opacity-70"
                                />
                                <input
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="VOTRE PRÉNOM"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                                ADRESSE E-MAIL
                            </label>
                            <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                                <img
                                    src={mailIcon}
                                    alt="logoMail"
                                    className="h-5 w-auto object-contain mr-3 invert opacity-70"
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

                        <div>
                            <label className="block text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">
                                VERIFIER MOT DE PASSE
                            </label>
                            <div className="flex items-center bg-black rounded-xl px-4 py-3 border border-gray-700 focus-within:border-blue-500 transition-colors">
                                <img
                                    src={cadenaIcon}
                                    alt="logoCadena"
                                    className="h-5 w-auto object-contain mr-3 invert opacity-70"
                                />
                                <input
                                    type="password"
                                    value={verifiedPassword}
                                    onChange={(e) => setVerifiedPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    className="bg-transparent w-full outline-none text-sm text-white placeholder-gray-600 font-medium"
                                    required
                                />
                            </div>
                        </div>


                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-full transition mt-4 tracking-wider text-sm"
                        >
                            CRÉER MON PROFIL
                        </button>
                    </form>

                    <div className="my-6 border-t border-gray-800"></div>

                    <p className="text-center text-xs text-gray-500 tracking-wide">
                        DÉJÀ INSCRIT ?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-gray-300 hover:text-white transition-colors ml-1"
                        >
                            CONNECTEZ-VOUS ICI
                        </Link>
                    </p>
                </div>

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

export default Register;