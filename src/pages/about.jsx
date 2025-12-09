// About.jsx
import React from "react";
import "../styles/pages/About.css";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <Link to="/games"> <section className="about-section" id="about">
      <h2 className="about-title">About GameZone</h2>

      <p className="about-text">
        Welcome to <strong>GameZone</strong>, your one-stop shop for the latest
        and greatest PC and console games since 2023. We bring gamers a
        premium experience with the best selection of titles and unbeatable
        prices.
      </p>

      <h3 className="about-subtitle">Our Mission</h3>
      <p className="about-text">
        Our mission is to make every gamer’s journey exciting and effortless.
        We believe in quality, variety, and fast delivery, so you can spend
        more time playing and less time searching.
      </p>

      <h3 className="about-subtitle">Why Choose Us?</h3>
      <ul className="about-list">
        <li>Excellent customer support for all gamers.</li>
        <li>Fast and reliable shipping worldwide.</li>
        <li>Wide variety of games for PC, PlayStation, Xbox, and more.</li>
        <li>Exclusive offers and seasonal discounts.</li>
      </ul>

      <h3 className="about-subtitle">Our Story</h3>
      <p className="about-text">
        As passionate gamers ourselves, we started GameZone to create a place
        where every gamer can find their favorite titles easily and enjoyably.
        Gaming is more than a hobby—it’s a lifestyle!
      </p>

      <div className="about-cta">
        <a href="#shop" className="cta-button">
          Explore Our Games
        </a>
      </div>
    </section></Link>
   
  );
};

export default About;
