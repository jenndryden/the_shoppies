import React, {useState} from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

// const nominate = 0;
// var arr = new Array(5);


// DEFAULT_PLACEHOLDER_IMAGE
const poster =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

  // function nominateFunction(movie){
  //   if (nominate<5) {
  //     arr[nominate] = movie;
  //     console.log(arr[nominate]);
  //   }
  // }

const Nominations = (props) => {
    const FavoriteButton = props.favoriteButton;
  // const [nominations, setNominations] = useState([]); 

  // const addNominatedMovie = (movie) => {
  //   const newNominationList = [...nominations, movie]; 
  //   setNominations(newNominationList);
  //   console.log('test!!')
  // };

//   const poster =
//     props.movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : props.movie.Poster;
  return (
      <>
      { props.movies.map((movie,index) => { 
                if (movie) {
                    return (
    <AppProvider i18n={enTranslations}>
            <div className="movie">
            <div className="moviecard">
    <Card>
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
        <div>
        <div 
                                onClick={() => props.handleFavoritesClick(movie)}>
                                <FavoriteButton/>
                                </div>
        </div>
        {/* <input type="submit" value="<3" onClick={() => movie.handleFavoritesClick(movie)}></input> */}
    </Card>
    </div>
    </div>
    </AppProvider>
                    )} return null
                    })}
</>
  );
};


export default Nominations;