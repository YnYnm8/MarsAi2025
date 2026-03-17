
const MentionsLegales = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white py-20 px-6">

      <div className="max-w-4xl mx-auto flex flex-col gap-14">

        <h1 className="text-[#246BAD] text-5xl md:text-6xl font-bold text-center mb-10">
          Mentions légales – Festival MARS AI
        </h1>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">1. Organisation</h2>
          <p className="text-gray-700 leading-relaxed">
            Le Festival MARS AI est organisé par La plateforme MarsAI, dont le siège social est situé à La Plateforme (anciennement Docks des suds), Marseille, France.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Le festival se déroule pour la première année à Marseille et met à l’honneur les courts-métrages générés par intelligence artificielle et porte sur le thème :
            <span className="italic"> « Imaginer des futurs souhaitables ».</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">2. Objet</h2>
          <p className="text-gray-700 leading-relaxed">
            Le festival a pour objet de promouvoir la création audiovisuelle générée par intelligence artificielle. Il sélectionnera 50 courts-métrages qui seront soumis à un jury spécialisé.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">3. Participation</h2>

          <p className="text-gray-700 leading-relaxed">
            La participation au festival est ouverte à toute personne ou entité proposant un court-métrage original généré par IA.
          </p>

          <ul className="list-disc pl-6 text-gray-700 flex flex-col gap-2">
            <li>Les œuvres soumises doivent être originales et générées par IA.</li>
            <li>Les participants garantissent être détenteurs des droits de l’œuvre.</li>
            <li>Plusieurs œuvres par participant peuvent être soumises.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">4. Sélection et jury</h2>

          <p className="text-gray-700 leading-relaxed">
            Le jury du festival est composé de professionnels du cinéma, de l’IA et de la création audiovisuelle.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Le jury se réunit pour délibérer et classer les œuvres dans l’une des catégories :
          </p>

          <ul className="list-disc pl-6 text-gray-700 flex flex-col gap-2">
            <li>À discuter : œuvre nécessitant un examen plus approfondi</li>
            <li>Sélectionné : œuvre retenue pour projection et/ou prix</li>
            <li>Refusé : œuvre non retenue</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">5. Droits et propriété intellectuelle</h2>

          <p className="text-gray-700 leading-relaxed">
            Les participants conservent les droits d’auteur sur leurs œuvres.
          </p>

          <p className="text-gray-700 leading-relaxed">
            En participant, le participant autorise le Festival MARS AI à diffuser, reproduire ou utiliser son œuvre dans le cadre du festival et pour des communications promotionnelles, sans compensation financière.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Toute reproduction à des fins commerciales requiert l’accord écrit du participant.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">6. Responsabilité</h2>

          <p className="text-gray-700 leading-relaxed">
            Le festival ne peut être tenu responsable des problèmes techniques lors de la soumission ou de la projection des œuvres.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Les participants sont responsables de la légalité et de la véracité des informations fournies.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">7. Données personnelles</h2>

          <p className="text-gray-700 leading-relaxed">
            Les informations collectées (nom, prénom, email, profession) sont utilisées uniquement pour la gestion des inscriptions et communications liées au festival.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Conformément au RGPD, les participants peuvent exercer leurs droits d’accès, de modification et de suppression de leurs données en contactant
            <span className="font-medium"> [email de contact]</span>.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-[0_25px_80px_rgba(36,107,173,0.35)]">
          <h2 className="text-[#246BAD] text-3xl font-semibold">8. Acceptation</h2>

          <p className="text-gray-700 leading-relaxed">
            La participation au Festival MARS AI implique l’acceptation pleine et entière de ces mentions légales.
          </p>
        </div>

      </div>

    </section>
  );
};

export default MentionsLegales;