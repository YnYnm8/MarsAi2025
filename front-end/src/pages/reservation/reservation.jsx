
function Reservation() {
  return (

    

  
    <div className="bg-[#EFF0F4] mx-15 ">
      
      <h2 className="text-[#246BAD] font-bold text-3xl mb-10 mt-10">
        MODIFIER MON CHOIX
      </h2>

      <div className="bg-white p-10 rounded-2xl">

        <h1 className="text-[#282828] font-bold text-4xl mb-10">
          RESERVER MA PLACE
        </h1>

        <div className="flex gap-10 mb-10">
          <div>
            <p>NOM *</p>
            <div className="bg-gray-100 p-5 rounded-2xl w-200">
              <h2 className="text-xl text-gray-400">NOM</h2>
            </div>
          </div>

          <div>
            <p>PRENOM *</p>
            <div className="bg-gray-100 p-5 rounded-2xl w-200">
              <h2 className="text-xl text-gray-400">PRENOM</h2>
            </div>
          </div>
        </div>

        <div className="flex gap-10 mb-10">
            <div>
            <p>ADRESSE EMAIL *</p>
          <div className="bg-gray-100 p-5 rounded-2xl w-200">
            <p className="text-xl text-gray-400">EMAIL@EXEMPLE.COM</p>
          </div>
          </div>
          <div>
<p>PROFESSION *</p>
          <div className="bg-gray-100 p-5 rounded-2xl w-200">
            <p className="text-xl text-gray-400">PROFESSION/SPECIALITE</p>
          </div>
          </div>
        </div>


<input type="checkbox" class="checkbox validator" required title="Required" />
<p className="validator-hint text-[#64748B] text-2xl">J'accepte les conditions générales de participation et le règlement de protection des données.</p>

     
        <button className="btn btn-neutral w-full h-15 mt-10 text-2xl rounded-2xl">
          VALIDER MON INSCRIPTION
        </button>

        
        </div>

        <div className="flex gap-10 mt-10 bg-[#EFF0F4] ">
          <div className="bg-[#246BAD] p-10 rounded-2xl w-full h-170">
            <p className="text-white mb-10">EVENEMENT SELECTIONNE</p>
            <p className="text-5xl font-bold text-white">GENERATION VIDEO : LES BASES</p> 
            
            <img src="clock.svg" alt="clock" className="w-15 h-15 object-contain" />
    <div>
      <p className="text-white text-xl">
        HORAIRE
      </p>
      <p className="text-white text-2xl font-bold mb-10">
       14H30-13 JUIN 
      </p>
    </div>

   <img src="local.jpg" alt="local" className="w-15 h-15 object-contain" />
    <div>
      <p className="text-white text-xl">
        LIEU
      </p>
      <p className="text-white text-2xl font-bold mb-10">
       STUDIO 1- LA PLATEFORME_ 
      </p>
    </div>

<img src="yo.png" alt="yo" className="w-15 h-15 object-contain" />
    <div>
      <p className="text-white text-xl">
        COACH EXPERT
      </p>
      <p className="text-white text-2xl font-bold">
       THOMAS AUBERT 
      </p>
    </div>


    <div className="flex gap-10 mt-10 py-40">
          <div className="bg-[#B0D2FF] p-20 rounded-2xl w-full h-70">
            <img src="male.png" alt="male" className="flex"></img>
            <p className="font-bold text-2xl mb-10">CERTIFICAT DE PROPRIETE</p>
            <p className="text-[#626262] text-xl "> EN SOUMETTANT CE DOSSIER, VOUS CERTIFIEZ SUR L'HONNEUR ETRE L'AUTEUR ORIGINAL DE L'OEUVRE ET DETENIR L'INTEGRALITE DES DROITS DE DIFFUSION. VOUS ACCEPTEZ QUE MARS.A.I UTILISE CES ELEMENTS POUR LA PROMOTION DU FESTIVAL.
 </p>
     
          </div>
          
        
          </div>
          <div className=" flex justify-center"> 
      <button className=" btn btn-active bg-[#246BAD] rounded-xl w-80 text-white text-xl h-16 mb-70">Finaliser ma soumission</button>     
</div>
          </div>

      </div>
    </div>
    
  );
}

export default Reservation;
