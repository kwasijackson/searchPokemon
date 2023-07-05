import './App.css';
import { useState, useEffect } from 'react';
//import {pokeData} from './helper/pokeData'
import axios from 'axios';

function App() {
  const [search, setSearch]=useState("");
  const [currentpage, setCurrentpage]=useState(1);
  const pagesize=10;

  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/pokemon')
      .then((res) => setPokeData(res.data));
  }, []);
  

  
  
  function handleChange(event) {
    setSearch(event.target.value)
  }

  const data= pokeData.filter((item) => {
    return search.toLocaleLowerCase === "" ? item : item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  })

  const totalpages = Math.ceil(data.length/pagesize);

  const Nextpage = () => {
    setCurrentpage(currentpage + 1)
  }

  const previouspage = () => {
    setCurrentpage(currentpage -1)
  }


 
  return (
    <div className="App"> 
      <h1>POKEMONS</h1>
       <input type="search" placeholder='search for pokemon by Name' name='search' onChange={handleChange} />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Name</th>
            <th>Species</th>
            <th>type</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Abilities</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Total</th>
            <th>Description</th>
            <th>Gen</th>
          </tr>
        </thead>
        <tbody>
          {  
          data.slice(currentpage*pagesize -pagesize,currentpage*pagesize).map(poke=>(
            <tr key={poke.id}>
              <td><img src={ `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${parseInt(poke.id)}.svg`} /></td>
              <td>{poke.id}</td>
              <td>{poke.name}</td>
              <td>{poke.species}</td>
             <td> {poke.type.join(",")}</td>
              <td>{poke.height}</td>
              <td>{poke.weight}</td>
              <td>{poke.abilities.join(",")}</td>
              <td>{poke.stats.attack}</td>
              <td>{poke.stats.defense}</td>
              <td>{poke.stats.total}</td>
              <td>{poke.description}</td>
              <td>{poke.gen}</td>
            </tr>

          ))}
        </tbody>
      </table>
      <div id="pagination">
      <button  id="previous" disabled={ currentpage===1 ? true: false} onClick={previouspage}>Prev</button>
      <span>{currentpage} of {totalpages}</span>
      <button id="next" disabled={ currentpage=== totalpages ? true: false} onClick={Nextpage}> Next</button>
      </div>
     
    </div>
  );
}

export default App;
