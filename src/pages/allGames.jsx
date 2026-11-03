import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaGamepad,
  FaList,
  FaRedoAlt,
  FaStar,
  FaThLarge,
} from "react-icons/fa";
import CardGame from "../components/CardGame";
import GameCardSkeleton from "../components/GameCardSkeleton";
import GenreFilter from "../components/GenreFilter";
import PageTransition from "../components/PageTransition";
import SearchBar from "../components/SearchBar";
import { useGames } from "../hooks/useGames";
import { useGenres } from "../hooks/useGenres";

const orderingOptions = [
  { value: "-added", label: "المضاف حديثًا" },
  { value: "-rating", label: "الأعلى تقييماً" },
  { value: "name", label: "الاسم: أ إلى ي" },
];

function getGamePrice(game) {
  return typeof game.price === "number"
    ? game.price
    : parseFloat(String(game.price || "").replace(/[^0-9.]/g, "")) ||
        parseFloat(((game.id % 5000) / 100 + 9.99).toFixed(2));
}

function FilterSection({ title, children }) {
  return (
    <section className="border-b border-[#26304A] py-5 last:border-0">
      <h3 className="mb-3 text-sm font-bold text-[#F1F5F9] normal-case">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function AllGames() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  return <AllGamesPage key={initialSearch} initialSearch={initialSearch} />;
}

function AllGamesPage({ initialSearch }) {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [ordering, setOrdering] = useState("-added");
  const [minimumRating, setMinimumRating] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(70);
  const [layout, setLayout] = useState("grid");

  const {
    data: games,
    isLoading,
    isError,
  } = useGames({ genre, search, page, ordering });
  const {
    data: genres = [],
    isLoading: isLoadingGenres,
    isError: isGenresError,
  } = useGenres();

  const visibleGames = useMemo(
    () =>
      (games || []).filter((game) => {
        const matchesRating = (game.rating || 0) >= minimumRating;
        const matchesPrice = getGamePrice(game) <= maximumPrice;
        return matchesRating && matchesPrice;
      }),
    [games, maximumPrice, minimumRating]
  );

  const clearFilters = () => {
    setGenre("");
    setMinimumRating(0);
    setMaximumPrice(70);
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
          className="mb-4 flex items-center gap-2 text-xs text-[#858DA1]"
        >
          <Link to="/" className="transition hover:text-white">
            الرئيسية
          </Link>
          <FaChevronLeft aria-hidden="true" className="text-[9px]" />
          <span className="text-[#F1F5F9]">تصفح الألعاب</span>
        </nav>

        <header className="mb-6 flex flex-col gap-5 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#4AE176]">
              <span className="h-2 w-2 rounded-full bg-[#4AE176]" />
              اكتشف ألعابك القادمة
            </p>
            <h1 className="mb-2 text-right text-2xl font-bold text-[#F1F5F9] normal-case sm:text-3xl">
              مكتبة الألعاب الرقمية
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[#AAB2C5]">
              استكشف الألعاب، وابحث عن مغامرتك القادمة حسب النوع والسعر
              والتقييم.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#0F131D] px-3 py-2 text-xs text-[#D2BBFF] lg:self-auto">
            <FaGamepad aria-hidden="true" />
            <span>{visibleGames.length} لعبة في هذه الصفحة</span>
          </div>
        </header>

        <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <SearchBar
            search={search}
            setSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="ابحث عن لعبة..."
            className="bg-[#171B26]"
          />
          <div className="flex items-center justify-between gap-3 rounded-lg border border-[#26304A] bg-[#171B26] px-3 py-2 md:justify-start">
            <label htmlFor="games-order" className="text-xs text-[#AAB2C5]">
              ترتيب حسب
            </label>
            <select
              id="games-order"
              value={ordering}
              onChange={(event) => {
                setOrdering(event.target.value);
                setPage(1);
              }}
              className="min-w-36 rounded-md border border-[#26304A] bg-[#0F131D] px-2 py-2 text-xs text-[#F1F5F9] outline-none focus:border-[#7C3AED]"
            >
              {orderingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-[#26304A]/70 bg-[#171B26] px-4 py-3">
          {isGenresError ? (
            <p role="status" className="text-xs text-[#FFB2B8]">
              تعذر تحميل تصنيفات الألعاب.
            </p>
          ) : (
            <GenreFilter
              value={genre}
              genres={genres}
              loading={isLoadingGenres}
              onChange={(value) => {
                setGenre(value);
                setPage(1);
              }}
            />
          )}
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="order-1 h-fit rounded-xl border border-[#26304A]/70 bg-[#171B26] p-4 lg:sticky lg:top-24">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#F1F5F9] normal-case">
                <FaFilter aria-hidden="true" className="text-[#D2BBFF]" />
                تصفية الألعاب
              </h2>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[11px] text-[#AAB2C5] transition hover:text-[#D2BBFF]"
              >
                <FaRedoAlt aria-hidden="true" />
                إعادة ضبط
              </button>
            </div>

            <FilterSection title="السعر">
              <div className="mb-2 flex items-center justify-between text-xs text-[#AAB2C5]">
                <span>حتى</span>
                <span dir="ltr" className="font-[Space_Grotesk] text-[#F1F5F9]">
                  ${maximumPrice}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={maximumPrice}
                onChange={(event) => {
                  setMaximumPrice(Number(event.target.value));
                  setPage(1);
                }}
                aria-label="الحد الأقصى للسعر"
                className="w-full accent-[#7C3AED]"
              />
              <div
                dir="ltr"
                className="mt-1 flex justify-between text-[10px] text-[#858DA1]"
              >
                <span>$10</span>
                <span>$70+</span>
              </div>
            </FilterSection>

            <FilterSection title="تقييم اللاعبين">
              <div className="space-y-2">
                {[4, 3, 0].map((rating) => (
                  <label
                    key={rating}
                    className="flex cursor-pointer items-center justify-between gap-2 text-xs text-[#D1D5E2]"
                  >
                    <span className="flex items-center gap-1">
                      {rating ? `أعلى من ${rating}` : "أي تقييم"}
                      {rating > 0 && (
                        <FaStar aria-hidden="true" className="text-[#FBBF24]" />
                      )}
                    </span>
                    <input
                      type="radio"
                      name="minimum-rating"
                      checked={minimumRating === rating}
                      onChange={() => {
                        setMinimumRating(rating);
                        setPage(1);
                      }}
                      className="accent-[#7C3AED]"
                    />
                  </label>
                ))}
              </div>
            </FilterSection>
          </aside>

          <section aria-label="قائمة الألعاب" className="order-2 min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#AAB2C5]" aria-live="polite">
                {search ? `نتائج البحث عن "${search}"` : "كل الألعاب"}
                {!isLoading && ` · ${visibleGames.length} نتيجة`}
              </p>
              <div
                role="group"
                aria-label="طريقة عرض الألعاب"
                className="flex items-center gap-1 rounded-lg border border-[#26304A] bg-[#171B26] p-1"
              >
                <button
                  type="button"
                  aria-label="عرض شبكي"
                  aria-pressed={layout === "grid"}
                  onClick={() => setLayout("grid")}
                  className={`grid h-8 w-8 place-items-center rounded-md transition ${
                    layout === "grid"
                      ? "bg-[#7C3AED] text-white"
                      : "text-[#AAB2C5] hover:text-white"
                  }`}
                >
                  <FaThLarge aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="عرض قائمة"
                  aria-pressed={layout === "list"}
                  onClick={() => setLayout("list")}
                  className={`grid h-8 w-8 place-items-center rounded-md transition ${
                    layout === "list"
                      ? "bg-[#7C3AED] text-white"
                      : "text-[#AAB2C5] hover:text-white"
                  }`}
                >
                  <FaList aria-hidden="true" />
                </button>
              </div>
            </div>

            {isError ? (
              <div
                role="alert"
                className="rounded-xl border border-[#FF4D6D]/30 bg-[#171B26] px-5 py-12 text-center"
              >
                <h2 className="mb-2 text-lg font-bold text-[#F1F5F9] normal-case">
                  تعذر تحميل الألعاب
                </h2>
                <p className="text-sm text-[#AAB2C5]">
                  تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-5 ${
                  layout === "list"
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {isLoading ? (
                  Array.from({ length: 9 }, (_, index) => (
                    <GameCardSkeleton key={index} />
                  ))
                ) : visibleGames.length ? (
                  visibleGames.map((game) => (
                    <CardGame
                      key={game.id}
                      variant="storefront"
                      game={{
                        ...game,
                        title: game.name,
                        image: game.background_image,
                        price: getGamePrice(game),
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-full rounded-xl border border-[#26304A]/70 bg-[#171B26] px-5 py-12 text-center">
                    <p className="mb-2 font-semibold text-[#F1F5F9]">
                      لا توجد ألعاب تطابق اختياراتك
                    </p>
                    <p className="mb-5 text-sm text-[#AAB2C5]">
                      جرّب تغيير البحث أو إزالة بعض عوامل التصفية.
                    </p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                    >
                      إعادة ضبط التصفية
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isError && (
              <nav
                aria-label="صفحات الألعاب"
                className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#26304A]/70 bg-[#171B26] px-4 py-3"
              >
                <p className="text-xs text-[#AAB2C5]">
                  صفحة {page}
                  {!isLoading && ` · عرض ${visibleGames.length} لعبة`}
                </p>
                <div className="flex items-center gap-2" dir="ltr">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(current - 1, 1))}
                    disabled={page === 1}
                    aria-label="الصفحة السابقة"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] transition hover:border-[#7C3AED] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  {Array.from({ length: 3 }, (_, index) =>
                    Math.max(1, page - 1) + index
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      aria-current={pageNumber === page ? "page" : undefined}
                      className={`h-9 min-w-9 rounded-lg px-2 text-xs font-semibold transition ${
                        pageNumber === page
                          ? "bg-[#7C3AED] text-white"
                          : "border border-[#26304A] text-[#AAB2C5] hover:border-[#7C3AED] hover:text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((current) => current + 1)}
                    disabled={!isLoading && (!games || games.length < 20)}
                    aria-label="الصفحة التالية"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#26304A] text-[#AAB2C5] transition hover:border-[#7C3AED] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </div>
              </nav>
            )}
          </section>
        </div>

        <section className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-[#26304A]/70 bg-[#171B26] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="mb-1 text-base font-bold text-[#F1F5F9] normal-case">
              تجربة لعب موثوقة
            </h2>
            <p className="text-xs leading-5 text-[#AAB2C5]">
              تصفح مكتبة الألعاب واكتشف تفاصيل كل لعبة قبل إضافتها إلى قائمتك.
            </p>
          </div>
          <span className="shrink-0 text-xs font-semibold text-[#4AE176]">
            ألعاب جديدة بانتظارك
          </span>
        </section>
        </main>
      </div>
    </PageTransition>
  );
}
