import React, { useReducer, useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import Nominations from "./Nominations";
import NominationButton from "./NominationButton";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=nemo&apikey=4a3b711b";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


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



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  

    useEffect(() => {
    
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
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5107eb21`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, errorMessage, loading } = state;
    const [nominations, setNominations] = useState([]); 

    const addNominatedMovie = (movie) => {
      const newNominationList = [...nominations, movie]; 
      setNominations(newNominationList);
      console.log("Added!");
      console.log(newNominationList);
    };

    return (
    <div className="App">
      <Header text="The Shoppies" />
      <Search search={search}/>
      <div className="allMovies">
        <br></br>
      <p className="App-intro">Nominate your favourite movies by pressing the heart!</p>
      <br></br>
      {/* <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )} */}
         <Movie 
                      movies={movies}
                      key={movies.imdbID}
                      favoriteComponent={NominationButton} 
                      handleFavoritesClick={addNominatedMovie}
                      />
      {/* </div> */}
    </div>
    <div className="nominatedMovies">
    <p className="App-intro">Nominated Movies</p>
    <div className="movies">
        {/* {(loading && !errorMessage) ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Nominations key={`${index}-${movie.Title}`} movie={movie}/>
          ))
        )} */}
         <Nominations
                movies={nominations} 
                key={nominations.imdbID}
                favoriteComponent={NominationButton} 
                handleFavoritesClick={addNominatedMovie}
                /> 
      </div>
    </div>
    </div>
  );
};

export default App;