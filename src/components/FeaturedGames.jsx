import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CardGame from "./CardGame";
import useFilteredGames from "../hooks/useFilteredGames";
import GameCardSkeleton from "./GameCardSkeleton";

const getPrice = (id) => Number(((id % 5000) / 100 + 9.99).toFixed(2));

export default function FeaturedGames({
  games = [],
  loading = false,
  search = "",
  title = "ألعاب مختارة",
  eyebrow = "اختياراتنا لك",
  description = "اكتشف ألعابًا تستحق أن تكون ضمن مجموعتك.",
  discounts = [],
  ranking = false,
  showAll = true,
  headerAccessory,
  filters,
}) {
  const filteredGames = useFilteredGames(games, search);

  return (
    <section dir="rtl" className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-7">
        <div>
          <p className="mb-2 text-xs font-bold text-[#D2BBFF]">{eyebrow}</p>
          <h2 className="mb-1 text-2xl font-bold text-white normal-case sm:text-3xl">
            {title}
          </h2>
          <p className="text-sm text-[#AAB2C5]">{description}</p>
        </div>
        {headerAccessory ||
          (showAll && (
            <Link
              to="/games"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D2BBFF] transition hover:text-white"
            >
              كل الألعاب
              <FaArrowLeft aria-hidden="true" />
            </Link>
          ))}
      </div>
      {filters && <div className="mb-4">{filters}</div>}

      <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="aspect-[3/4] animate-pulse rounded-xl border border-[#26304A] bg-[#151B2B]"
            />
          ))
        ) : filteredGames.length > 0 ? (
          filteredGames.slice(0, 4).map((game, index) => (
            <div key={game.id} className="relative">
              {ranking && (
                <span                 className="absolute left-2 top-2 z-10 rounded bg-[#7C3AED] px-2 py-1 text-[10px] font-bold text-white">
                  #{index + 1} في المبيعات
                </span>
              )}
              <CardGame
                variant="storefront"
                discount={discounts[index]}
                game={{
                  ...game,
                  title: game.name,
                  image: game.background_image,
                  price: getPrice(game.id),
                  rating: game.rating,
                }}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full rounded-xl border border-[#26304A] bg-[#151B2B] p-8 text-center text-sm text-[#AAB2C5]">
            لا توجد ألعاب مطابقة للاختيار الحالي.
          </p>
        )}
      </div>
    </section>
  );
}
