import React, { useState,useEffect, FormEvent } from 'react';
import './App.css';

function App() {
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: String): Promise<any> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = '';
  };


useEffect(() => {
  (async () => {
    const query = encodeURIComponent(recipeSearch);
    const response = await searchForRecipes(query);
    setRecipesFound(response);
  })();
}, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className='search-form' onSubmit={(event)=> handleSearch(event)}>
        <input id='searchText' type='text' />
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default App;
