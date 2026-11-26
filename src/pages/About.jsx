// About.jsx
import "../styles/pages/About.css";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <main className="about-page">
        <section className="about-section" id="about">
          <header className="about-heading">
            <span className="about-eyebrow">ABOUT THE STORE</span>
            <h1 className="about-title">About Gamer&apos;s Nest</h1>
            <p className="about-intro">
              Your destination for the latest PC and console games, accessories,
              and everything that makes game night better.
            </p>
          </header>

          <p className="about-text">
            Welcome to <strong>Gamer&apos;s Nest</strong>, your one-stop shop for
            the latest and greatest PC and console games since 2023. We bring
            gamers a premium experience with the best selection of titles and
            unbeatable prices.
          </p>

          <div className="about-story-grid">
            <section className="about-story-card">
              <span className="about-card-number">01</span>
              <h2 className="about-subtitle">Our Mission</h2>
              <p className="about-text">
                Our mission is to make every gamer’s journey exciting and
                effortless. We believe in quality, variety, and fast delivery,
                so you can spend more time playing and less time searching.
              </p>
            </section>

            <section className="about-story-card">
              <span className="about-card-number">02</span>
              <h2 className="about-subtitle">Our Story</h2>
              <p className="about-text">
                As passionate gamers ourselves, we started Gamer&apos;s Nest to
                create a place where every gamer can find their favorite titles
                easily and enjoyably. Gaming is more than a hobby—it’s a
                lifestyle!
              </p>
            </section>
          </div>

          <section className="about-why">
            <div>
              <span className="about-eyebrow">BUILT FOR PLAYERS</span>
              <h2 className="about-subtitle">Why Choose Us?</h2>
            </div>
            <ul className="about-list">
              <li>Excellent customer support for all gamers.</li>
              <li>Fast and reliable shipping worldwide.</li>
              <li>Wide variety of games for PC, PlayStation, Xbox, and more.</li>
              <li>Exclusive offers and seasonal discounts.</li>
            </ul>
          </section>

          <div className="about-cta">
            <div>
              <h2>Ready for your next adventure?</h2>
              <p>Explore the collection and find your next favorite game.</p>
            </div>
            <Link to="/games" className="cta-button">
              Explore Our Games
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default About;
