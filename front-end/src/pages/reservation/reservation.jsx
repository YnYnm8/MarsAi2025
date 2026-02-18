function Reservation() {
  return (
    <div className="bg-[#EFF0F4] mx-15">
      
      <h2 className="text-[#246BAD] font-bold text-3xl mb-10 mt-10">
        MODIFIER MON CHOIX
      </h2>

      <div className="bg-white p-10 rounded-2xl">

        <h1 className="text-[#282828] font-bold text-4xl mb-10">
          RESERVER MA PLACE
        </h1>

        <div className="flex gap-10 mb-10">
          <div>
            <p>NOM</p>
            <div className="bg-gray-100 p-5 rounded-2xl w-280">
              <h2 className="text-xl">NOM*</h2>
            </div>
          </div>

          <div>
            <p>PRENOM</p>
            <div className="bg-gray-100 p-5 rounded-2xl w-280">
              <h2 className="text-xl">PRENOM*</h2>
            </div>
          </div>
        </div>

        <div className="flex gap-10 mb-10">
            <div>
            <p>ADRESSE EMAIL</p>
          <div className="bg-gray-100 p-5 rounded-2xl w-280">
            <p className="text-xl">EMAIL@EXEMPLE.COM</p>
          </div>
          </div>
          <div>
<p>PROFESSION</p>
          <div className="bg-gray-100 p-5 rounded-2xl w-280">
            <p className="text-xl">PROFESSION/SPECIALITE</p>
          </div>
          </div>
        </div>


<input type="checkbox" class="checkbox validator" required title="Required" />
<p class="validator-hint text-[#64748B] text-2xl">J'accepte les conditions générales de participation et le règlement de protection des données.</p>

     
        <button className="btn btn-neutral w-full h-15 mt-10 text-2xl rounded-2xl">
          VALIDER MON INSCRIPTION
        </button>

        
        </div>

        <div className="flex gap-10 mt-10">
          <div className="bg-[#246BAD] p-10 rounded-2xl w-full h-120">
            <p className="text-white mb-10">EVENEMENT SELECTIONNE</p>
            <p className="text-5xl font-bold text-white">GENERATION VIDEO : LES BASES</p>
            
            <img src="clock.png" alt="clock" className="w-15 h-15 object-contain" />
    <div>
      <p className="text-white text-2xl">
        HORAIRE
      </p>
      <p className="text-white text-3xl font-bold">
       14H30-13 JUIN 
      </p>
    </div>

   <img src="local.jpg" alt="local" className="w-15 h-15 object-contain" />
    <div>
      <p className="text-white text-2xl">
        LIEU
      </p>
      <p className="text-white text-3xl font-bold">
       STUDIO 1- LA PLATEFORME_ 
      </p>
    </div>
          </div>

      </div>
    </div>
  );
}

export default Reservation;
