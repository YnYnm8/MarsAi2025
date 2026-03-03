import bgImg from "../../assets/accueilbg.png";
import logo from "/src/assets/icon-stars.png";
import { useTranslation } from "react-i18next";


const Home = () => {
    const { t } = useTranslation("home");



    return (
        <div className="font-sans">
<section>
  <div className="relative inline-block">
    <img src="affiche.jpeg" alt="affiche" />


    <div className="absolute top-6 left-6">
      <h1 className="text-white text-9xl font-extrabold tracking-wide">
        MARS A.I
      </h1>
    </div>

  
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-white text-8xl font-semibold text-center max-w-2xl">
       {t("imagine")}
      </h2>
    </div>

    
    <div
      className="absolute left-1/2 top-[75%] -translate-x-1/2 -translate-y-1/2 
                 flex gap-6">
      
      <button
        className="bg-[#246BAD] hover:bg-[#e04b3b] text-white font-bold 
                   py-3 px-6 rounded-xl transition duration-300 shadow-lg 
                   w-[300px] text-center">
        {t("participe")}
      </button>

      <button
        className="bg-white hover:bg-[#246BAD] text-black font-bold 
                   py-3 px-6 rounded-xl transition duration-300 shadow-lg 
                   w-[300px] text-center">
        {t("know")}
      </button>

    </div>
  </div>
</section>
            {/* SECOND SECTION */}
            <section className="bg-[#EFEFEF] py-20 px-6 text-black w-[90]">
                <div className=" w-[90%] mx-auto md:pl-20">
                    <h2 className="font-bold text-5xl mb-6">
                        {t("project_title")}
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
                        {t("sub_mars")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                            <img src="../projection.png" alt="projection" className="h-10 w-10 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4">{t("time")}</h2>
                            <p>{t("format")}</p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                            <img src="livre.png" alt="livre" className="h-10 w-10 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4">{t("free")}</h2>
                            <p>{t("conf")} </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                            <img src="homme.png" alt="homme" className="h-10 w-10 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4"> {t("for_all")} </h2>
                            <p>{t("public")} </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                            <img src="brain.png" alt="brain" className="h-10 w-10 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4"> {t("expert")} </h2>
                            <p>{t("meet")} </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 px-6 text-black ">
                <div className="flex items-center gap-3 w-[80%] mx-auto mb-15">
                    <img src="app.png" alt="app" className="w-10 h-10" />
                    <p className="text-orange-600 font-semibold">
                        {t("view")}
                    </p>
                </div>
                <div>
                    <h2 className="text-black text-5xl font-bold w-[80%] mx-auto ">{t("movies")}</h2>
                    <h2 className="text-[#246BAD] font-bold text-5xl mb-10 w-[80%] mx-auto ">{t("run")}</h2>
                    <p className="text-xl mb-15 w-[80%] mx-auto "> {t("oeuvres")} </p>
                </div>

                <div className="w-[80%] mx-auto mb-20 px-4">
                    <div className="grid grid-cols-3 gap-8">
                        <img src="Variant2.png" alt="variant" className="w-full" />
                        <img src="Variant2.png" alt="variant" className="w-full" />
                        <img src="Variant2.png" alt="variant" className="w-full" />
                    </div>
                </div>
                <h2 className="text-[#246BAD] font-bold text-2xl gap-15 w-[80%] mx-auto "> {t("view_all")} </h2>
            </section>

            <section className="bg-[#282828] py-32 px-12">
                <div className="w-[80%] mx-auto mb-20 ">
                    <p className="text-white text-4xl md:text-6xl font-bold ">
                        {t("obj")}
                    </p>
                    <p className="text-[#FF5845] text-4xl md:text-6xl font-bold">
                        {t("fest")}
                    </p>
                </div>

                <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
                        <img src="cible.png" alt="cible" className="w-14 h-14 mb-8" />
                        <h3 className="text-3xl font-bold leading-tight">
                            {t("body")} <br /> {t("middle")}
                        </h3>
                        <p className="mt-6 text-lg leading-relaxed text-gray-200">
                            {t("creation")}
                        </p>
                    </div>

                    <div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
                        <img src="eclair.png" alt="eclair" className="w-14 h-14 mb-8" />
                        <h3 className="text-3xl font-bold leading-tight">
                            {t("challenge")} <br /> {t("create")}
                        </h3>
                        <p className="mt-6 text-lg leading-relaxed text-gray-200">
                            {t("desc_chall")}
                        </p>
                    </div>

                    <div className="bg-[#626262] rounded-3xl p-12 text-white flex flex-col">
                        <img src="fusee.png" alt="fusee" className="w-14 h-14 mb-8" />
                        <h3 className="text-3xl font-bold leading-tight">
                            {t("futur")} <br />{t("souhait")}
                        </h3>
                        <p className="mt-6 text-lg leading-relaxed text-gray-200">
                            {t("profit")}
                        </p>
                    </div>

                </div>

            </section>

            <section className="bg-[#EFEFEF] py-20 px-6 text-black ">
                <div className="w-[80%] mx-auto">
                    <h2 className="font-bold text-5xl mb-6">
                        {t("select")}
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
                        {t("vre")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
                            <h2 className="text-3xl font-bold mb-4 text-[#246BAD]">{t("month")} </h2>
                            <p className="text-[#FF5845] font-bold mb-4"> {t("call")}</p>
                            <p>{t("open")} </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                            <h2 className="text-2xl font-bold mb-4 text-[#246BAD]"> {t("fifty")} </h2>
                            <p className="text-[#FF5845] font-bold mb-4" > {t("official")}</p>
                            <p> {t("cm")} </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                            <h2 className="text-2xl font-bold mb-4 text-[#246BAD]">{t("rs")} </h2>
                            <p className="text-[#FF5845] font-bold mb-4">{t("digital")}  </p>
                            <p> {t("world")} </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
                            <h2 className="text-2xl font-bold mb-4 text-[#246BAD]">{t("val")} </h2>
                            <p className="text-[#FF5845] font-bold mb-4"> {t("cinema")}</p>
                            <p>{t("projection")} </p>
                        </div>
                        <button className="mt-4 bg-[#246BAD] text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition">
                            {t("now")}
                        </button>
                    </div>
                </div>
            </section>


            <section className="bg-[#FFFFFF] py-20 px-6 text-black">
                <div className="w-[80%] mx-auto">
                    <img src="ctr.png" alt="ctr" className="mb-10" />
                    <h2 className="text-5xl font-bold text-black"> {t("days")} </h2>
                    <div className="flex">
                        <h2 className="text-[#246BAD] text-5xl font-bold">{t("cong")}</h2>
                        <h2 className="text-black text-5xl font-bold ml-3 mb-10"> {t("fre")}</h2>
                    </div>
                    <p className="text-xl mb-10"> {t("etic")} </p>
                    <p className="text-xl mb-10">{t("tech")}</p>
                    <p className="text-xl mb-10">{t("question")} </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <div className="rounded-2xl bg-[#0E172A] p-8">
                            <img src="../projection.png" alt="projection" className="h-10 w-10 mb-6" />
                            <h2 className="text-white font-bold text-3xl mb-4">
                                {t("pro")}
                            </h2>
                            <p className="text-white">
                                {t("screen")}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#D5DAE1] p-8">
                            <img src="/image7.png" alt="img7" className="h-10 w-10 mb-6" />
                            <h2 className="text-black font-bold text-3xl mb-4">
                                {t("work")}
                            </h2>
                            <p className="text-black">
                                {t("prod")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#D5DAE1] p-8 w-full">
                        <img src="award.svg" alt="award" className="h-10 w-10 mb-6" />
                        <h2 className="text-black font-bold text-3xl mb-4">
                            {t("price")}
                        </h2>
                        <p className="text-black">
                            {t("actor")}
                        </p>
                    </div>

                </div>
            </section>

          <section className="relative text-white">

 
  <img 
    src="frame8.png" 
    alt="frame8" 
    className="w-full h-screen object-cover"
  />

 
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16">

    <img src="CTA.png" alt="cta" className="mb-8" />

    <p className="text-7xl md:text-8xl font-bold mb-6">
      {t("mars")} <br /> {t("day")}
    </p>

    <p className="font-bold text-xl mb-12">
      {t("electro")}
    </p>

    
    <div className="rounded-2xl bg-white p-8 w-full max-w-[420px] 
                    flex flex-col items-center justify-center text-center gap-4 shadow-2xl">

      <img src="/rdv.png" alt="rdv" className="w-20" />

      <h2 className="text-black font-bold text-3xl">
        {t("date")}
      </h2>

      <p className="text-orange-600 text-xl font-bold">
        {t("hour")}
      </p>

      <button className="mt-2 bg-[#246BAD] text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition">
        {t("pass")}
      </button>

    </div>

  </div>

</section>

            <section>
                <div className="bg-[#F2F3F5] py-20">
                    <div className=" ml-50 gap-4">
                        <img src="Visit.png" alt="visit" className="h-10" />
                        <p className="text-[#246BAD] font-bold text-xl mb-10">{t("place")}</p>
                        <div>
                            <p className="text-[#282828] text-5xl font-bold">{t("the")} </p>
                            <p className="text-[#94A3B8] text-5xl font-bold mb-8"> {t("forme")}</p>
                            <p className="text-[#282828] flex text-xl mb-15"> {t("center")}</p>
                            <p className="text-xl text-[#94A3B8] font-bold ">{t("sud")} </p>
                        </div>

                        <div className="flex gap-40 py-20 ">
                            <div className="rounded-2xl bg-[#FFFFFF] p-8 w-170">
                                <h2 className="text-[#246BAD] font-bold text-3xl mb-4">
                                    {t("sugar")}
                                </h2>
                                <p className="text-black">
                                    {t("techno")}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#FFFFFF] p-8 w-170 ">
                                <h2 className="text-orange-600 font-bold text-3xl mb-4">
                                    {t("plazza")}
                                </h2>
                                <p className="text-black">
                                    {t("point")}
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
                                    {t("france")}
                                </p>
                                <p className="font-bold text-3xl mb-15">
                                    {t("event")}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-10 h-60 mt-20 w-[90%] ">
                            <div className="rounded-2xl bg-white p-8">
                                <h2 className="text-black font-bold text-3xl mb-4 ">
                                    {t("number")}
                                </h2>
                                <p className="text-orange-600 font-bold text-3xl">
                                    {t("proj")}
                                </p>
                                <p className="text-black">{t("base")} <br /> {t("mobil")} <br />{t("rayon")}  <br />{t("del")}</p>
                            </div>

                            <div className="rounded-2xl bg-white p-8">
                                <img src="image1.png" alt="im1" className="h-10 w-10 mb-6" />
                                <h2 className="text-black font-bold text-3xl mb-4">
                                   {t("twenty")}
                                </h2>
                                <p className="text-black">
                                    {t("countries")}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-8">
                                <img src="image2.png" alt="img2" className="h-10 w-10 mb-6" />
                                <h2 className="text-black font-bold text-3xl mb-4">
                                 {t("six")}
                                </h2>
                                <p className="text-black">
                                   {t("submitted")}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
 

<section className="py-20 px-6">
  <div className="w-[90%] mx-auto rounded-2xl overflow-hidden shadow-lg">
    <iframe
      title="Carte de Marseille"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118557.50050519055!2d5.282212955102349!3d43.300107843456026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9bf4344da5333%3A0x40819a5fd970220!2sMarseille!5e0!3m2!1sfr!2sfr!4v1772454343305!5m2!1sfr!2sfr"
      width="100%"
      height="550"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>


                <div className="bg-[#EFEFEF] py-20 ">
                    <p className="text-[#246BAD] font-bold text-center mb-10 text-xl">{t("partners")}</p>
                    <div className="flex gap-6 px-150">
                        <h2 className="text-black font-bold text-5xl">{t("soutien")} </h2>
                        <h2 className="text-[#FF5845] font-bold text-5xl mb-20">{t("futurs")}</h2>
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
