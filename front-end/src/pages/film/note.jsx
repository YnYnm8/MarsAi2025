import { useState } from "react";
export default function Note() {
  const [value, setValue] = useState(1); // ←ここで状態を定義
  return (

    <div className="flex flex-col h-screen bg-gray-100 font-sans">

      {/* Header */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
        <button className="text-sm text-gray-500">← Retour</button>
        <div className="text-sm font-semibold text-blue-600">MARS.AI</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">PAUL MICHEL</span>
          <img src="https://via.placeholder.com/32" className="rounded-full" />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r overflow-y-auto">
          <div className="p-4">
            <input
              type="text"
              placeholder="Rechercher un film..."
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>
          {/* ★ フィルター（ここを追加） */}
          <div className="px-4 pb-4">
            
            <div className="flex justify-between text-xs font-semibold text-gray-500">
              <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                
                <span>A VOIR</span>
              </button>

              <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                
                <span>NOTES</span>
              </button>

              <button className="flex flex-col items-center gap-1 hover:text-blue-600">
                
                <span>TOUS</span>
              </button>
            </div>
          </div>
          <ul className="space-y-2 px-4 pb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer ${i === 0 ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
              >
                <img
                  src="https://img.freepik.com/premium-vector/social-media-youtube-poster-with-icons-around-vector-illustration_980832-100.jpg?w=360"
                  alt="youtube"
                  className="w-16 h-16 md:w-12 md:h-12 object-cover rounded"
                />
                <div>
                  <p className="text-sm font-semibold">SYNTHETICA : L’AUBE</p>
                  <p className="text-xs text-gray-500">Liam Wilson – Canada</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold">PRÊT POUR LES <br /> DÉLIBÉRATIONS ?</h1>
            <p className="text-sm text-gray-500 mt-1">
              Sélectionnez un film dans la liste à gauche
            </p>
            <div className="mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6 text-sm">
              <span className="font-bold">150</span>
              <span className="text-gray-500">FILM A NOTER</span>
              <span className="text-red-500 font-semibold">15 JUIN 2026</span>
              <span className="text-gray-500">CLUTURE</span>
            </div>
          </div>

          {/* Video Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-4 md:p-6 mb-6">
            <img
              src="https://img.freepik.com/premium-vector/social-media-youtube-poster-with-icons-around-vector-illustration_980832-100.jpg?w=360"
              alt="youtube"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-bold">SYNTHETICA : L’AUBE</h2>
                <p className="text-sm text-gray-500">En compétition · France</p>
              </div>
              <div className="text-xl font-bold mt-2 md:mt-0">0<span className="text-sm">/10</span></div>
            </div>


            {/* スライダー */}
            <input
              type="range"
              min="1"
              max="10"
              value={value} // ←ここが重要
              onChange={(e) => setValue(Number(e.target.value))} // 状態更新
              className="w-full accent-blue-600 mb-4"
            />

            {/* 下に数字を表示（選択中はハイライト） */}
            <div className="flex justify-between text-sm font-medium mb-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <span
                  key={num}
                  className={`${num === value ? "text-blue-600 font-bold" : "text-gray-400"}`}
                >
                  {num}
                </span>
              ))}
            </div>

            {/* 現在のスコア表示 */}
            <div className="text-xl font-bold">{value}/10</div>
          </div>
          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-white text-sm font-semibold">
              Valider ma note
            </button>
            <button className="rounded-lg bg-gray-900 px-6 py-2 text-white text-sm font-semibold">
              Visionner le suivant
            </button>
          </div>

          {/* Selection Buttons */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="flex items-center gap-2 text-gray-700 font-semibold">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              SÉLECTIONNER OU TRIER
            </span>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button className="bg-green-500 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">SÉLECTIONNER</button>
              <button className="bg-red-500 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">REFUSER</button>
              <button className="bg-gray-900 text-white rounded-lg px-6 py-2 text-sm font-semibold w-full md:w-auto">+ PLACER DANS UNE LISTE</button>
            </div>
          </div>
        </main >
      </div>


    </div>


  );
}
