import { useState, useEffect } from "react";
import calendar from "../../assets/calendar.png";
import profile from "../../assets/profil.png";

function HeaderWorkshop() {
  return (
    <>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-10">
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
          Back-office officiel
        </span>
      </div>

      {/* Title block */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-2">
          Admin Management
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
          Planning & Workshops
        </h1>
        <p className="text-sm text-gray-500">
          Gérez l'agenda du festival à Marseille et le flux des participants.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <img src={profile} alt="profil" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">Réservations totales</p>
            <p className="text-2xl font-extrabold text-gray-900 leading-none mt-0.5">245</p>
            <p className="text-xs font-semibold text-green-500 mt-1">↑ +12 aujourd'hui</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <img src={calendar} alt="calendrier" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-orange-300 uppercase tracking-wider">Taux de remplissage</p>
            <p className="text-2xl font-extrabold text-gray-900 leading-none mt-0.5">78%</p>
            <p className="text-xs font-semibold text-gray-400 mt-1">Global workshops</p>
          </div>
        </div>
      </div>

      {/* Date pill */}
      <div className="mb-8">
        <button className="text-xs font-bold tracking-widest uppercase text-blue-500 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
          📅 Vendredi 17 mai
        </button>
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 mb-6">
        <p className="text-xs font-bold tracking-widest text-gray-300 uppercase whitespace-nowrap">
          Ateliers
        </p>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
    </>
  );
}

function Tooltip({ text }) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
    </div>
  );
}

function WorkshopCard({ workshop }) {
  const date = new Date(workshop.date);
  const formatted = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Date + lieu */}
      <div className="flex items-center justify-between mb-3">
        {/* Tooltip sur la date */}
        <div className="relative group">
          <p className="text-xs font-semibold text-gray-400 cursor-default">{formatted}</p>
          <Tooltip text={`Atelier prévu le ${formatted}`} />
        </div>

        {/* Tooltip sur le lieu */}
        <div className="relative group">
          <span className="text-xs font-bold uppercase tracking-wide text-blue-500 bg-blue-50 rounded-full px-3 py-0.5 cursor-default">
            {workshop.lieu}
          </span>
          <Tooltip text={`Lieu : ${workshop.lieu}`} />
        </div>
      </div>

      {/* Title + subtitle */}
      <p className="text-base font-bold text-gray-900 leading-snug mb-1">
        {workshop.title}
      </p>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">
        {workshop.subtitle}
      </p>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">

        {/* Tooltip sur le coach */}
        <div className="relative group">
          <p className="text-sm font-semibold text-blue-700 cursor-default">{workshop.coachName}</p>
          <Tooltip text={`Coach : ${workshop.coachName}`} />
        </div>

        {/* Tooltip sur les inscrits */}
        <div className="relative group">
          <p className="text-xs text-red-400 font-medium cursor-default">{workshop.participants} inscrits</p>
          <Tooltip text={`${workshop.participants} participants inscrits`} />
        </div>

      </div>
    </div>
  );
}

function Workshop() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchWorkshop() {
    try {
      const response = await fetch("http://localhost:3004/api/admin/workshops");
      if (!response.ok) throw new Error("Erreur HTTP");
      const data = await response.json();
      if (data.length > 0) setWorkshops(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur fetch workshops:", error);
      setLoading(false);
    }
  }

  useEffect(() => { fetchWorkshop(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 md:px-12 py-8 sm:py-10">
      <HeaderWorkshop />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workshops.length === 0 && (
          <p className="text-sm text-gray-400">Pas de workshops.</p>
        )}
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
}

export default Workshop;