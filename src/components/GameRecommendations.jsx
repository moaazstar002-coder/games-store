import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGames } from "../hooks/useGames";
import GameCardSkeleton from "./GameCardSkeleton";
import CardGame from "./CardGame";

export default function GameRecommendations({ currentGameId, currentGameGenres = [] }) {
  const genreSlug = currentGameGenres[0]?.slug || "";
  const { data: games, isLoading } = useGames({ genre: genreSlug, page: 1 });
  const recommendedGames = useMemo(
    () => (games || []).filter((game) => game.id !== currentGameId).slice(0, 4),
    [games, currentGameId]
  );

  if (!isLoading && recommendedGames.length === 0) return null;

  return (
    <section className="pt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold text-[#D2BBFF]">اكتشف المزيد</p>
          <h2 className="mb-0 text-2xl font-bold text-[#F1F5F9] normal-case sm:text-3xl">
            ألعاب مقترحة ومشابهة
          </h2>
        </div>
        <Link
          to="/games"
          className="hidden items-center gap-2 text-xs font-semibold text-[#D2BBFF] transition hover:text-white sm:inline-flex"
        >
          جميع الألعاب <FaArrowLeft aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => <GameCardSkeleton key={index} />)
          : recommendedGames.map((game) => (
            <CardGame
              key={game.id}
              variant="storefront"
              game={{
                ...game,
                title: game.name,
                image: game.background_image,
                price: typeof game.price === "number" ? game.price : 59.99,
              }}
            />
          ))}
      </div>

      <Link
        to="/games"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#26304A] bg-[#151B2B] px-4 py-3 text-xs font-semibold text-[#D2BBFF] transition hover:border-[#7C3AED] sm:hidden"
      >
        جميع الألعاب <FaArrowLeft aria-hidden="true" />
      </Link>
    </section>
  );
}
