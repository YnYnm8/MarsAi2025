
export default function Film() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl space-y-6">

        {/* 戻る */}
        <p className="text-sm text-gray-500 cursor-pointer　text-blue-100 ">
          ← RETOUR GALERIE
        </p>

        {/* 動画 */}
        <div className="rounded-xl overflow-hidden shadow">
          <img
            src="https://img.freepik.com/premium-vector/social-media-youtube-poster-with-icons-around-vector-illustration_980832-100.jpg?w=360"
            alt="youtube"
            className="w-full h-64 object-cover"
          />
        </div>
      <div className="flex items-start gap-8">

  {/* REALIZATEUR */}
  <div className="flex items-start gap-2">
    {/* オレンジのプロフィール */}
    <div className="bg-orange-500 rounded-full w-10 h-10 flex-shrink-0"></div>
    <div className="flex flex-col">
      <p className="text-sm text-gray-500">REALIZATEUR</p>
      <h2 className="font-semibold">Jean Dupond</h2>
      {/* <h2>{User.username}</h2> */}
    </div>
  </div>

  {/* ORIGINE */}
  <div className="flex items-start gap-2">
    <div className="flex flex-col">
      <p className="text-sm text-gray-500">ORIGINE</p>
      <h2 className="font-semibold">France</h2>
      {/* <h2>{candidature.country}</h2> */}
    </div>
  </div>

</div>



        {/* 映画カード */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          <h2 className="text-xl font-bold">SYNTHETICA : L’AUBE</h2>

          {/* PARTAGER */}
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold whitespace-nowrap">
              PARTAGER CE FILM
            </h3>

            <div className="flex gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                className="w-8 h-8 cursor-pointer hover:opacity-70"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                className="w-8 h-8 cursor-pointer hover:opacity-70"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                className="w-8 h-8 cursor-pointer hover:opacity-70"
              />
            </div>
          </div>

          {/* URLコピー */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500">LIEN DIRECT</p>

            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2 text-sm"
                placeholder="http://..."
              />
              <button className="px-4 py-2 bg-black text-white rounded text-sm">
                COPIER
              </button>
            </div>
          </div>
        </div>

        {/* SYNOPSIS */}
        <div className="bg-neutral-800 text-white rounded-xl p-6 space-y-3">
          <i class="fa-solid fa-book-open"></i>
          <h3 className="font-semibold text-orange-500">SYNOPSIS</h3>
          <i class="fa-solid fa-microchip"></i>
          <h3 className="font-semibold text-blue-400">TECH STACK & IA</h3>
        </div>

      </div>
    </div>
  );
}
