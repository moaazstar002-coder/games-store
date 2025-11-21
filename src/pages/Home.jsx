import HeroSlider from "../components/HeroSlider";
import FeaturedGames from "../components/FeaturedGames";
import { useGames } from "../hooks/usegames";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { useGenres } from "../hooks/useGenres";
import GenreFilter from "../components/GenreFilter";

export default function Home() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const { genres, loading: genresLoading } = useGenres();

  const { games, loading: gamesLoading } = useGames({
    search,
    genre,
  });

  return (
    <div>
      <HeroSlider />


      <SearchBar search={search} setSearch={setSearch} />

      <GenreFilter 
        genres={genres}
        loading={genresLoading}
        value={genre}
        onChange={setGenre}
      />

      <FeaturedGames 
        games={games}
        loading={gamesLoading}
      />
    </div>
  );
}
