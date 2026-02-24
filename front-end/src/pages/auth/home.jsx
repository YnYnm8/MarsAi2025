import bgImg from "../../assets/accueilbg.png";
import TopNavbar from "../../components/navbar";
import logo from "/src/assets/icon-stars.png"
import Footer from "../../components/footer";
import { useTranslation } from 'react-i18next'; 

const Home = () => {
    // 1. On initialise la fonction "t" pour traduire
    const { t } = useTranslation('home'); 
        
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
                            {/* Traduction du sous-titre */}
                            {t('subtitle')}
                        </span>
                    </div>

                    <h1 className="text-[42px] md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
                        {/* Traduction du grand titre (en 3 parties pour garder le FUTURS en rouge) */}
                        {t('title_1')} <br />
                        <span className="text-red-500">{t('title_2')}</span> <br />
                        {t('title_3')}
                    </h1>

                    <p className="text-sm md:text-base max-w-[320px] md:max-w-md opacity-100 leading-relaxed mb-10 font-light">
                        {/* Traduction de la description (en 2 parties pour le saut de ligne) */}
                        {t('desc_1')} <br />
                        {t('desc_2')}
                    </p>

                    <div className="flex flex-col gap-4 w-full max-w-[340px]">

                        {/* Bouton Participer (Bleu) */}
                        <button className="bg-[#1F66B1] py-4 px-8 rounded-full font-bold text-sm flex items-center justify-center">
                            {t('btn_participate')}
                        </button>

                        {/* Bouton En savoir plus (Blanc) */}
                        <button className="w-fit self-center bg-white text-black py-4 px-8 rounded-full font-bold text-xs flex items-center justify-center shadow-lg">
                            {t('btn_learn_more')}
                        </button>
                    </div>
                </main>

            </div>
            <Footer />
        </div>
    );
};

export default Home;