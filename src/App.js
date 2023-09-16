import React,{useEffect, useState} from 'react';
import Recipe from'./Recipe';
import './App.css';
import { AiOutlineSearch } from "react-icons/ai";
import { BsCupStraw } from "react-icons/bs";


function App() {

  const APP_ID = 'be4f50c9'; 
  const APP_KEY = '05c7563e42cd2ea9bf0a1e9018f2b1ec';
 
  // States
  // Creates state, function to alter state, data type, and inital value of state
  const[recipes, setRecipes] = useState([]); // List of hits from api fetching
  const[search, setSearch] = useState(''); // String input 
  const[query, setQuery] = useState(''); // Final String input

  // Effects
  // Runs after page renders or when [] is updated
  useEffect(()=> { 
    getRecipes();
  }, [query]);

  /*  
  * Makes asyncronous call, while awaiting the data to be fetched from the api,
  * the rest of the code after the call is still executed.
  */
  const getRecipes = async () => { 
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}%20smoothie&app_id=${APP_ID}&app_key=${APP_KEY}&dishType=Drinks`);
    const data = await response.json(); 
    // Show all recipes in console
    console.log(data.hits);
    // Store the recipes in the "recipes" state
    setRecipes(data.hits);
  }

  // Update the "search" state with the input value
  const updateSearch = e => { 
    setSearch(e.target.value);
  }

  // Update the "query" state with the "search" state 
  const getSearch = e => { 
    // Prevent page refresh
    e.preventDefault();
    // Get rid of commas
    setQuery(search.replace(/,/g, ""));
    setSearch('');
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">
          <BsCupStraw style={{height: 60, marginBottom: -1.5 }}/>
          Smoothie Search</h1>
        <p className="directions">Enter the ingredients you want in your smoothie! (e.g.: strawberry, banana, ice)</p>
        <form onSubmit={getSearch} className="search-form"> 
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">
            <AiOutlineSearch size={20} />
          </button>
        </form>
      </div>
      <div className="recipes">
        {recipes.map(recipe =>(
          /*  
          * Iterate through the "recipes" array and for each recipe, show the "Recipe" component
          * and create props with api data for each Recipe component.
          */
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      <footer className="footer">Thanks for visiting my page!</footer>
    </div>
  );
}

export default App;
