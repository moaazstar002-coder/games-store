import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import FeaturedGames from "../components/featuredGAmes";
import { useGames } from "../hooks/usegames";
import SearchBar from "../components/search";
import { useState } from "react";
export default function Home() {
 const games = useGames();

  const [search, setSearch] = useState("");
  return (
    <div>
      <HeroSlider />
      <Categories />
      <SearchBar search={search} setSearch={setSearch} />
      <FeaturedGames games={games} 
      search={search}/> 
    </div>
  );
}
