import { useState } from "react";
import drapeauIcon from "/src/assets/drapeau.png";

const TopNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm rounded-b-2xl relative z-50 w-full">
                {/* LOGO */}
                <div className="bg-[#1F66B1] text-white font-bold text-xl px-3 py-3 rounded-2xl tracking-wider select-none cursor-pointer">
                    MARS.A.I
                </div>

                {/* ICONS & MENU BUTTON */}
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

            {/* OVERLAY (Le fond sombre quand le menu est ouvert) */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[60] ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* SIDEBAR MOBILE MENU */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-[70] transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* HEADER DU MENU */}
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <span className="font-bold text-lg text-[#1F66B1]">MARS.A.I</span>
                    <button onClick={() => setMenuOpen(false)} className="text-black">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>

                {/* LIENS DU MENU - On force le text-gray-800 ici */}
                <div className="p-6 flex flex-col gap-6">
                    <a href="#" className="text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                        LE FESTIVAL
                    </a>
                    <a href="#" className="text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                        GALERIE
                    </a>
                    <a href="#" className="text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                        AGENDA
                    </a>
                    <a href="#" className="text-gray-800 hover:text-blue-500 active:text-blue-600 transition-colors font-bold uppercase text-sm tracking-widest">
                        LIEU
                    </a>
                </div>
            </div>

        </>
    );
};

export default TopNavbar;