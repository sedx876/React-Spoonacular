import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import "./App.css";

const App = () => {
 
  //const APP_ID = "17d6dfad";
  //const APP_KEY = "3c1f180352004f55b126f653a0e6e73c";
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('products')
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      'https://api.spoonacular.com/food/products/search?query=recipe&number=100&apiKey=71cb61e896ae40fcac714624891e0f49'

      );
      
    const data = await response.json();
    setRecipes(data.products);
    console.log(data.products);
    
  };
  const updateSearch = e => {
        setSearch(e.target.value)
  }
 
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
 
  return(
    <div className="App">
      <h2>SpoonR</h2>
      <form onSubmit ={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search
          </button>
      </form>
      <div className="recipes">
      {recipes !== [] && recipes.map(recipe =>
        <Recipe
        recipe={recipe}
        key={recipe.id}
        id={recipe.id}
        title={recipe.title} 
        image={recipe.image}
        />
      )}
      </div>
    </div>
  );
};
export default App;