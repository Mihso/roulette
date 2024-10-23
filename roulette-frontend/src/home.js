import './App.css';
import { useEffect, useState } from 'react';
import SubmitScore from './submitScore';

function Home() {
  const [recipes, setrecipes] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function getAccounts() {
      const Url = `${process.env.REACT_APP_BACKEND_URL}/api/recipes/`
      try{
      const autoResponse = await fetch(Url, { method: "get", mode: "cors" })
      if (autoResponse.ok) {
        const autoData = await autoResponse.json()
        setrecipes(autoData.recipes)
      }
      }
      catch(e){
        setrecipes([{"id": 1, "name": "pasta", "created": Date.now()}, {"id": 2, "name": "pizza", "created": Date.now()}])
      }
    } getAccounts();
  }, [])

  function handleClick(event){
    setId(event)
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Simple Recipe List</h1>
        <div className='gridder'>
        <div className='lister'>
        {recipes.length > 0 ? (
          <div>
        {recipes.map((recipe, idx)=>{
          const date = new Date(recipe.created);
          return(
            <div key={idx} >
              <button className="button" value={recipe.id} onClick={(e) => handleClick(e.target.value)}>
              Name: {recipe.name}
              <br></br>
              Created on: {date.getMonth()}, {date.getDate()}, {date.getUTCFullYear()}
              </button>
              </div>
          );
        }

        )}</div>): <div>No Recipes</div>
      }
      </div>
      <div className='details'>
        <SubmitScore key={id} id={id}></SubmitScore>
      </div>
      </div>
      </header>
    </div>
  );
}

export default Home;