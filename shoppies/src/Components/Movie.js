import React, {useState, setState, isDisabled} from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import NominationButton from './NominationButton';
import unavailableMoviePoster from '../unavailableMoviePoster.jpg';

const DEFAULT_PLACEHOLDER_IMAGE =
  unavailableMoviePoster;

const Movie = (props, {disabled})  => {
  
  const [disable, setDisable] = useState(false);
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
    
    {props.movies && props.movies.map((movie =>  (

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
          src={movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster}
        />
        </div>
        <div 
        onClick={() => props.handleFavoritesClick(movie)}>
        <button disabled={disabled} type="submit" >💚</button> 
        </div>
    </div>
    </div>
    </AppProvider>
  )))}
  </>
  );
};


export default Movie;