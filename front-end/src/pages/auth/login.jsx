import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import mailIcon from "/src/assets/mail.png";
import logo from "/src/assets/icon-stars.png"
import cadenaIcon from "/src/assets/cadena.png";
import TopNavbar from "../../components/navbar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const successMessage = location.state?.successMessage;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        console.log("Email:", email, "Password:", password);
        navigate("/home");
    };

    return (
        <div>
            <TopNavbar />
            <div className="min-h-screen bg-[#F4F6F9] flex flex-col items-center px-6 pt-8 pb-12">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold tracking-widest text-gray-900">
                        CONNEXION
                    </h1>

                    <div className="flex items-center justify-center gap-3 mt-3">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-5 w-auto object-contain"
                        />
                        <p className="text-xs tracking-[0.25em] text-gray-600 font-medium">
                            ESPACE MEMBRE MARS.A.I
                        </p>
                    </div>

                </div>

                <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-6 py-7">

                    {successMessage && (
                        <p className="text-green-600 text-sm mb-4 text-center">
                            {successMessage}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

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
                        
                        <button
                            type="submit"
                            className="w-full bg-[#1F66B1] hover:bg-[#155a9c] text-white font-semibold py-3 rounded-2xl transition mt-2"
                        >
                            ACCÉDER À L’ESPACE
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-200"></div>

                    {/* Register link */}
                    <p className="text-center text-xs text-gray-500 tracking-wide">
                        NOUVEAU SUR MARS.A.I ?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-gray-700 hover:text-black"
                        >
                            INSCRIVEZ-VOUS
                        </Link>
                    </p>

                </div>

                {/* Bottom back link */}
                <Link
                    to="/register"
                    className="mt-8 text-sm text-blue-600 font-semibold flex items-center gap-2"
                >
                    ← RETOUR ACCUEIL
                </Link>

            </div>
        </div>
    );
};

export default Login;
