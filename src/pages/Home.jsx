import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import FeaturedGames from "../components/featuredGAmes";
import { useGames } from "../hooks/games";

export default function Home() {
 const games = useGames();
  return (
    <div>
    
      <HeroSlider />
      <Categories />
      <FeaturedGames games={games} /> 
    </div>
  );
}
