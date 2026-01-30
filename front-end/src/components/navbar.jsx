import { useState } from "react";
import drapeauIcon from "/src/assets/drapeau.png";

// On ajoute la prop { transparent } pour pouvoir choisir le mode
const TopNavbar = ({ transparent = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav
                className={`flex items-center justify-between px-6 py-4 transition-all duration-300 z-50 w-full ${transparent
                    ? "bg-transparent absolute top-0 left-0 shadow-none"
                    : "bg-white shadow-sm rounded-b-2xl relative"
                    }`}
            >
                <div className="bg-[#1F66B1] text-white font-bold text-xl px-3 py-3 rounded-2xl tracking-wider select-none cursor-pointer">
                    MARS.A.I
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={drapeauIcon}
                        alt="LogoDrapeau"
                        className="h-8 w-11 object-cover cursor-pointer rounded-sm"
                    />

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        aria-label="Ouvrir le menu"
                    >
                        <i className="fa-solid fa-bars text-black text-xl"></i>
                    </button>
                </div>
            </nav>
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[60] ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[70] transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 flex justify-between items-center border-b">
                    <span className="font-bold text-lg">MARS.A.I</span>
                    <button onClick={() => setMenuOpen(false)}>
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-3">
                    <a href="#" className="hover:text-blue-500 transition-colors">LE FESTIVAL</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">GALERIE</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">AGENDA</a>
                    <a href="#" className="hover:text-blue-500 transition-colors">LIEU</a>
                </div>
            </div>
        </>
    );
};

export default TopNavbar;