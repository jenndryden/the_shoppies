import React, {useState} from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import unavailableMoviePoster from '../unavailableMoviePoster.jpg';

//placeholder image for when there is no movie available (green image with text)
const DEFAULT_PLACEHOLDER_IMAGE =
unavailableMoviePoster;

// nomination function, takes all results from nominated array and maps them
const Nominations = (props) => {
    const RemoveButtonComponent = props.removeButtonComponent;

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
        onClick={() => props.handleNominationClick(movie)}>
        <RemoveButtonComponent/>
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