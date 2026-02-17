import { useState, useEffect } from "react";

import HeaderWorkshop from "./headerWorkshop";

function Workshop() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchWorkshop() {
    try {
      const response = await fetch("http://localhost:3000/api/admin/workshops");

      if (!response.ok) {
        throw new Error("Erreur HTTP");
      }

      const data = await response.json();

      console.log("DATA:", data);

      if (data.length > 0) {
        setWorkshops(data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Erreur fetch workshops:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkshop();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
   <div className="min-h-screen bg-gray-100 px-12 py-10">

      {/* Header */}
      

      <HeaderWorkshop />

      {/* ===== CONTENEUR GLOBAL ===== */}
      <div className="grid grid-cols-2 gap-8">

        {workshops.length <= 0 && <p>Pas de workshops</p>}

        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="bg-white p-8 rounded-2xl shadow-md space-y-6 "
          >
            <p>{new Date(workshop.date).toLocaleDateString()}</p>

            <p className="text-xl font-bold text-black">
              {workshop.title}
            </p>

            <div>
              <p className="text-blue-800 font-bold">
                Coach : {workshop.coachName}
              </p>

              <p>{workshop.subtitle}</p>
            </div>

            <p>
              NOMBRE D'INSCRIPTIONS : {workshop.participants}
            </p>

            <p className="text-blue-600 font-bold">
              {workshop.lieu}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshop;
