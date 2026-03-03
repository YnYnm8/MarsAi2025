import { useTranslation } from "react-i18next";

function Jury() {
  const { t } = useTranslation("jury");

  // On définit les clés des membres pour boucler dessus (évite la répétition de code)
  const juryMembers = ["aiko", "julie", "marc", "aiko", "julie", "marc"];

  return (
    <div className="bg-[#282828] min-h-screen py-8">
      {/* Header */}
      <h1 className="text-[#FF5845] mb-6 font-bold py-15 text-2xl ml-20 uppercase">
        {t("header.subtitle")}
      </h1>
      <h2 className="text-white text-6xl font-bold ml-20 uppercase">
        {t("header.titlePart1")}
      </h2>
      <h2 className="text-white text-6xl font-bold ml-20 uppercase">
        {t("header.titlePart2")}
      </h2>
      <h2 className="text-blue-500 font-bold text-6xl mb-12 ml-20 uppercase">
        {t("header.titleBlue")}
      </h2>

      {/* President Section */}
      <div className="flex justify-center mb-12">
        <div className="relative w-[800px] h-[1400px] w-full rounded-2xl overflow-hidden">
          <img
            src="julien.jpg"
            alt="julien jury"
            className="w-[1700px] h-full object-cover mx-auto rounded-2xl"
          />
          <div className="absolute bottom-6 left-6">
            <p className="text-[#FF5845] font-bold text-3xl mb-10 ml-20 uppercase">
              {t("president.role")}
            </p>
            <p className="text-white font-bold text-5xl mb-20 ml-20 uppercase">
              {t("president.name")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#333333] p-8 rounded-2xl mb-12 flex flex-col items-center text-center w-[1700px] mx-auto">
        <img src="ard.png" alt="ard" className="mb-6 w-16" />
        <p className="text-white max-w-3xl italic">
          {t("president.quote")}
        </p>
        <p className="text-blue-300 mt-4">
          {t("president.description")}
        </p>
      </div>

      <div className="flex mb-20">
        <button className="bg-[#FF5845] hover:bg-[#e04b3b] text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-lg items-center text-center w-[400px] ml-19 cursor-pointer">
          {t("president.cta")}
        </button>
      </div>

      {/* Members Grid Section */}
      <div className="bg-white py-16 px-12 rounded-t-3xl">
        <div className="mb-16">
          <p className="text-black font-bold text-5xl uppercase">
            {t("members_section.titleBlack")}
          </p>
          <p className="text-blue-500 font-bold text-5xl mt-4 uppercase">
            {t("members_section.titleBlue")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {juryMembers.map((memberKey, index) => (
            <div className="relative" key={index}>
              <img
                src={`${memberKey}.jpg`}
                alt={memberKey}
                className="w-full h-[600px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4 w-full">
                <p className="text-[#FF5845] font-bold uppercase">
                  {t(`members_section.list.${memberKey}.role`)}
                </p>
                <p className="text-white font-bold text-4xl uppercase">
                  {t(`members_section.list.${memberKey}.name`)}
                </p>
                <p className="text-white text-sm mt-2">
                  {t(`members_section.list.${memberKey}.bio`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scoring Chart Section */}
        <div className="bg-[#282828] p-10 rounded-2xl mt-20">
          <p className="text-white font-bold text-4xl uppercase">
            {t("scoring_chart.titleWhite")}
          </p>
          <p className="text-[#FF5845] font-bold text-4xl uppercase">
            {t("scoring_chart.titleRed")}
          </p>
          <p className="text-[#64748B] text-xl mt-8 max-w-3xl">
            {t("scoring_chart.intro")}
          </p>

          <div className="flex flex-col gap-10 p-6 rounded-2xl">
            {/* Pilier 1 */}
            <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
              <img src="1.png" alt="1" className="w-20 h-20 object-contain" />
              <div>
                <p className="text-white font-bold text-2xl uppercase">
                  {t("scoring_chart.pillars.originality.title")}
                </p>
                <p className="text-[#D5DAE1]">
                  {t("scoring_chart.pillars.originality.description")}
                </p>
              </div>
            </div>

            {/* Pilier 2 */}
            <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
              <img src="2.png" alt="2" className="w-20 h-20 object-contain" />
              <div>
                <p className="text-white font-bold text-2xl uppercase">
                  {t("scoring_chart.pillars.aesthetic.title")}
                </p>
                <p className="text-[#D5DAE1]">
                  {t("scoring_chart.pillars.aesthetic.description")}
                </p>
              </div>
            </div>

            {/* Pilier 3 */}
            <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
              <img src="3.png" alt="3" className="w-20 h-20 object-contain" />
              <div>
                <p className="text-white font-bold text-2xl uppercase">
                  {t("scoring_chart.pillars.narrative.title")}
                </p>
                <p className="text-[#D5DAE1]">
                  {t("scoring_chart.pillars.narrative.description")}
                </p>
              </div>
            </div>

            {/* Pilier 4 */}
            <div className="bg-[#5A5A5A] p-6 rounded-2xl flex items-start gap-6">
              <img src="4.png" alt="4" className="w-20 h-20 object-contain" />
              <div>
                <p className="text-white font-bold text-2xl uppercase">
                  {t("scoring_chart.pillars.impact.title")}
                </p>
                <p className="text-[#D5DAE1]">
                  {t("scoring_chart.pillars.impact.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jury;