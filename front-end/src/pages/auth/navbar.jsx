import drapeauIcon from "/src/assets/drapeau.png";

const TopNavbar = () => {
    return (
        <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm rounded-b-2xl">
            {/* Logo */}
            <div className="bg-[#1F66B1] text-white font-bold text-xl px-3 py-3 rounded-2xl tracking-wider select-none cursor-pointer">
                MARS.A.I
            </div>

            <div className="flex items-center gap-3">

                <img
                    src={drapeauIcon}
                    alt="LogoDrapeau"
                    className="h-8 w-11 object-cover cursor-pointer rounded-sm"

                />

                {/* Hamburger menu */}
                <button className="flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer group">
                    <span className="h-[2px] w-8 bg-black rounded transition-all group-hover:w-9"></span>
                    <span className="h-[2px] w-8 bg-black rounded transition-all group-hover:w-9"></span>
                    <span className="h-[2px] w-8 bg-black rounded transition-all group-hover:w-9"></span>
                </button>

            </div>
        </nav>
    );
};

export default TopNavbar;
