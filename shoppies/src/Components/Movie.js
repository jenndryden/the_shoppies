import React from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';


const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <AppProvider i18n={enTranslations}>
            <div className="movie">
    <Card
     title={movie.Title}>
    <Card.Section flush>
      <p>({movie.Year})</p>
      </Card.Section>
      <Card.Section subdued>
        <img
          width="100"
          height = "150"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
        </Card.Section>
    </Card>
    </div>
    </AppProvider>
  );
};


export default Movie;