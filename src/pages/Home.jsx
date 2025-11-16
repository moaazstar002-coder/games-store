import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import FeaturedGames from "../components/featuredGAmes";
import games from "../data/games"; 

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Game Store</h1>
      <HeroSlider />
      <Categories />
      <FeaturedGames games={games} /> 
    </div>
  );
}
