import CardGame from "../components/CardGame";
import PageTransition from "../components/PageTransition";
import "../styles/pages/AllGames.css";

export default function Consoles() {
  const consoles = [
    { id: "console-1", name: "PlayStation 5", background_image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/PlayStation_5_and_DualSense_with_transparent_background.png", rating: 4.9 },
    { id: "console-2", name: "Xbox Series X", background_image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Xbox_Series_X_2_%28transparent_background%29.png", rating: 4.8 },
  ];

  return (
    <PageTransition>
      <div className="consoles-page all-games">
        <h2 className="page-title">Consoles</h2>

        <div className="game-list">
          {consoles.map(item => (
            <CardGame
              key={item.id}
              game={{
                id: item.id,
                title: item.name,
                image: item.background_image,
                price: "$499.99",
                rating: item.rating,
              }}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
