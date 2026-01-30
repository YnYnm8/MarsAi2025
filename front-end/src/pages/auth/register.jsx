import { useState } from "react";
import { useNavigate, Link } from "react-router";
import logo from "/src/assets/icon-stars.png";
import profile from "/src/assets/profil.png";
import mailIcon from "/src/assets/mail.png";
import cadenaIcon from "/src/assets/cadena.png";
import TopNavbar from "./navbar";



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


    return ( // Mobile Resp
        <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center px-6 pt-8 pb-12">
             <TopNavbar />

            {/* Header */}
            <div className="w-full flex items-center justify-between mb-10">

            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold tracking-widest text-gray-900">
                    REJOINDRE MARS.A.I
                </h1>

                <div className="flex items-center justify-center mt-3">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-5 w-auto object-contain"
                    />
                    <p className="text-xs tracking-[0.4em] text-gray-800 font-medium">
                        INSCRIVEZ-VOUS POUR SOUMETTRE VOS FILMS
                    </p>
                </div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-6 py-7">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-[11px] font-semibold text-[#6B7A90] tracking-widest mb-2">
                            NOM
                        </label>
                        <div className="flex items-center bg-[#F2F4F7] rounded-2xl px-4 py-3 border border-gray-200">
                            <img
                                src={profile}
                                alt="LogoProfile"
                                className="h-5 w-auto object-contain mr-2"
                            />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="NOM"
                                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-[#6B7A90] tracking-widest mb-2">
                            PRENOM
                        </label>
                        <div className="flex items-center bg-[#F2F4F7] rounded-2xl px-4 py-3 border border-gray-200">
                            <img
                                src={profile}
                                alt="Logoprofile"
                                className="h-5 w-auto object-contain mr-2"
                            />
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="PRENOM"
                                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-[#6B7A90] tracking-widest mb-2">
                            ADRESSE E-MAIL
                        </label>
                        <div className="flex items-center bg-[#F2F4F7] rounded-2xl px-4 py-3 border border-gray-200">
                            <img
                                src={mailIcon}
                                alt="logoMail"
                                className="h-5 w-auto object-contain mr-2"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EMAIL@EXEMPLE.COM"
                                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-[#6B7A90] tracking-widest mb-2">
                            MOT DE PASSE
                        </label>
                        <div className="flex items-center bg-[#F2F4F7] rounded-2xl px-4 py-3 border border-gray-200">
                            <img
                                src={cadenaIcon}
                                alt="logoCadena"
                                className="h-5 w-auto object-contain mr-2"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold text-[#6B7A90] tracking-widest mb-2">
                            VERIFIER MOT DE PASSE
                        </label>
                        <div className="flex items-center bg-[#F2F4F7] rounded-2xl px-4 py-3 border border-gray-200">
                            <img
                                src={cadenaIcon}
                                alt="logoCadena"
                                className="h-5 w-auto object-contain mr-2"
                            />
                            <input
                                type="password"
                                value={verifiedPassword}
                                onChange={(e) => setVerifiedPassword(e.target.value)}
                                placeholder="••••••••••"
                                className="bg-transparent w-full outline-none text-sm placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1F66B1] hover:bg-[#155a9c] text-white font-semibold py-3 rounded-2xl transition mt-2"
                    >
                        CRÉER MON PROFIL
                    </button>
                </form>

                <div className="my-5 border-t border-gray-200"></div>

                <p className="text-center text-xs text-gray-500 tracking-wide">
                    DÉJÀ INSCRIT ?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-gray-700 hover:text-black"
                    >
                        CONNECTEZ-VOUS ICI
                    </Link>
                </p>
            </div>

            <Link
                to="/login"
                className="mt-8 text-sm text-blue-600 font-semibold flex items-center gap-2"
            >
                ← RETOUR ACCUEIL
            </Link>

        </div>
    );
};

export default Register;
