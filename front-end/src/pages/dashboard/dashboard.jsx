function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen px-12 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-gray-500 tracking-wide">
          BACK-OFFICE OFFICIEL
        </h2>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-black">ADMINISTRATEUR</p>
            <p className="text-blue-500 font-semibold text-sm">
              admin@email.com
            </p>
          </div>
          <img
            src="/mec.jpg"
            alt="profil"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="mb-12">
        <h2 className="text-orange-400 font-bold mb-2 tracking-wide">
          ADMIN MANAGEMENT
        </h2>

        <h1 className="text-3xl font-bold text-black mb-4">
          VUE D'ENSEMBLE
        </h1>

        <p className="text-gray-600 max-w-xl">
          Analyse détaillée de la progression du festival et des indicateurs de performance
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 gap-8">
        
        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <img src="/pellicule.png" alt="icon" className="w-8" />
            <p className="text-blue-800 font-semibold text-sm">
              OBJECTIF 600
            </p>
          </div>

          <p className="text-3xl font-bold">482</p>

          <p className="text-gray-500 text-sm">
            FILMS ÉVALUÉS PAR LE COMITE
          </p>

          <div>
            <p className="font-semibold text-sm mb-2">
              80,3% COMPLÉTÉ
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-900 h-2 rounded-full w-[80%]"></div>
            </div>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <img src="/diplome.png" alt="icon" className="w-8" />
            <p className="text-orange-500 font-semibold text-sm">
              QUOTA 100/JURÉ
            </p>
          </div>

          <p className="text-3xl font-bold">08/12</p>

          <p className="text-gray-500 text-sm">
            JURY AYANT FINALISÉ LEUR LOT
          </p>

          <div>
            <p className="font-semibold text-sm mb-2">
              EN COURS DE DÉLIBÉRATION
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-400 h-2 rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <img src="/mapemonde.png" alt="icon" className="w-8" />
            <p className="text-gray-500 text-sm">PAYS REPRÉSENTÉS</p>
          </div>

          <p className="text-3xl font-bold">124</p>

          <p className="font-semibold text-sm">
            TOP ZONE : EUROPE
          </p>
        </div>

        {/* CARD 4 */}
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <img src="/yo.png" alt="icon" className="w-8" />
            <p className="text-blue-400 text-sm">
              TAUX D'OCCUPATION WORKSHOP
            </p>
          </div>

          <p className="text-4xl font-bold">72%</p>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg w-full mt-4">
            VOIR LES ÉLÉMENTS
          </button>

          <ul className="space-y-2 mt-4">
            <li className="flex items-center gap-2">
              <img src="/calendar.svg" alt="calendrier" className="w-6" />
              <span className="text-xs uppercase font-semibold opacity-60">
                12/04 - Evènement n°1 workshop
              </span>
            </li>

            <li className="flex items-center gap-2">
              <img src="/calendar.svg" alt="calendrier" className="w-6" />
              <span className="text-xs uppercase font-semibold opacity-60">
                5/05 - Evènement n°2 workshop
              </span>
            </li>

            <li className="flex items-center gap-2">
              <img src="/calendar.svg" alt="calendrier" className="w-6" />
              <span className="text-xs uppercase font-semibold opacity-60">
                22/05 - Evènement n°3 workshop
              </span>
            </li>
          </ul>
        </div>

        {/* CARD 5 FULL WIDTH */}
        <div className="bg-white p-6 rounded-2xl shadow-sm col-span-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/pellicule.png" alt="icon" className="w-8" />
            <div>
              <p className="text-3xl font-bold">182</p>
              <p className="text-gray-500 text-sm">
                COMPTES REALISATEURS ACTIFS
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-blue-600 text-2xl font-bold">+8</p>
            <p className="text-gray-500 text-sm">AUJOURD'HUI</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
