import HeroSlider from "../components/HeroSlider";
import FeaturedGames from "../components/FeaturedGames";
import { useGames } from "../hooks/useGames";import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import GenreFilter from "../components/GenreFilter";
import Pagination from "../components/Pagination";
import PageTransition from "../components/PageTransition";

export default function Home() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);

  const { data: genres, isLoading: genresLoading } = useGenres();
  const { data: games, isLoading: gamesLoading } = useGames({ genre, search, page });

  return (
    <PageTransition>
    <div>
      <HeroSlider />

      <SearchBar search={search} setSearch={setSearch} />

      <GenreFilter 
        genres={genres || []}
        loading={genresLoading}
        value={genre}
        onChange={setGenre}
      />

      <FeaturedGames 
        games={games}
        loading={gamesLoading}
      />

      <Pagination page={page} setPage={setPage} />
    </div>
    </PageTransition>
  );
}
