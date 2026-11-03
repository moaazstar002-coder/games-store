import { useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaBolt, FaStar } from "react-icons/fa";
import "swiper/css";
import { useGames } from "../hooks/useGames";

const getPrice = (game) =>
  typeof game.price === "number"
    ? game.price.toFixed(2)
    : ((game.id % 5000) / 100 + 9.99).toFixed(2);

export default function HeroSlider() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: games = [], isLoading, isError, refetch } = useGames({
    page: 1,
    ordering: "-featured",
  });
  const featuredGames = games.slice(0, 5);
  if (isLoading) {
    return (
      <section
        aria-label="الألعاب المميزة"
        className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <div className="h-[420px] animate-pulse rounded-2xl border border-[#26304A] bg-[#151B2B] md:h-[500px]" />
      </section>
    );
  }

  if (isError || featuredGames.length === 0) {
    return (
      <section className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-2xl border border-[#26304A] bg-[#151B2B] text-center"
        >
          <p className="text-sm text-[#AAB2C5]">تعذر تحميل الألعاب المميزة.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-[#7C3AED] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
          >
            حاول مرة أخرى
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      aria-label="الألعاب المميزة"
      className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#26304A] bg-[#0A0E18]">
        <Swiper
          modules={[Autoplay]}
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={featuredGames.length > 1}
          className="h-[420px] md:h-[500px]"
        >
          {featuredGames.map((game) => (
            <SwiperSlide key={game.id}>
              <div className="relative h-full min-h-[420px] overflow-hidden md:min-h-[500px]">
                <img
                  src={game.background_image}
                  alt=""
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0A0E18]/95 via-[#0A0E18]/70 to-[#0A0E18]/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E18]/70 via-transparent to-[#0A0E18]/20" />
                <div className="relative flex h-full max-w-3xl flex-col items-start justify-center gap-5 px-6 py-10 sm:px-10 lg:px-16">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[#7C3AED] px-3 py-1 text-xs font-bold text-white">
                      إصدار مميز
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-[#22C55E]/15 px-3 py-1 text-xs font-semibold text-[#4AE176]">
                      <FaBolt aria-hidden="true" />
                      تسليم فوري
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#D2BBFF]">
                    تجربة لعب لا تُنسى
                  </p>
                  <h1 className="mb-0 max-w-2xl text-right font-[Space_Grotesk] text-4xl font-bold leading-tight text-white normal-case sm:text-5xl lg:text-6xl">
                    {game.name}
                  </h1>
                  <p className="max-w-xl text-sm leading-7 text-[#D1D5E2] sm:text-base">
                    اكتشف عالمًا جديدًا من المغامرة، واختر لعبتك القادمة من
                    مجموعة Gamer’s Nest.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm text-[#FBBF24]">
                      <FaStar aria-hidden="true" />
                      {game.rating || "—"}
                    </span>
                    {game.released && (
                      <span className="text-sm text-[#AAB2C5]">
                        {new Date(game.released).getFullYear()}
                      </span>
                    )}
                    <span className="font-[Space_Grotesk] text-2xl font-bold text-white">
                      ${getPrice(game)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/game/${game.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-3 text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(124,58,237,0.45)] transition hover:bg-[#8B5CF6]"
                    >
                      اكتشف اللعبة
                      <FaArrowLeft aria-hidden="true" />
                    </Link>
                    <Link
                      to="/games"
                      className="rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                    >
                      تصفح كل الألعاب
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-x-4 bottom-4 z-10 flex justify-center gap-2 sm:inset-x-8 sm:justify-end">
          {featuredGames.map((game, index) => (
            <button
              key={game.id}
              type="button"
              onClick={() => swiper?.slideToLoop(index)}
              aria-label={`عرض ${game.name}`}
              aria-current={activeIndex === index}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-[#D2BBFF]"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
