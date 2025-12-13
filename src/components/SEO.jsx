import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords,
  image,
  type = 'website',
  author = 'GameZone Team'
}) => {
  const location = useLocation();
  const currentUrl = `https://gamezone.com${location.pathname}`;
  
  const siteTitle = 'GameZone | Best Online Game Store';
  const defaultDescription = "Discover the best PC and Console games at unbeatable prices on GameZone. Shop now for Xbox, PlayStation, and PC titles!";
  const defaultKeywords = "games, pc games, console games, xbox, playstation, nintendo, buy games online, game store, gaming deals";
  const defaultImage = "https://gamezone.com/og-image.jpg";
  
  const pageTitle = title ? `${title} | GameZone` : siteTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageImage = image || defaultImage;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content="GameZone" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:creator" content="@GameZone" />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#8b5cf6" />
    </Helmet>
  );
};

export default SEO;