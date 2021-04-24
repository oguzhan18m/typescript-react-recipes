import React, { useState,useEffect, FormEvent } from 'react';
import './App.css';

function App() {
const [recipesFound,setRecipesFound] = useState([]);
const [recipeSearch, setRecipeSearch] = useState('');

const searchForRecipes = async (query: string) :Promise<any> => {
  const result = await fetch(`http://localhost:3001/?search=${query}`);
  return (await result.json()).results;
}

const handleSearch = (e : FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const input = form.querySelector('#searchText') as HTMLInputElement;
  setRecipeSearch(input.value);
}

const querySet = async () :Promise<any> => {
  const query = encodeURIComponent(recipeSearch);
  if(query){
    const response = await searchForRecipes(query);
    setRecipeSearch(response);
  }
}


useEffect(() => {
  querySet();
}, [recipeSearch]);

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className='search-form' onSubmit={(e)=> handleSearch(e)}>
        <input id='searchText' type='text' />
        <button>Search</button>

      </form>
    </div>
  );
}

export default App;
