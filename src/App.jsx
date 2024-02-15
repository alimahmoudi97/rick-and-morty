import './App.css'
import Main from './components/Main'
import Navbar, { Search } from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loder from './components/Loder'

function App() {
  const [selectCharacter,setSelectCharacter]=useState(null);
  const [character,setCharacter]=useState([]);
  const [isLosding,setIsLoding]=useState(true);
  const [query,setQuery]=useState(null);
  const [favourites,setFavourites]=useState(()=>JSON.parse(localStorage.getItem("FAVOURITES")) || []);

  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;

    async function fetchData(){
      try {
        setIsLoding(true);
        const {data}=await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`,{signal});
        setCharacter(data.results);
      } catch (error) {
        // setCharacter(data.results);
      } finally{
        setIsLoding(false)
      }
    }
    if(!query){
      setCharacter([]);
      return;
    }
    fetchData();
    return()=>{
      controller.abort();
    }
  },[query])

  useEffect(()=>{
    localStorage.setItem("FAVOURITES",JSON.stringify(favourites))
  },[favourites])
  const handleSelectCharacter=(id)=>{
    setSelectCharacter(selectCharacter=>id===selectCharacter?null:id);
  }

  const onAddFavourite=(ch)=>{
    setFavourites((pre)=>[...pre,ch]);
  }
  const onDeleteFavourite=(id)=>{
    setFavourites((preFav)=>preFav.filter((fav)=>fav.id!==id));
  }
  const isAddToFavourite=favourites.map((c)=>c.id).includes(selectCharacter);

  return (
    <div className="app-container">
      <Navbar
       character={character}
       favourites={favourites}
       onDeleteFavourite={onDeleteFavourite}
       >
        <Search setQuery={setQuery}/>
      </Navbar>
      <div className="main-container">
        {
          isLosding ? 
          <Loder/> 
          :
          <Sidebar 
          data={character}
          handleSelectCharacter={handleSelectCharacter}
          selectCharacter={selectCharacter}
        />
        }
        <Main 
          selectCharacter={selectCharacter}
          onAddFavourite={onAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </div>
    </div>
  )
}

export default App
