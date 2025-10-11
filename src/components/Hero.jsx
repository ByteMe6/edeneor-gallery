function Hero() {
  return (
    <div className="heroContainer flex flex-col items-center justify-center min-h-screen">
      {/* Десктопна версія */}
      <div className="desktop-hero-wrapper hidden sm:block">
        <img
          src="/HeroH1.png"
          alt="аллея лучшие постройки игроков за итсорию Эдиниор"
          className="desktop-hero-h1"
        />
        <div className="desktop-hero-second-text">
          <img src="/kubok.png" alt="Кубок" className="desktop-hero-kubok" />
          <img src="/prizovoyFond.png" alt="Призовой фонд" className="desktop-hero-fond" />
          <img src="/kubok.png" alt="Кубок" className="desktop-hero-kubok" />
        </div>
      </div>

      {/* Мобільна версія */}
      <div className="mobile-hero-wrapper flex flex-col items-center sm:hidden">
        <img
          src="/HeroH1.png"
          alt="аллея лучшие постройки игроков за итсорию Эдиниор"
          className="mobile-hero-h1"
        />
        <img src="/kubok.png" alt="Кубок" className="mobile-hero-kubok" />
        <img src="/prizovoyFond.png" alt="Призовой фонд" className="mobile-hero-fond" />
      </div>

      <div className="subHeading mt-6 w-4/5 mx-auto">
        <p className="HeroMoreInfo text-white text-center text-lg">
          <span className="text-blue-700"> Аллея Эденора </span> — место славы
          нашего сервера. Каждый сезон игроки сражаются за звание лучшего проекта,
          чтобы занять призовые места на Аллее Эденора, и разделить призовой фонд.
          Учавствуй вместе со своей командой!
          <span className="text-blue-700 cursor-pointer"> Подробнее...</span>
        </p>
      </div>
    </div>
  );
}

export default Hero;