import { useState } from "react";

function Reservation() {

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    profession: "",
    acceptTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.acceptTerms) {
    setMessage("Vous devez accepter les conditions ❌");
    return;
  }

  try {
    const res = await fetch("http://localhost:3004/programs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    console.log("status:", res.status);

    const data = await res.json(); // OK, res est défini ici
    console.log("Réponse serveur :", data);

    if (res.ok) {
      setMessage("Votre réservation a bien été enregistrée ✅");

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        profession: "",
        acceptTerms: false
      });
    } else if (res.status === 401) {
      setMessage("Vous devez être connecté pour réserver ❌");
    } else {
      setMessage("Erreur lors de l'envoi ❌");
    }

  } catch (error) {
    console.error("Erreur :", error);
    setMessage("Erreur réseau ❌");
  }
};
  return (
    <div className="bg-[#EFF0F4] min-h-screen px-16 py-10">

      <h2 className="text-[#246BAD] font-bold text-2xl mb-10">
        ← MODIFIER MON CHOIX
      </h2>

      <div className="bg-white rounded-2xl p-10 shadow-md">
        <h1 className="text-3xl font-bold mb-10 text-gray-700">
          RÉSERVER MA PLACE
        </h1>
        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-2 gap-6">
            <div className="text-[#64748B]">
              NOM*
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full bg-gray-300 p-4 rounded-xl text-black"
              />
            </div>

            <div className="text-[#64748B]">
              PRENOM*
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full bg-gray-300 p-4 rounded-xl text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-[#64748B]">
              ADRESSE EMAIL*
              <input
                type="email"
                name="email"
                placeholder="Email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-300 p-4 rounded-xl text-black"
              />
            </div>

            <div className="text-[#64748B]">
              PROFESSION*
              <input
                type="text"
                name="profession"
                placeholder="Profession / Spécialité"
                value={formData.profession}
                onChange={handleChange}
                className="w-full bg-gray-300 p-4 rounded-xl text-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-600">
              J'accepte les conditions générales de participation et le règlement de protection des données.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-4 rounded-xl font-semibold"
          >
            VALIDER MON INSCRIPTION
          </button>

        </form>
      </div>
     
    </div>
  );

}
export default Reservation;