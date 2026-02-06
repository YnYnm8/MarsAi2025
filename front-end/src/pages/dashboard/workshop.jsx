
function Workshop() {
  return (
    <div className="min-h-screen bg-gray-100 px-12 py-10">
      
      <h1 className="text-4xl font-bold text-red-400 mb-12 text-center">
        LISTE DES EVENEMENTS WORKSHOP
      </h1>

      {/* Conteneur vertical */}
      <div className="flex flex-col gap-8">

        {/* Workshop 1 */}
        <div className="bg-blue-800 p-8 rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 text-white">
           <img src="/clap.svg" alt="clap" className="w-26" />
             Workshop 1 : IA & Création Cinématographique <p className="text-3xl text-red-400">Le 12/04 à 12H30</p>
          </h2>

          <p className="text-white">
            Plongez au cœur de la création assistée par intelligence artificielle lors d’un workshop immersif dédié aux réalisateurs et scénaristes de courts métrages. À travers des démonstrations concrètes et des ateliers pratiques, vous découvrirez comment l’IA peut stimuler l’inspiration, générer des pistes narratives originales et accompagner les différentes étapes de la conception d’un film, de l’idée initiale jusqu’à la visualisation des premières scènes.

           Animé par un réalisateur et un ingénieur en IA, cet atelier questionnera les enjeux éthiques et artistiques de ces nouveaux outils. Les participants seront invités à réfléchir à la place de l’humain dans le processus créatif, aux limites de l’automatisation et aux nouvelles formes d’esthétique que ces technologies rendent possibles. Un temps d’échange interactif permettra de confronter points de vue et expériences afin d’imaginer ensemble le futur du court métrage à l’ère de l’intelligence artificielle.
          </p>

          <p className="text-white">
            Animé par un réalisateur et un ingénieur en IA, cet atelier questionnera les enjeux éthiques et artistiques de ces nouveaux outils.
          </p>
        </div>

        {/* Workshop 2 */}
        <div className="bg-blue-800 p-8 rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 text-white">
           <img src="/video.svg" alt="video" className="w-26"/> 
             Workshop 2 : IA & Post-production <p className="text-3xl text-red-400">Le 05/05 à 8H45</p>
          
          </h2>

          <p className="text-white">
           Découvrez comment l’intelligence artificielle transforme le montage et la post-production : détection automatique des meilleures prises, amélioration d’image et création sonore générative. Grâce à des outils innovants, l’IA peut analyser des heures de rushs en quelques minutes, proposer des coupes optimisées et suggérer un rythme narratif adapté à l’émotion recherchée.

           L’atelier présentera également des solutions d’upscaling vidéo, de correction colorimétrique intelligente et de génération d’ambiances sonores sur mesure. Les participants pourront observer en direct l’impact de ces technologies sur une séquence de court métrage et comparer un montage traditionnel à une version assistée par IA. Une discussion finale permettra d’évaluer les gains de temps, les limites créatives et les nouvelles perspectives offertes par ces outils dans le paysage cinématographique contemporain.
          </p>
        </div>

        {/* Workshop 3 */}
        <div className="bg-blue-800 p-8 rounded-2xl shadow-md space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-3 text-white">
            <img src="/book.svg" alt="book" className="w-26"/>
            Workshop 3 : Écriture augmentée avec l’IA <p className="text-3xl text-red-400">Le 22/05 à 14H00</p>
          </h2>

          <p className="text-white">
            Explorez l’IA comme partenaire d’écriture pour générer des idées originales, structurer un récit et développer des personnages innovants. À travers des exercices guidés, vous découvrirez comment dialoguer avec des outils d’intelligence artificielle pour affiner une intrigue, enrichir les arcs narratifs et explorer des univers créatifs inattendus.

           L’atelier abordera également les techniques de prompt writing adaptées au scénario, la réécriture assistée et l’analyse automatique de la cohérence dramatique. Les participants expérimenteront différentes approches de co-création homme-machine afin de transformer une idée brute en concept solide de court métrage. Une réflexion collective permettra enfin d’interroger la place de l’auteur face à ces nouvelles technologies et de repenser la notion d’inspiration à l’ère de l’intelligence artificielle.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Workshop;