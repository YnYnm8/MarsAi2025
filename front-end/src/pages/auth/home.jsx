import bgImg from "../../assets/accueilbg.png";
import logo from "/src/assets/icon-stars.png";
import { useTranslation } from "react-i18next";

const Home = () => {
const { t } = useTranslation("home");

return (
<div className="font-sans">

{/* HERO SECTION */}
<section className="relative min-h-screen w-full flex flex-col text-white">
{/* Background */}
<div
className="absolute inset-0 bg-cover bg-center bg-no-repeat"
style={{ backgroundImage: `url(${bgImg})` }}
>
<div className="absolute inset-0 bg-black/30"></div>
</div>

{/* Content */}
<div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
<div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full mb-8 shadow-sm">
<img src="custumer.png" alt="Logo" className="h-3 w-auto object-contain" />
<span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black">
{t("subtitle")}
</span>
</div>
<div>
<h1 className="text-[42px] md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
{t("title_1")} <br />
<span className="text-red-500">{t("title_2")}</span> <br />
{t("title_3")}
</h1>
</div>

<p className="text-sm md:text-base max-w-[400px] leading-relaxed mb-10 font-light">
{t("desc_1")} <br />
{t("desc_2")}
</p>

<div className="flex flex-col gap-4 w-full max-w-[340px]">
<button className="bg-[#1F66B1] py-4 px-8 rounded-full font-bold text-sm flex items-center justify-center">
{t("btn_participate")}
</button>

<button className="w-fit self-center bg-white text-black py-4 px-8 rounded-full font-bold text-xs shadow-lg">
{t("btn_learn_more")}
</button>
</div>
</div>
</section>

{/* SECOND SECTION */}
<section className="bg-[#EFEFEF] py-20 px-6 text-black w-[90]">
<div className=" w-[90%] mx-auto md:pl-20">
<h2 className="font-bold text-5xl mb-6">
LE PROJET MARS A.I.
</h2>

<p className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
Un événement hybride unique en France, réunissant la fine fleur de
l'IA générative et de la création cinématographique.
</p>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
<img src="projection.png" alt="projection" className="h-10 w-10 mx-auto mb-4" />
<h2 className="text-2xl font-bold mb-4">1 MINUTE</h2>
<p>FORMAT ULTRA-COURT POUR MAXIMISER L'IMPACT CREATIF.</p>
</div>

<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
<img src="livre.png" alt="livre" className="h-10 w-10 mx-auto mb-4" />
<h2 className="text-2xl font-bold mb-4">GRATUITE</h2>
<p>CONFERENCES ET WORKSHOPS ACCESSIBLES A TOUS.</p>
</div>

<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
<img src="homme.png" alt="homme" className="h-10 w-10 mx-auto mb-4" />
<h2 className="text-2xl font-bold mb-4">POUR TOUS</h2>
<p>PROFESSIONNELS, ETUDIANTS ET CURIEUX.</p>
</div>

<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
<img src="brain.png" alt="brain" className="h-10 w-10 mx-auto mb-4" />
<h2 className="text-2xl font-bold mb-4">EXPERTISE</h2>
<p>RENCONTREZ LES LEADERS MONDIAUX DE L'IA.</p>
</div>
</div>
</div>
</section>

<section className="bg-white py-20 px-6 text-black ">
<div className="flex items-center gap-3 w-[80%] mx-auto mb-15">
<img src="app.png" alt="app" className="w-10 h-10" />
<p className="text-orange-600 font-semibold">
APERCU SELECTION
</p>
</div>
<div>
<h2 className="text-black text-5xl font-bold w-[80%] mx-auto ">FILMS EN</h2>
<h2 className="text-[#246BAD] font-bold text-5xl mb-10 w-[80%] mx-auto ">COMPETITION</h2>
<p className="text-xl mb-15 w-[80%] mx-auto "> Découvrez une sélection d'œuvres pionnières qui explorent les nouvelles frontières de l'imaginaire assisté par l'Intelligence Artificielle. </p>
</div>

<div className="w-[80%] mx-auto mb-20 px-4">
<div className="grid grid-cols-3 gap-8">
<img src="Variant2.png" alt="variant" className="w-full" />
<img src="Variant2.png" alt="variant" className="w-full" />
<img src="Variant2.png" alt="variant" className="w-full" />
</div>
</div>
<h2 className="text-[#246BAD] font-bold text-2xl gap-15 w-[80%] mx-auto "> VOIR TOUTE LA SELECTION </h2>
</section>

<section className="bg-[#282828] py-32 px-12">
<div className="w-[80%] mx-auto mb-20 ">
<p className="text-white text-4xl md:text-6xl font-bold ">
OBJECTIFS DU
</p>
<p className="text-[#FF5845] text-4xl md:text-6xl font-bold">
FESTIVAL
</p>
</div>

<div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
<div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
<img src="cible.png" alt="cible" className="w-14 h-14 mb-8" />
<h3 className="text-3xl font-bold leading-tight">
L'HUMAIN <br /> AU CENTRE
</h3>
<p className="mt-6 text-lg leading-relaxed text-gray-200">
Mettre l'humain au cœur de la création d'œuvres générées par IA
pour ne pas perdre l'émotion.
</p>
</div>

<div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
<img src="eclair.png" alt="eclair" className="w-14 h-14 mb-8" />
<h3 className="text-3xl font-bold leading-tight">
CHALLENGE <br /> CREATIF
</h3>
<p className="mt-6 text-lg leading-relaxed text-gray-200">
Challenger la créativité des participants grâce à un format
très court de 60 secondes.
</p>
</div>

<div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
<img src="fusee.png" alt="fusee" className="w-14 h-14 mb-8" />
<h3 className="text-3xl font-bold leading-tight">
FUTURS <br /> SOUHAITABLES
</h3>
<p className="mt-6 text-lg leading-relaxed text-gray-200">
Mettre à profit la puissance de l'IA pour illustrer un thème :
Imaginez des futurs souhaitables.
</p>
</div>

</div>

</section>

<section className="bg-[#EFEFEF] py-20 px-6 text-black ">
<div className="w-[80%] mx-auto">
<h2 className="font-bold text-5xl mb-6">
LE FORMAT DE LA SELECTION
</h2>

<p className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
Le parcours des oeuvres
</p>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
<div className="rounded-2xl bg-white p-6 text-center shadow-sm">
<h2 className="text-3xl font-bold mb-4 text-[#246BAD]">2 MOIS</h2>
<p className="text-[#FF5845] font-bold mb-4">APPEL A PROJET</p>
<p> Candidatures ouvertes aux créateurs du monde entier.</p>
</div>

<div className="rounded-3xl bg-white p-6 text-center shadow-sm">
<h2 className="text-2xl font-bold mb-4 text-[#246BAD]">50 FILMS</h2>
<p className="text-[#FF5845] font-bold mb-4" >SELECTION OFFICIELLE</p>
<p>Courts-métrages d'une minute retenus pour la compétition. </p>
</div>

<div className="rounded-3xl bg-white p-6 text-center shadow-sm">
<h2 className="text-2xl font-bold mb-4 text-[#246BAD]">WEB & RS</h2>
<p className="text-[#FF5845] font-bold mb-4">DIFFUSION DIGITALE</p>
<p>Visibilité mondiale via les réseaux et plateformes. </p>
</div>

<div className="rounded-3xl bg-white p-6 text-center shadow-sm">
<h2 className="text-2xl font-bold mb-4 text-[#246BAD]">FESTIVAL</h2>
<p className="text-[#FF5845] font-bold mb-4">SALLES DE CINEMA</p>
<p>Projection sur grand écran pour une immersion totale.</p>
</div>
<button className="mt-4 bg-[#246BAD] text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition">
PARTICIPER MAINTENANT
</button>
</div>
</div>
</section>


<section className="bg-[#FFFFFF] py-20 px-6 text-black">
<div className="w-[80%] mx-auto"> 
<img src="ctr.png" alt="ctr" className="mb-10"/>
<h2 className="text-5xl font-bold text-black">DEUX JOURNEES DE </h2> 
<div className="flex">
<h2 className="text-[#246BAD] text-5xl font-bold">CONFERENCES</h2>
<h2 className="text-black text-5xl font-bold ml-3 mb-10">GRATUITES</h2>
</div>
<p className="text-xl mb-10">1 Débats engagés sur l'éthique et le futur</p>
<p className="text-xl mb-10">2 Confrontations d'idées entre artistes et tech</p>
<p className="text-xl mb-10">3 Interrogations stimulantes sur la création</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
<div className="rounded-2xl bg-[#0E172A] p-8">
<img src="projection.png" alt="projection" className="h-10 w-10 mb-6" />
<h2 className="text-white font-bold text-3xl mb-4">
PROJECTIONS
</h2>
<p className="text-white">
Films en compétition et hors-compétition sur écran géant.
</p>
</div>

<div className="rounded-2xl bg-[#D5DAE1] p-8">
<img src="image7.png" alt="img7" className="h-10 w-10 mb-6" />
<h2 className="text-black font-bold text-3xl mb-4">
WORKSHOP
</h2>
<p className="text-black">
Scénario, création et post-prod avec des experts de l'IA.
</p>
</div>
</div>

<div className="rounded-2xl bg-[#D5DAE1] p-8 w-full">
<img src="award.svg" alt="award" className="h-10 w-10 mb-6" />
<h2 className="text-black font-bold text-3xl mb-4">
REMISE DES PRIX
</h2>
<p className="text-black">
Cinéastes, acteurs et créateurs renommés pour récompenser l'excellence.
</p>
</div>

</div>
</section>

<section className="bg-[#FFFFFF] py-20 text-black">
<div className="w-[80%] mx-auto relative flex"> 

<img src="frame8.png" alt="frame8" className="rounded-2xl w-full" />

<div className="absolute top-6 left-6 text-white">
<img src="CTA.png" alt="cta" className="mt-10 ml-10"/>
<p className="text-8xl font-bold mt-10 ml-10">
MARS.A.I <br />NIGHT
</p>
<p className="font-bold text-xl mt-10 ml-10 mb-10">
Fête Électro mêlant IA et futurs souhaitables. Une expérience immersive sonore et visuelle.
</p>
<div className="relative w-[350px] h-[250px] ml-40 mt-40">
<div className="rounded-2xl bg-white p-8 absolute right-6 top-6 w-[420px] 
flex flex-col items-center justify-center text-center gap-4">

<img src="/rdv.png" alt="rdv" className="w-20" />

<h2 className="text-black font-bold text-3xl">
13 JUIN
</h2>

<p className="text-orange-600 text-xl font-bold">
A PARTIR DE 19H
</p>

<button className="mt-2 bg-[#246BAD] text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition">
Prendre mon pass
</button>

</div>

</div>

</div>

</div>
</section>

<section>
<div className="bg-[#F2F3F5] py-20">
<div className=" ml-50 gap-4">
<img src="Visit.png" alt="visit" className="h-10"/>
<p className="text-[#246BAD] font-bold text-xl mb-10">LE LIEU</p> 
<div>
<p className="text-[#282828] text-5xl font-bold">LA </p>
<p className="text-[#94A3B8] text-5xl font-bold mb-8"> PLATEFORME </p>
<p className="text-[#282828] flex text-xl mb-15"> 4 000 m² d'espaces modulables dans le centre de Marseille, au cœur de l'écosystème numérique.</p>
<p className="text-xl text-[#94A3B8] font-bold ">(ex Docks des Suds) </p>
</div>

<div className="flex gap-40 py-20 ">
<div className="rounded-2xl bg-[#FFFFFF] p-8 w-170">
<h2 className="text-[#246BAD] font-bold text-3xl mb-4">
SALLE DES SUCRES
</h2>
<p className="text-black">
Futur sanctuaire des conférences et de la remise des prix de Mars.A.I. Un espace majestueux alliant patrimoine et technologie.
</p>
</div>

<div className="rounded-2xl bg-[#FFFFFF] p-8 w-170 ">
<h2 className="text-orange-600 font-bold text-3xl mb-4">
SALLE PLAZZA
</h2>
<p className="text-black">
L'épicerie du festival : accueil, animations, workshops et restauration. Le point de rencontre de tous les participants.
</p>
</div>
</div>
<div className="relative w-[90%]">
<img
src="ciel.png"
alt="ciel"
className="w-full rounded-2xl"
/>

<div className="absolute bottom-6 left-6 text-white">
<p className="text-xl mb-10">
MARSEILLE, FRANCE
</p>
<p className="font-bold text-3xl mb-15">
CENTRE EVENEMENTIEL LA PLATEFORME
</p>
</div>
</div>
<div className="grid grid-cols-3 gap-10 h-60 mt-20 w-[90%] ">
<div className="rounded-2xl bg-white p-8">
<h2 className="text-black font-bold text-3xl mb-4 ">
CHIFFRES
</h2>
<p className="text-orange-600 font-bold text-3xl">
PROJETES
</p>
<p className="text-black">Basé sur l'expertise <br /> du Mobile Film festival <br />et le rayonnement <br />de la Plateforme</p>
</div>

<div className="rounded-2xl bg-white p-8">
<img src="image1.png" alt="im1" className="h-10 w-10 mb-6" />
<h2 className="text-black font-bold text-3xl mb-4">
+ 120
</h2>
<p className="text-black">
PAYS REPRESENTES
</p>
</div>

<div className="rounded-2xl bg-white p-8">
<img src="image2.png" alt="img2" className="h-10 w-10 mb-6" />
<h2 className="text-black font-bold text-3xl mb-4">
+ 600
</h2>
<p className="text-black">
FILMS SOUMIS
</p>
</div>
</div>

</div>
</div>

</section>


<section>
<div className="bg-[#EFEFEF] py-20 ">
<p className="text-[#246BAD] font-bold text-center mb-10 text-xl">NOS PARTENAIRES</p>
<div className="flex gap-6 px-150">
<h2 className="text-black font-bold text-5xl">ILS SOUTIENNENT</h2>
<h2 className="text-[#FF5845] font-bold text-5xl mb-20">LE FUTUR</h2>
</div>

<div className="grid grid-cols-1 lg:grid-cols-4 ml-50 gap-8">
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="topito.png" alt="topito" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="biogua.png" alt="biogua" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="dotsub.png" alt="dotsub" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="bioaddict.png" alt="bioaddict" />
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-4 ml-50 gap-8 mt-8">
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="senscritique.png" alt="sens" /> 
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="cnc.png" alt="cnc" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="sacd.png" alt="sacd" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="unric.png" alt="unric" />
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-4 ml-50 gap-8 mt-8">
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="action.png" alt="action" /> 
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="gybn.png" alt="gybn" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="psl.png" alt="psl" />
</div>
<div className="rounded-2xl bg-white p-8 w-70 flex items-center justify-center h-full"> 
<img src="undp.png" alt="undp" />
</div>
</div>


</div>

</section>

</div>
);
};

export default Home;
