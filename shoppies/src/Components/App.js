import React, { useReducer, useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import Nominations from "./Nominations";
import NominationButton from "./NominationButton";
import RemoveButton from "./RemoveButton";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Banner} from '@shopify/polaris';

//api key information -- enter your own custom key below if you'd like!
const API_KEY = "5107eb21";
const MOVIE_API_URL = `https://www.omdbapi.com/?s=nemo&apikey=${API_KEY}`;
let nominations_count = 0;

//inital state for creating array of movies for api calls
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

//cases for api calls
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};



const App = (
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  

    useEffect(() => {
        //setting payload as json search response for successful api call 
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else { //for api call errors
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, errorMessage, loading } = state;
    const [nominations, setNominations] = useState([]); 

    //this function is for adding new nominated movies to the nominated movie array
    const additionNominatedMovies = (movie) => {
      if ((nominations_count<5) && (!nominations.includes(movie))){ 
        nominations_count++ //increases count of nominations, cannot be more than 5
        const newNominationList = [...nominations, movie]; 
        setNominations(newNominationList);
      }
    };

    //function for removing movies from the nominated movies array
    const removalNominatedMovie = (movie) => {
      nominations_count--; // decreases movie count
      const newNominationList = nominations.filter((nomination) => nomination.imdbID !== movie.imdbID); 
      setNominations(newNominationList); 
    };


    return (
      <AppProvider>
    <div className="App">
      <Header/>
      <Search search={search}/>
      {nominations_count === 5 ? (
        //banner that is displayed when there is already 5 movies
    <Banner 
    title="You have already added 5 movies"
    status="critical"
  >
    <p>
      To add a different movie to the nominations, please{' '}
      delete a movie nomination from the list and add
      a new one.
    </p>
  </Banner>
  ) : (
    null
  )}
  {nominations_count>0 && nominations_count!==5 ? (
    <Banner
    title="Your have added a movie nomination"
    status="success"
  />
  ) :
  null}
      <div className="allMovies">
        <br></br>
      <h4 className="App-intro">movies to nominate</h4>
      <br></br>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Movie 
          movies={movies}
          key={movies.imdbID}
          handleNominationClick={additionNominatedMovies}
          />
        )} 
</div>
    </div>
    <div className="nominatedMovies">
    <h4 className="App-intro">nominated movies</h4> 
    <div className="movies">
        {(loading && !errorMessage) ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Nominations
          movies={nominations} 
          key={nominations.imdbID}
          removeButtonComponent={RemoveButton} 
          handleNominationClick={removalNominatedMovie}
          /> 
        )} 
      </div>
    </div>
    </div>
    </AppProvider>
  );
};

export default App;