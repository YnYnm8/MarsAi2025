
import bgImg from "../../assets/accueilbg.png";
import TopNavbar from "../../components/navbar";
import logo from "/src/assets/icon-stars.png"


const Home = () => {
    return (
        <div>
            <TopNavbar />
            <div className="relative min-h-screen w-full flex flex-col font-sans text-white overflow-hidden">

                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgImg})` }}
                >
                    {/* Voile sombre pour faire ressortir le texte blanc */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <nav className="relative z-10 flex items-center justify-between px-6 py-8">

                </nav>

                <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-8 shadow-sm">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-3 w-auto object-contain"
                        />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">
                            Festival International du Film IA
                        </span>
                    </div>

                    <h1 className="text-[42px] md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                        IMAGINEZ DES <br />
                        <span className="text-red-500">FUTURS</span> <br />
                        SOUHAITABLES
                    </h1>

                    <p className="text-sm md:text-base max-w-[320px] md:max-w-md opacity-100 leading-relaxed mb-10 font-light">
                        Le festival de courts-métrages de 60 secondes réalisés par IA. <br />
                        2 jours d'immersion au cœur de Marseille.
                    </p>

                    <div className="flex flex-col gap-4 w-full max-w-[340px]">

                        {/* Bouton Participer (Bleu) */}
                        <button className="bg-[#1F66B1] py-4 px-8 rounded-full font-bold text-sm flex items-center justify-center">
                            PARTICIPER MAINTENANT
                        </button>

                        {/* Bouton En savoir plus (Blanc) */}
                        <button className="w-fit self-center bg-white text-black py-4 px-8 rounded-full font-bold text-xs flex items-center justify-center shadow-lg">
                            EN SAVOIR PLUS
                        </button>
                    </div>
                </main>

                {/* Espace vide en bas pour équilibrer le centrage vertical */}
                <div className="relative z-10 h-80"></div>
            </div>
        </div>
    );
};

export default Home;