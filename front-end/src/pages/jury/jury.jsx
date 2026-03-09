import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

function Jury() {
  const { t } = useTranslation("jury");
  const scrollRef = useRef(null);

  const juryMembers = ["aiko", "julie", "marc", "aiko", "julie", "marc", "aiko", "julie"];
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedMember = juryMembers[activeIndex];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#282828] min-h-screen py-10 px-4 md:px-10 lg:px-20">
      
      {/* HEADER */}
      <div className="mb-12">
        <p className="text-[#FF5845] font-bold text-xl uppercase mb-2 tracking-widest">
          {t("header.subtitle")}
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-bold uppercase leading-none">
          {t("header.titlePart1")} <br />
          {t("header.titlePart2")} <br />
          <span className="text-[#246BAD]">{t("header.titleBlue")}</span>
        </h1>
      </div>

      {/* SECCIÓN PRINCIPAL VISOR */}
      <div className="bg-[#333333] rounded-3xl overflow-hidden flex flex-col lg:flex-row mb-12 shadow-2xl border border-white/10">
        <div className="lg:w-1/2 h-[400px] lg:h-[600px] border-b lg:border-b-0 lg:border-r border-white/10">
          <img
            src={`${selectedMember}.jpg`}
            alt={selectedMember}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#333333] to-[#2b2b2b]">
          <p className="text-[#FF5845] font-bold text-2xl uppercase mb-4 tracking-tighter">
             {t(`members_section.list.${selectedMember}.role`)}
          </p>
          <h2 className="text-white text-5xl font-bold uppercase mb-6">
            {t(`members_section.list.${selectedMember}.name`)}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 italic border-l-4 border-[#246BAD] pl-6">
            "{t(`members_section.list.${selectedMember}.bio`)}"
          </p>
          
          <button className="bg-[#FF5845]  cursor-pointer hover:bg-[#e04b3b] text-white font-bold py-4 px-10 rounded-2xl self-start transition-all shadow-lg uppercase hover:-translate-y-1">
            {t("president.cta")}
          </button>
        </div>
      </div>

      {/* --- CARRUSEL CON BORDES Y HOVER MEJORADOS --- */}
      <div className="relative group mb-24">
        
        <button 
          onClick={() => scroll("left")}
          className="absolute left-[-25px] cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-[#FF5845] p-4 rounded-full text-white shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:block border-2 border-white/20"
        >
          ←
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 px-2 scrollbar-hide snap-x no-scrollbar"
        >
          {juryMembers.map((memberKey, index) => (
            <div 
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-none w-36 h-36 md:w-52 md:h-52 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 snap-start border-4 relative group/item
                ${activeIndex === index 
                  ? 'border-[#246BAD] scale-105 shadow-[0_0_20px_rgba(36,107,173,0.5)] opacity-100' 
                  : 'border-white/5 opacity-50 hover:opacity-100 hover:border-[#FF5845] hover:scale-105'
                }
              `}
            >
              <img
                src={`${memberKey}.jpg`}
                alt={memberKey}
                className="w-full h-full object-cover"
              />
              {/* Overlay de nombre rápido al hacer hover en miniatura */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs uppercase">
                Voir profil
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll("right")}
          className="absolute right-[-25px] cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-[#FF5845] p-4 rounded-full text-white shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:block border-2 border-white/20"
        >
          →
        </button>
      </div>

      {/* --- SECCIÓN DE CRITERIOS CON BORDES Y SEPARACIÓN CLARA --- */}
      <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-inner">
        <div className="mb-12">
          <h3 className="text-black font-bold text-4xl uppercase mb-2">
            {t("scoring_chart.titleWhite")}
          </h3>
          <span className="text-[#FF5845] font-bold text-4xl uppercase">{t("scoring_chart.titleRed")}</span>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            {t("scoring_chart.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["originality", "aesthetic", "narrative", "impact"].map((pillar, idx) => (
            <div 
              key={pillar} 
              className="bg-white border-2 border-[#EFF0F4] p-8 rounded-3xl flex items-center gap-8 hover:border-[#246BAD] hover:shadow-xl transition-all duration-300 group/pillar cursor-default"
            >
              <div className="text-5xl font-black text-[#EFF0F4] group-hover/pillar:text-[#246BAD]/20 transition-colors">
                0{idx + 1}
              </div>
              <div>
                <p className="font-bold text-xl uppercase text-[#282828] mb-2">
                  {t(`scoring_chart.pillars.${pillar}.title`)}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`scoring_chart.pillars.${pillar}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jury;