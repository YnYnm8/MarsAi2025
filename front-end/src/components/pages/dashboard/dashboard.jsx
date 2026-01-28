function Dashboard() {
  return (
    <div className="bg-gray-100 w-full min-h-screen px-8"> 
    

      {/* HEADER */}
      <div className="header justify-between flex gap-2 mb-6">
        <h2 className="dashboard-kicker text-gray-54">BACK-OFFICE OFFICIEL</h2>
        <div className="">
          <p className="dashboard-user font-bold text-black ">ADMINISTRATEUR</p>
          <div className="">
            <p className="text-blue-500 font-bold ">admin@email.com</p>
            <img src="/mec.jpg" alt="mec" className="w-10" />
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className="dashboard-overview mb-8">
        <h2 className="mb-10 dashboard-title text-orange-400 mb-4 font-bold">
          ADMIN MANAGEMENT
        </h2>

        <h1 className="overview-title font-bold text-3xl mb-9 text-black">
          VUE D'ENSEMBLE
        </h1>

        <p className="overview-description">
          Analyse détaillée de la progression du festival et des indicateurs de performance
        </p>
      </div>

      {/* METRICS */}
      <div className="overview-metrics grid grid-cols-2 gap-6">

        <div className="metric1 border p-4 rounded-2xl bg-white">
          <img src="/pellicule.png" alt="pellicule" className="w-10" />
          <p className="text-right text-blue-800 font-bold"> OBJECTIF 600 </p>
          <p className="text-2xl font-bold"> 482 </p>
          <p className="mb-8"> FILMS EVALUES PAR LE JURY</p>
          <img src="/barrebleue.png" alt="barre bleue" />
        </div>


        <div className="metric2 border p-4 rounded-2xl bg-white">
          <img src="/diplome.png" alt="diplome" className="w-10" />
          <p className="text-right text-orange-600 font-bold">
            Quota 100/JURÉ
          </p>
          <p className="text-2xl font-bold">08/12</p>
          <p className="mb-8">  JURES AYANT FINALISE LEUR LOT </p>
          <p className="font-bold"> EN COURS DE DELIBERATION </p>
          <img src="/barreorange.png" alt="barre orange" />
        </div>

        <div className="metric3 border p-4 rounded-2xl bg-white ">
          <img src="/mapemonde.png" alt="map" className="w-10" />
          <p className="text-2xl font-bold">
            124
          </p>
          <p className="mb-8">  PAYS REPRESENTES</p>
          <p className="font-bold">TOP ZONE : EUROPE </p>
        </div>

        <div className="metric4 bg-gray-800 text-white text-lg border border-black p-4 ml-auto  rounded-2xl w-[15cm]">
          <img src="/yo.png" alt="yo" className="w-10" />
          <p className="text-white font-bold text-2xl">72%</p>
          <p className="mb-8 text-blue-400">TAUX D'OCCUPATION WORKSHOP</p>
          <button className="bg-blue-800 text-white px-4 py-2 rounded mt-2 w-full">
            VOIR LES ÉLÉMENTS
          </button>
        </div>

        <div className="metric5 bg-white border border-gray-200 p-6 rounded-2xl col-span-2 w-[29cm] h-[4cm] justify-center">
          <img src="/pellicule.png" alt="pellicule" className="w-10" />
          <p className="font-bold text-2xl">
            182
          </p>
          <p> COMPTES UTILISATEURS ACTIFS</p>
          <div className="justify-content right">
          <p className="text-right text-blue-600 text-2xl font-bold"> +8 </p>
          <p className="text-right"> AUJOURD'HUI </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
