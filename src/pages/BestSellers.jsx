import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
  FaGamepad,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import CardGame from "../components/CardGame";
import GameCardSkeleton from "../components/GameCardSkeleton";
import PageTransition from "../components/PageTransition";
import { useGames } from "../hooks/useGames";

const platforms = [
  { slug: "pc", label: "Steam" },
  { slug: "playstation", label: "PS5" },
  { slug: "xbox", label: "Xbox" },
  { slug: "nintendo", label: "Switch" },
];

const sortOptions = [
  { value: "-added", label: "الأكثر شعبية" },
  { value: "-rating", label: "الأعلى تقييماً" },
  { value: "-released", label: "الأحدث إصداراً" },
];

function getPrice(id) {
  return Number(((id % 5000) / 100 + 9.99).toFixed(2));
}

function getStorefrontGame(game) {
  return {
    ...game,
    title: game.name,
    image: game.background_image,
    price: getPrice(game.id),
    rating: game.rating,
  };
}

function RankingCard({ game, rank }) {
  return (
    <article className="relative min-w-0">
      <span
        className={`absolute left-3 top-3 z-10 inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full px-2 font-[Space_Grotesk] text-sm font-bold shadow-lg ${
          rank === 1
            ? "bg-gradient-to-br from-amber-300 to-amber-500 text-[#231500]"
            : rank === 2
              ? "bg-[#CBD5E1] text-[#172033]"
              : "bg-[#B8794A] text-white"
        }`}
      >
        {rank === 1 && <FaCrown aria-hidden="true" className="text-xs" />}
        #{rank}
      </span>
      <CardGame variant="storefront" game={getStorefrontGame(game)} />
    </article>
  );
}

export default function BestSellers() {
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-added");
  const [platform, setPlatform] = useState("");
  const { data: games, isLoading, isError } = useGames({ page, ordering });

  const visibleGames = useMemo(
    () =>
      (games || []).filter(
        (game) =>
          !platform ||
          game.parent_platforms?.some(
            ({ platform: gamePlatform }) => gamePlatform.slug === platform
          )
      ),
    [games, platform]
  );
  const podium = visibleGames.slice(0, 3);
  const rankedGames = visibleGames.slice(3);

  const changePlatform = (value) => {
    setPlatform((current) => (current === value ? "" : value));
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="bg-[#0F131D]">
        <main
          dir="rtl"
          className="mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-14 pt-6 text-[#DFE2F1] sm:px-6 lg:px-8"
        >
          <nav
            aria-label="مسار التنقل"
            className="mb-5 flex items-center gap-2 text-xs text-[#858DA1]"
          >
            <Link to="/" className="transition hover:text-white">
              الرئيسية
            </Link>
            <FaChevronLeft aria-hidden="true" className="text-[9px]" />
            <span className="text-[#F1F5F9]">الأكثر شعبية</span>
          </nav>

          <header className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1C1F2A] px-3 py-1.5 text-xs font-semibold text-[#4AE176]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4AE176] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4AE176]" />
                </span>
                ترتيب حسب بيانات الألعاب المتاحة
              </span>
              <h1 className="mb-3 text-right text-3xl font-bold text-[#F1F5F9] normal-case sm:text-4xl">
                قائمة المتصدرين والأكثر شعبية
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-[#AAB2C5] sm:text-base">
                اكتشف الألعاب التي يتابعها اللاعبون. الترتيب هنا مبني على بيانات
                الشعبية والتقييم المتاحة، وليس على أرقام مبيعات المتجر.
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-3 gap-2 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-2 sm:min-w-[390px] sm:gap-3 sm:p-3">
              <div className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-center">
                <FaBolt aria-hidden="true" className="mb-1 text-[#4AE176]" />
                <span className="font-[Space_Grotesk] text-lg font-bold text-white">
                  {visibleGames.length}
                </span>
                <span className="text-[10px] text-[#858DA1]">لعبة معروضة</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg bg-[#1C1F2A] px-2 py-2 text-center">
                <FaTrophy aria-hidden="true" className="mb-1 text-[#D2BBFF]" />
                <span className="font-[Space_Grotesk] text-lg font-bold text-white">
                  #{(page - 1) * 20 + 1}–{(page - 1) * 20 + visibleGames.length}
                </span>
                <span className="text-[10px] text-[#858DA1]">المراكز الحالية</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg px-2 py-2 text-center">
                <FaGamepad aria-hidden="true" className="mb-1 text-[#D2BBFF]" />
                <span className="font-[Space_Grotesk] text-lg font-bold text-white">
                  RAWG
                </span>
                <span className="text-[10px] text-[#858DA1]">مصدر البيانات</span>
              </div>
            </div>
          </header>

          <section
            aria-label="خيارات ترتيب القائمة"
            className="mb-8 rounded-xl border border-[#26304A]/70 bg-[#171B26]/90 p-3 shadow-lg sm:p-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-3 border-b border-[#26304A] pb-4 sm:flex-row sm:items-center">
                <div
                  role="group"
                  aria-label="ترتيب الألعاب"
                  className="flex flex-wrap items-center gap-1 rounded-lg bg-[#1C1F2A] p-1"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={ordering === option.value}
                      onClick={() => {
                        setOrdering(option.value);
                        setPage(1);
                      }}
                      className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                        ordering === option.value
                          ? "bg-[#7C3AED] text-white shadow"
                          : "text-[#AAB2C5] hover:bg-[#262A35] hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#858DA1]">
                  يتم جلب النتائج على صفحات لتسهيل التصفح.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label="تصفية حسب المنصة"
                  className="flex flex-wrap items-center gap-2"
                >
                  <button
                    type="button"
                    aria-pressed={!platform}
                    onClick={() => changePlatform("")}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      !platform
                        ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                        : "border-[#26304A] bg-[#1C1F2A] text-[#AAB2C5] hover:text-white"
                    }`}
                  >
                    كل المنصات
                  </button>
                  {platforms.map(({ slug, label }) => (
                    <button
                      key={slug}
                      type="button"
                      aria-pressed={platform === slug}
                      onClick={() => changePlatform(slug)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        platform === slug
                          ? "border-[#7C3AED] bg-[#7C3AED] text-white"
                          : "border-[#26304A] bg-[#1C1F2A] text-[#AAB2C5] hover:border-[#7C3AED] hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-[#AAB2C5]" aria-live="polite">
                  {visibleGames.length} نتيجة في الصفحة {page}
                </span>
              </div>
            </div>
          </section>

          {isError ? (
            <div
              role="alert"
              className="rounded-xl border border-[#FF4D6D]/30 bg-[#171B26] px-5 py-14 text-center"
            >
              <h2 className="mb-2 text-xl font-bold text-[#F1F5F9] normal-case">
                تعذر تحميل قائمة الألعاب
              </h2>
              <p className="text-sm text-[#AAB2C5]">
                تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.
              </p>
            </div>
          ) : (
            <>
              <section aria-labelledby="podium-title" className="mb-9">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-1.5 rounded-full bg-[#D2BBFF]" />
                    <div>
                      <h2
                        id="podium-title"
                        className="mb-1 text-xl font-bold text-[#F1F5F9] normal-case sm:text-2xl"
                      >
                        منصة المتصدرين
                      </h2>
                      <p className="text-xs text-[#858DA1]">
                        أبرز النتائج في الصفحة الحالية
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#858DA1]">
                    المراكز الأولى حسب الترتيب المختار
                  </span>
                </div>

                <div className="grid items-end gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    Array.from({ length: 3 }, (_, index) => (
                      <GameCardSkeleton key={index} />
                    ))
                  ) : podium.length ? (
                    [podium[2], podium[0], podium[1]]
                      .filter(Boolean)
                      .map((game) => {
                        const rank = visibleGames.indexOf(game) + 1;
                        return (
                          <RankingCard
                            key={game.id}
                            game={game}
                            rank={(page - 1) * 20 + rank}
                          />
                        );
                      })
                  ) : (
                    <p className="col-span-full rounded-xl border border-[#26304A] bg-[#171B26] p-8 text-center text-sm text-[#AAB2C5]">
                      لا توجد نتائج لهذه المنصة في الصفحة الحالية.
                    </p>
                  )}
                </div>
              </section>

              <section aria-labelledby="ranked-list-title" className="mb-9">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-1.5 rounded-full bg-[#4AE176]" />
                    <div>
                      <h2
                        id="ranked-list-title"
                        className="mb-1 text-xl font-bold text-[#F1F5F9] normal-case sm:text-2xl"
                      >
                        ترتيب الألعاب
                      </h2>
                      <p className="text-xs text-[#858DA1]">
                        {page === 1
                          ? "المراكز التالية ضمن النتائج الحالية"
                          : `نتائج الصفحة ${page}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-[#858DA1]">
                    {rankedGames.length} لعبة
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {isLoading ? (
                    Array.from({ length: 5 }, (_, index) => (
                      <div
                        key={index}
                        className="h-28 animate-pulse rounded-xl border border-[#26304A] bg-[#171B26]"
                      />
                    ))
                  ) : rankedGames.length ? (
                    rankedGames.map((game, index) => (
                      <div
                        key={game.id}
                        className="flex min-w-0 items-stretch gap-2 sm:gap-3"
                      >
                        <div className="flex w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-[#171B26] text-center sm:w-14">
                          <span className="font-[Space_Grotesk] text-sm font-bold text-[#F1F5F9] sm:text-base">
                            #{(page - 1) * 20 + index + 4}
                          </span>
                          <FaStar
                            aria-hidden="true"
                            className="mt-1 text-[10px] text-[#FBBF24]"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardGame
                            variant="storefront-list"
                            game={getStorefrontGame(game)}
                          />
                        </div>
                      </div>
                    ))
                  ) : !isLoading && podium.length ? (
                    <p className="rounded-xl border border-[#26304A] bg-[#171B26] p-5 text-center text-sm text-[#AAB2C5]">
                      هذه كل النتائج المتاحة في الصفحة الحالية.
                    </p>
                  ) : null}
                </div>
              </section>

              {!isLoading && visibleGames.length > 0 && (
                <nav
                  aria-label="صفحات قائمة المتصدرين"
                  className="mb-9 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#26304A]/70 bg-[#171B26] px-4 py-3"
                >
                  <p className="text-xs text-[#AAB2C5]">صفحة {page}</p>
                  <div className="flex items-center gap-2" dir="ltr">
                    <button
                      type="button"
                      onClick={() =>
                        setPage((current) => Math.max(current - 1, 1))
                      }
                      disabled={page === 1}
                      aria-label="الصفحة السابقة"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] transition hover:border-[#7C3AED] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FaChevronLeft aria-hidden="true" />
                    </button>
                    <span
                      aria-current="page"
                      className="grid h-9 min-w-9 place-items-center rounded-lg bg-[#7C3AED] px-2 text-xs font-semibold text-white"
                    >
                      {page}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage((current) => current + 1)}
                      disabled={!games || games.length < 20}
                      aria-label="الصفحة التالية"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] transition hover:border-[#7C3AED] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FaChevronRight aria-hidden="true" />
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["تصفح سريع", "قائمة مرتبة وسهلة التصفح."],
              ["بيانات واضحة", "التقييمات من بيانات الألعاب المتاحة."],
              ["أضف للمفضلة", "احتفظ بالألعاب التي تريد الرجوع إليها."],
              ["أضف للسلة", "اجمع اختياراتك في سلة واحدة."],
            ].map(([title, description], index) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#7C3AED]/15 text-[#D2BBFF]">
                  {index === 0 ? (
                    <FaGamepad aria-hidden="true" />
                  ) : index === 1 ? (
                    <FaStar aria-hidden="true" />
                  ) : index === 2 ? (
                    <FaCrown aria-hidden="true" />
                  ) : (
                    <FaBolt aria-hidden="true" />
                  )}
                </span>
                <div>
                  <h3 className="mb-0.5 text-sm font-bold text-[#F1F5F9] normal-case">
                    {title}
                  </h3>
                  <p className="text-[11px] leading-5 text-[#858DA1]">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </PageTransition>
  );
}
