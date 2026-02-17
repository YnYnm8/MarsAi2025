


export default function HeaderWorkshop() {

    return (<>
        <div className="flex justify-between items-center mb-12 sm:text-xl/8 ">
            <h2 className="text-gray-500 tracking-wide font-bold sm:text-xl/8 ">
                BACK-OFFICE OFFICIEL
            </h2>

            <div className="flex items-center gap-4 sm:text-xl/8 ">
                <div className="text-right sm:text-xl/8 ">
                    <p className="font-semibold text-black sm:text-xl/8 ">ADMINISTRATEUR</p>
                    <p className="text-blue-500 font-semibold text-sm sm:text-xl/8 ">
                        admin@email.com
                    </p>
                </div>
                <img
                    src="/mec.jpg"
                    alt="profil"
                    className="w-10 h-10 rounded-full object-cover sm:text-xl/8 "
                />
            </div>
        </div>

        {/* Admin Management */}
        <div className="flex items-center gap-3 mb-6 sm:text-xl/8 ">
            <img src="/calendrier.png" alt="calendrier" className="w-6 h-6 sm:text-xl/8" />
            <p className="text-orange-600 font-semibold">
                ADMIN MANAGEMENT
            </p>
        </div>

        <h1 className="text-4xl font-bold text-black mb-12 sm:text-xl/8">
            PLANNING & WORKSHOPS
        </h1>

        <p className="text-xl mb-10 sm:text-xl/8 ">
            Gérez l'agenda du festival à Marseille et le flux des participants.
        </p>

      {/* ===== CONTENEUR GLOBAL ===== */}
      <div className="flex  gap-8 sm:text-xl/8 ">

        {/* Stats Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-4 sm:text-xl/8 flex-1">
          <div className="flex items-center gap-3 sm:text-xl/8 ">
            <div className="w-20 h-20 bg-blue-300 rounded-xl flex items-center justify-center sm:text-xl/8 ">
            <img src="/custumer.png" alt="customer" className="w-15 h-15 sm:text-xl/8" />
            </div>
            <p className="font-semibold text-blue-800 sm:text-xl/8 ">
              RÉSERVATIONS TOTALES
            </p>
          </div>
          <p className="texxl font-bold text-black sm:text-xl/8">245</p>
          <p className="text-gray-500 font-semibold sm:text-xl/8">
            +12 AUJOURD’HUI
          </p>
        </div>

        {/* Stats Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-4 sm:text-xl/8 flex-1">
          <div className="flex items-center gap-3 sm:text-xl/8">
            <div className="w-20 h-20 bg-orange-300 rounded-xl flex items-center justify-center sm:text-xl/8">
            <img src="/flashon.png" alt="flash" className="w-15 h-15 sm:text-xl/8 " />
            </div>
            <p className="font-semibold text-orange-600 sm:text-xl/8 ">
              TAUX DE REMPLISSAGE
            </p>
          </div>
          <p className="text-5xl font-bold text-black sm:text-xl/8">78%</p>
          <p className="text-gray-500 font-semibold sm:text-xl/8 ">
            GLOBAL WORKSHOPS
          </p>
        </div>

        {/* Date Button */}
        </div>
        <button className="bg-white border border-blue-500 text-blue-500 py-2 rounded-lg w-60 font-bold sm:text-xl/8 mb-10 mt-10">
          VENDREDI 17 MAI
        </button>
    </>)
}