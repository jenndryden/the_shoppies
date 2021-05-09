import React, {useState, setState, isDisabled} from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import NominationButton from './NominationButton';
import unavailableMoviePoster from '../unavailableMoviePoster.jpg';

//placeholder image for when there is no movie available (green image with text)
const DEFAULT_PLACEHOLDER_IMAGE =
  unavailableMoviePoster;

  //this function maps all the search results from the api and displays the movies in a card
const Movie = (props)  => {
  
  const [disable, setDisable] = useState(false);
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
        onClick={() => props.handleNominationClick(movie)}>
        <button disabled={props.disable} onClick={() => setDisable(true)} type="submit" >💚</button> 
        </div>
    </div>
    </div>
    </AppProvider>
  )))}
  </>
  );
};


export default Movie;