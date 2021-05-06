import React, {useState} from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Nominations = (props) => {
    const FavoriteComponent = props.favoriteComponent;

  return (
      <>
      { props.movies.map((movie,index) => { 
                if (movie) {
                    const poster =
                    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
                    return (
                        
    <AppProvider i18n={enTranslations}>
            <div className="movie">
            <div className="moviecard">
    <div className="movietext">
     <h1>{movie.Title}</h1>
      <p>({movie.Year})</p>
      </div>
      <div className="movieimagecard">
        <img
          width="100"
          height = "150"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
        </div>
        <div
        onClick={() => props.handleFavoritesClick(movie)}>
        <FavoriteComponent/>
        </div>
    </div>
    </div>
    </AppProvider>
                    )} return null
                    })}
</>
  );
};


export default Nominations;