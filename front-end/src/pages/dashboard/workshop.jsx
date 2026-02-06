
function Workshop() {
  return (
    <div className="min-h-screen bg-gray-100 px-12 py-10 sm:text-xl/8">

      {/* Header */}
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
      <div className="flex flex-col gap-8 sm:text-xl/8 ">

        {/* Stats Card 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-4 sm:text-xl/8 ">
          <div className="flex items-center gap-3 sm:text-xl/8 ">
            <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center sm:text-xl/8 ">
            <img src="/custumer.png" alt="customer" className="w-15 h-15 sm:text-xl/8" />
            </div>
            <p className="font-semibold text-gray-500 sm:text-xl/8 ">
              RÉSERVATIONS TOTALES
            </p>
          </div>
          <p className="text-3xl font-bold text-black sm:text-xl/8">245</p>
          <p className="text-gray-500 font-semibold sm:text-xl/8">
            +12 AUJOURD’HUI
          </p>
        </div>

        {/* Stats Card 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-4 sm:text-xl/8 ">
          <div className="flex items-center gap-3 sm:text-xl/8">
            <div className="w-20 h-20 bg-orange-100 rounded-xl flex items-center justify-center sm:text-xl/8">
            <img src="/flashon.png" alt="flash" className="w-15 h-15 sm:text-xl/8 " />
            </div>
            <p className="font-semibold text-gray-500 sm:text-xl/8 ">
              TAUX DE REMPLISSAGE
            </p>
          </div>
          <p className="text-3xl font-bold text-black sm:text-xl/8">78%</p>
          <p className="text-gray-500 font-semibold sm:text-xl/8 ">
            GLOBAL WORKSHOPS
          </p>
        </div>

        {/* Date Button */}
        <button className="bg-white border border-blue-500 text-blue-500 py-2 rounded-lg w-60 font-bold sm:text-xl/8 ">
          VENDREDI 17 MAI
        </button>

        {/* ===== WORKSHOP 1 ===== */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-6 sm:text-xl/8 ">

          <div className="flex items-center gap-3 sm:text-xl/8 ">
            <img src="/clock.png" className="w-4 h-4 sm:text-xl/8 " alt="clock" />
            <p>10:00 - 11:00</p>
          </div>

          <p className="text-1xl font-bold text-black sm:text-xl/8 ">
            MASTERCLASS : PROMPT ENGINEERING VIDEO
          </p>

          <div className="flex items-start gap-4 sm:text-xl/8 ">
            <img src="/custumer.png" alt="customer" className="w-6 h-6 mt-1 sm:text-xl/8 " />
            <div>
              <p className="text-blue-800 font-bold mb-10 sm:text-xl/8">
                Coach : Jean Dupond AI Lab
              </p>
              <p className="text-gray-700 sm:text-xl/8">
                Apprenez à maitriser la cohérence temporelle avec Runway Gen-3
              </p>
            </div>
          </div>

          <p className="text-gray-700 font-bold sm:text-xl/8 ">
            NOMBRE D'INSCRIPTIONS : 12
          </p>

          <p className="text-blue-600 font-bold sm:text-xl/8">
            AUDITORIUM MUCEM
          </p>

          <div className="flex gap-8 sm:text-xl/8">
            <button className="bg-gray-200 hover:bg-gray-300 transition text-black py-2 rounded-lg w-60 font-bold flex items-center justify-center gap-3 sm:text-xl/8 ">
              <img src="/arrow.png" alt="arrow" className="h-5 sm:text-xl/8 " />
              LISTE PARTICIPANTS
            </button>

            <button className="bg-black transition text-white py-2 rounded-lg w-60 font-bold flex items-center justify-center gap-3 sm:text-xl/8 ">
              <img src="/pencil.png" alt="pencil" className="h-5 sm:text-xl/8 " />
              MODIFIER
            </button>
          </div>
        </div>

        {/* ===== WORKSHOP 2 ===== */}
        <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">

          <div className="flex items-center gap-3">
            <img src="/clock.png" className="w-4 h-4" alt="clock" />
            <p>14:00 - 16:00</p>
          </div>

          <p className="text-1xl font-bold text-black">
            ATELIER : MUSIQUE & IA GENERATIVE
          </p>

          <div className="flex items-start gap-4">
            <img src="/custumer.png" alt="customer" className="w-6 h-6 mt-1" />
            <div>
              <p className="text-blue-800 font-bold mb-10">
                Coach : Sora Music Team
              </p>
              <p className="text-gray-700">
                Composition assistée par IA pour vos courts-métrages.
              </p>
            </div>
          </div>

          <p className="text-gray-700 font-bold">
            NOMBRE D'INSCRIPTIONS : 16
          </p>

          <p className="text-blue-600 font-bold">
            STUDIO 1 - FRICHE BELLE DE MAI
          </p>

          <div className="flex gap-8">
            <button className="bg-gray-200 hover:bg-gray-300 transition text-black py-2 rounded-lg w-60 font-bold flex items-center justify-center gap-3">
              <img src="/arrow.png" alt="arrow" className="h-5" />
              LISTE PARTICIPANTS
            </button>

            <button className="bg-black transition text-white py-2 rounded-lg w-60 font-bold flex items-center justify-center gap-3">
              <img src="/pencil.png" alt="pencil" className="h-5" />
              MODIFIER
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Workshop;
