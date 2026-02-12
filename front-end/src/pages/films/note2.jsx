   <ul className="space-y-2 px-4 pb-4">
            {films.map((film ,index) => (
              <li
                key={film.id||index}
                className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer ${index === 0 ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
              >
                <img
                  src={film.thumbnail || "../src/assets/youtubeimg.webp"}
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