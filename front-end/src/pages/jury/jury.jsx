
function Jury() {
  return (
    <div className="bg-[#282828] min-h-screen px-12 py-8">


      <h1 className="text-[#FF5845] mb-6 font-bold">LES MEMBRES DU JURY</h1>
      <h2 className="text-white text-4xl font-bold">UN JURY </h2>
      <h2 className="text-white text-4xl font-bold"> D'EXCEPTION</h2>
      <h2 className="text-blue-500 font-bold text-4xl mb-12">
        POUR LE FUTUR
      </h2>


      <div className="flex justify-center mb-12">
        <div className="relative w-[800px] h-[1400px] w-full rounded-2xl overflow-hidden">
          <img
            src="julien.jpg"
            alt="julien jury"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6">
            <p className="text-[#FF5845] font-bold text-3xl mb-10">
              PRESIDENT DU JURY
            </p>
            <p className="text-white font-bold text-5xl mb-20">
              JULIEN VALROS
            </p>
          </div>
        </div>
      </div>


      <div className="bg-[#333333] p-8 rounded-2xl mb-12 flex flex-col items-center text-center">
        <img src="ard.png" alt="ard" className="mb-6 w-16" />

        <p className="text-white max-w-3xl">
          "Nous ne jugeons pas seulement des films, mais des visions d'avenirs souhaitables créées avec des outils qui nous dépassent encore. C'est le début d'une nouvelle ère."
        </p>

        <p className="text-blue-300 mt-4">
          Réalisateur marseillais multiprimé, Julien Valros apporte son regard sans concession sur la narration et l'émotion cinématographique
        </p>
      </div>


      <div className="flex mb-20">
        <button className="bg-[#FF5845] hover:bg-[#e04b3b] text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-lg">
          VOIR SA FILMOGRAPHIE
        </button>
      </div>


      <div className="bg-white py-16 px-12 rounded-t-3xl">

        <div className="mb-16">
          <p className="text-black font-bold text-5xl">
            LES MEMBRES
          </p>
          <p className="text-blue-500 font-bold text-5xl mt-4">
            DU JURY
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">


          <div className="relative">
            <img
              src="aiko.jpg"
              alt="aiko"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">CHERCHEUSE IA / OPEN AI</p>
              <p className="text-white font-bold text-4xl">AIKO SATO</p>
              <p className="text-white">
                Experte en modèles de diffusion, elle analyse la prouesse technique des prompts.
              </p>
            </div>
          </div>


          <div className="relative">
            <img
              src="julie.jpg"
              alt="julie"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">PRODUCTRICE</p>
              <p className="text-white font-bold text-4xl">JULIE MASSON</p>
              <p className="text-white">
                Fondatrice de "Future Pictures", elle cherche les nouveaux talents de l'image de demain.
              </p>
            </div>
          </div>


          <div className="relative">
            <img
              src="marc.jpg"
              alt="marc"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">DIRECTEUR DE LA PHOTO</p>
              <p className="text-white font-bold text-4xl">MARC AUBIN</p>
              <p className="text-white">
                Spécialiste de la lumière, il veille à la qualité esthétique des créations augmentées.
              </p>
            </div>
          </div>


          <div className="relative">
            <img
              src="aiko.jpg"
              alt="aiko"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">CHERCHEUSE IA / OPEN AI</p>
              <p className="text-white font-bold text-4xl">AIKO SATO</p>
              <p className="text-white">
                Experte en modèles de diffusion, elle analyse la prouesse technique des prompts.
              </p>
            </div>
          </div>


          <div className="relative">
            <img
              src="julie.jpg"
              alt="julie"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">PRODUCTRICE</p>
              <p className="text-white font-bold text-4xl">JULIE MASSON</p>
              <p className="text-white">
                Fondatrice de "Future Pictures", elle cherche les nouveaux talents de l'image de demain.
              </p>
            </div>
          </div>


          <div className="relative">
            <img
              src="marc.jpg"
              alt="marc"
              className="w-full h-[600px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
              <p className="text-[#FF5845] font-bold">DIRECTEUR DE LA PHOTO</p>
              <p className="text-white font-bold text-4xl">MARC AUBIN</p>
              <p className="text-white">
                Spécialiste de la lumière, il veille à la qualité esthétique des créations augmentées.
              </p>
            </div>
          </div>

        </div>



        <div className="bg-[#282828] p-10 rounded-2xl mt-20">
          <p className="text-white font-bold text-4xl">
            LA CHARTE
          </p>
          <p className="text-[#FF5845] font-bold text-4xl">
            DE NOTATION
          </p>

          <p className="text-[#64748B] text-xl mt-8 max-w-3xl">
            Le jury s'engage à évaluer chaque court-métrage selon quatre piliers fondamentaux pour garantir l'équité entre les participants.
          </p>


          <div className="flex flex-col gap-10 p-6 rounded-2xl">

  
  <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
    <img src="1.png" alt="1" className="w-20 h-20 object-contain" />
    
    <div>
      <p className="text-white font-bold text-2xl">
        ORIGINALITE IA
      </p>
      <p className="text-[#D5DAE1]">
        La pertinence et l'audace de l'usage des outils génératifs.
      </p>
    </div>
  </div>

  
  <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
    <img src="2.png" alt="2" className="w-20 h-20 object-contain" />
    
    <div>
      <p className="text-white font-bold text-2xl">
        ESTHETIQUE VISUELLE
      </p>
      <p className="text-[#D5DAE1]">
        La cohérence et la beauté du rendu global.
      </p>
    </div>
  </div>

  
  <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
    <img src="3.png" alt="3" className="w-20 h-20 object-contain" />
    
    <div>
      <p className="text-white font-bold text-2xl">
        QUALITE NARRATIVE
      </p>
      <p className="text-[#D5DAE1]">
        La force de l'histoire racontée en seulement 60 secondes.
      </p>
    </div>
  </div>

  
  <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
    <img src="4.png" alt="4" className="w-20 h-20 object-contain" />
    
    <div>
      <p className="text-white font-bold text-2xl">
        EMOTION ET IMPACT
      </p>
      <p className="text-[#D5DAE1]">
        La capacité du film à toucher le spectateur.
      </p>
    </div>
  </div>

</div>

        </div>


      </div>
    </div>
  );
}

export default Jury;
