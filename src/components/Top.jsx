import { useState, useEffect } from "react";

const STATIC_DATA = {
  seasons: [
    {
      season: 13,
      entries: [
        {
          id: "e001",
          rank: 1,
          displayName: "Кристальный Дворец",
          description: "Величественное сооружение из кварца и стекла. Безоговорочный победитель сезона.",
          embeds: [
            { url: "https://picsum.photos/600/400?random=1", description: "Фасад" },
            { url: "https://picsum.photos/600/400?random=2", description: "Интерьер" },
            { url: "https://picsum.photos/600/400?random=3", description: "Вид с воздуха" },
          ],
          authors: [
            { username: "Stroim_Bystro", url: "https://picsum.photos/100/100?random=11" },
            { username: "MegaArchitect", url: "https://picsum.photos/100/100?random=12" },
          ],
        },
        {
          id: "e002",
          rank: 2,
          displayName: "Подводный Город Атлантис",
          description: "Удивительный город, полностью построенный под водой с использованием уникальных строительных решений.",
          embeds: [
            { url: "https://picsum.photos/600/400?random=4", description: "Купол" },
            { url: "https://picsum.photos/600/400?random=5", description: "Внутри" },
          ],
          authors: [
            { username: "DeepDiver", url: "https://picsum.photos/100/100?random=13" },
          ],
        },
        {
          id: "e003",
          rank: 3,
          displayName: "Воздушный Замок",
          description: "Элегантная крепость, парящая в облаках, построенная на специальной платформе.",
          embeds: [
            { url: "https://picsum.photos/600/400?random=6", description: "Внешний вид" },
            { url: "https://picsum.photos/600/400?random=7", description: "Мост" },
            { url: "https://picsum.photos/600/400?random=8", description: "Закатный вид" },
          ],
          authors: [
            { username: "AirBuilder", url: "https://picsum.photos/100/100?random=14" },
          ],
        },
        {
            id: "e004",
            rank: 4,
            displayName: "Башня Проклятых",
            description: "Мрачное, но впечатляющее готическое строение.",
            embeds: [
              { url: "https://picsum.photos/600/400?random=9", description: "Башня" },
            ],
            authors: [
              { username: "GothMaster", url: "https://picsum.photos/100/100?random=15" },
            ],
          },
      ],
    },
    {
        season: 12,
        entries: [
          {
            id: "e101",
            rank: 1,
            displayName: "Имперская Гавань",
            description: "Победитель прошлого сезона. Комплекс зданий в стиле древней империи.",
            embeds: [
              { url: "https://picsum.photos/600/400?random=10", description: "Вход" },
            ],
            authors: [
              { username: "OldSchool", url: "https://picsum.photos/100/100?random=16" },
            ],
          },
        ],
      },
  ],
};

function Top() {
  const [data, setData] = useState(STATIC_DATA); 
  const [loading, setLoading] = useState(false); 
  
  const initialSeason = STATIC_DATA.seasons[0]?.season || 13;
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  
  const [currentBuilding, setCurrentBuilding] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentBuilding(0);
    setCurrentImage(0);
  }, [selectedSeason]);

  useEffect(() => {
    setCurrentImage(0);
  }, [currentBuilding]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center text-white">
        <p className="text-xl">Загрузка...</p>
      </div>
    );
  }

  if (!data || !data.seasons) {
    return null;
  }

  const season = data.seasons.find((s) => s.season === selectedSeason);
  if (!season || !season.entries || season.entries.length === 0) {
    return null;
  }

  const sortedEntries = [...season.entries].sort((a, b) => a.rank - b.rank);

  const orderedForDisplay =
    sortedEntries.length >= 3
      ? [sortedEntries[2], sortedEntries[0], sortedEntries[1]]
      : sortedEntries;

  const building = sortedEntries[currentBuilding];
  const images = building?.embeds?.map((e) => e.url) || [];

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full bg-[#0a0d1f] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          {data.seasons.map((s) => (
            <button
              key={s.season}
              onClick={() => setSelectedSeason(s.season)}
              className={`px-5 py-2 text-sm font-semibold transition-colors border-2 border-[#5096fe] rounded-lg cursor-pointer ${
                selectedSeason === s.season
                  ? "bg-[#5096fe] text-white" 
                  : "bg-white text-[#5096fe] hover:bg-gray-100" 
              }`}
            >
              {s.season} сезон
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {orderedForDisplay.map((item, idx) => {
            const actualIndex = sortedEntries.indexOf(item);
            return (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setCurrentBuilding(actualIndex)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.embeds?.[0]?.url || "/placeholder.jpg"}
                    alt={item.displayName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="bg-[#13162e] p-3">
                  <p className="text-[#5096fe] text-sm font-bold mb-1">
                    {item.rank} место
                  </p>
                  <p className="text-white font-semibold text-base">
                    {item.displayName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#13162e] rounded-2xl overflow-hidden">
          <div className="text-center py-8">
            <p className="text-[#5096fe] text-xl font-bold mb-2 uppercase tracking-wider">
              {building.rank} место
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="text-[#5096fe]">
                {building.displayName.split(" ")[0]}
              </span>
              <span className="text-white">
                {" "}
                {building.displayName.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </div>

          <div className="relative">
            {images.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#5096fe] hover:bg-[#5096fe]/80 text-[#5096fe] p-2 rounded-full transition-all"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            <img
              src={images[currentImage] || "/placeholder.jpg"}
              alt={
                building.embeds?.[currentImage]?.description ||
                building.displayName
              }
              className="w-full h-[300px] sm:h-[450px] object-cover"
            />

            {images.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#5096fe] hover:bg-[#5096fe]/80 text-[#5096fe] p-2 rounded-full transition-all"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#0a0d1f]">
              {images.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative rounded-lg overflow-hidden transition-all ${
                    currentImage === idx
                      ? "ring-2 ring-[#5096fe] scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={
                      building.embeds?.[idx]?.description ||
                      `Миниатюра ${idx + 1}`
                    }
                    className="w-full h-24 sm:h-32 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 bg-[#13162e]">
            <p className="text-[#5096fe] font-bold text-lg mb-3">
              {building.displayName}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
              {building.description || "Потрясающая постройка!"}
            </p>

            {building.authors && building.authors.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-gray-400 text-sm">Авторы:</span>
                {building.authors.map((author, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={author.url}
                      alt={author.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white text-sm font-medium">
                      {author.username}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 py-4 bg-[#0a0d1f]">
            {sortedEntries.map((entry, idx) => (
              <button
                // style="margin: 0; padding: 0; border: none; background: none; cursor: pointer;"
                key={entry.id}
                onClick={() => setCurrentBuilding(idx)}
                className={`w-3 h-3 rounded-full transition-all color-[#5096fe] bg-red ${
                  currentBuilding === idx
                    ? "bg-[#5096fe] scale-125"
                    : "bg-white hover:bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;