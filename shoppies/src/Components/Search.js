import React, { useState } from "react";
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';


const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
          <AppProvider i18n={enTranslations}>
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <Button onClick={callSearchFunction} type="submit" color="primary">Search</Button>
        </AppProvider>
      </form>
    );
}

export default Search;