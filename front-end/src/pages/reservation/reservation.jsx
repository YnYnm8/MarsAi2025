import React from 'react';

function Reservation() {
  return (
    <div className="bg-[#EFF0F4] min-h-screen p-4 md:p-10">
      
      {/* Contenedor centrado con ancho máximo */}
      <div className="max-w-4xl mx-auto">
        
        {/* Botón superior de volver */}
        <h2 className="text-[#246BAD] font-bold text-lg mb-6 uppercase cursor-pointer hover:underline">
          ← MODIFIER MON CHOIX
        </h2>

        <div className="flex flex-col gap-8">
          
          {/* BLOQUE 1: FORMULARIO */}
          <div className="w-full">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-200">
              <h1 className="text-[#282828] font-bold text-2xl md:text-3xl mb-8 text-center uppercase">
                RÉSERVER MA PLACE
              </h1>

              <form className="space-y-5">
                {/* Filas de Inputs con Borde Negro y Letra más chica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[11px] text-gray-700 ml-1">NOM *</label>
                    <input 
                      type="text" 
                      placeholder="NOM" 
                      className="bg-white border border-black p-3 text-gray-600 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-[#246BAD] transition-all" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[11px] text-gray-700 ml-1">PRÉNOM *</label>
                    <input 
                      type="text" 
                      placeholder="PRÉNOM" 
                      className="bg-white border border-black p-3 text-gray-600 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-[#246BAD] transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[11px] text-gray-700 ml-1">ADRESSE EMAIL *</label>
                    <input 
                      type="email" 
                      placeholder="EMAIL@EXEMPLE.COM" 
                      className="bg-white border border-black p-3 text-gray-600 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-[#246BAD] transition-all" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[11px] text-gray-700 ml-1">PROFESSION *</label>
                    <input 
                      type="text" 
                      placeholder="PROFESSION / SPÉCIALITÉ" 
                      className="bg-white border border-black p-3 rounded-xl w-full text-gray-600 text-sm outline-none focus:ring-2 focus:ring-[#246BAD] transition-all" 
                    />
                  </div>
                </div>

                {/* Checkbox centrado un poco más */}
                <div className="flex items-center gap-3 py-2 px-1">
                  <input type="checkbox" className="w-5 h-5 accent-[#246BAD] cursor-pointer" required />
                  <p className="text-gray-500 text-[12px] leading-tight">
                    J'accepte les conditions générales de participation et le règlement de protection des données.
                  </p>
                </div>

                <button className="w-full cursor-pointer bg-[#282828] text-white font-bold py-4 rounded-xl text-lg hover:bg-black transition-all shadow-md uppercase tracking-wide">
                  VALIDER MON INSCRIPTION
                </button>
              </form>
            </div>
          </div>

          {/* BLOQUE 2: EVENTO SELECCIONADO */}
          <div className="w-full">
            <div className="bg-[#246BAD] p-6 md:p-8 rounded-2xl text-white shadow-lg">
              <p className="text-[10px] opacity-80 mb-1 uppercase tracking-widest text-center md:text-left">Événement sélectionné</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center md:text-left">
                GÉNÉRATION VIDÉO : LES BASES
              </h3>

              {/* Info grid compacta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    <img src="clock.svg" alt="clock" className="w-5 h-5 brightness-0 invert" />
                  </div>
                  <div>
                    <p className="text-[10px] opacity-70 uppercase">Horaire</p>
                    <p className="font-bold text-sm">14H30 - 13 JUIN</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    <img src="local.jpg" alt="local" className="w-5 h-5 rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] opacity-70 uppercase">Lieu</p>
                    <p className="font-bold text-sm">STUDIO 1 - LA PLATEFORME_</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-xl">
                    <img src="yo.png" alt="yo" className="w-5 h-5 rounded-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] opacity-70 uppercase">Coach Expert</p>
                    <p className="font-bold text-sm">THOMAS AUBERT</p>
                  </div>
                </div>
              </div>

              {/* Cuadro de Certificado */}
              <div className="mt-8 bg-[#B0D2FF] p-5 rounded-2xl text-[#282828] flex items-start gap-4 border border-black/10">
                <img src="male.png" alt="male" className="w-8 h-8 opacity-80" />
                <div>
                  <p className="font-bold text-[12px] mb-1 uppercase italic">Certificat de propriété</p>
                  <p className="text-[10px] leading-snug opacity-90 uppercase">
                    En soumettant ce dossier, vous certifiez sur l'honneur être l'auteur original de l'oeuvre et détenir l'intégralité des droits de diffusion.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button className="bg-white cursor-pointer text-[#246BAD] hover:bg-gray-100 font-bold py-3 px-10 rounded-xl transition-all uppercase text-sm shadow-md">
                  Finaliser ma soumission
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Reservation;