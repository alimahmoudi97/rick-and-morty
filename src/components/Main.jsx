import axios from "axios";
import { useEffect, useState } from "react"
import { IoMdArrowDown } from "react-icons/io"
import Loder from "./Loder";


function Main({selectCharacter,onAddFavourite,isAddToFavourite}) {

  const [character,setCharacter]=useState(null);
  const [episodes,setEpisodes]=useState([]);
  const [isLodaing,setIsLoading]=useState(true);
  
  useEffect(()=>{
    async function fetchCharacter(){
      try {
        const {data}=await axios.get(`https://rickandmortyapi.com/api/character/${selectCharacter}`);
        setCharacter(data);
        const episodeID=data.episode.map(e=>e.split('/').at(-1));
        const {data:episodes}=await axios.get(`https://rickandmortyapi.com/api/episode/${episodeID}`);
        setEpisodes([episodes].flat().slice(0,5));
        console.log(episodeID);
      } catch (error) 
      { /* empty */ }finally{
        setIsLoading(false);
      }
    }
    if(selectCharacter) 
        fetchCharacter()
  },[selectCharacter])

  if(!character || !selectCharacter){
    return(
      <div style={{color:"white"}}>
        Please Select a Character
      </div>
    )
  }
  return (
    <div className="main">
      {
        isLodaing ?
        <Loder/>
        :
        <>
          <CharacterDetail character={character} onAddFavourite={onAddFavourite} isAddToFavourite={isAddToFavourite}/>
          <ListEpisodes item={episodes}/>
        </>
      }
    </div>
  )
}

export default Main

function CharacterDetail({character,onAddFavourite,isAddToFavourite}){

  return(
    <div className="characterlist">
        <img src={character.image}/>
        <div className="characterlist-info">
          <div className="characterlist-name">
            <h3>{character.gender=="Male"?"👨":"👩‍🦰"} {character.name}</h3>
            <div>
              <span className="status"/>
              <span>
              &nbsp;{character.status} - {character.species}
              </span>
            </div>
          </div>
          <div className="characterlist-location">
            <div>
              Last known location:
            </div>
            <strong>
              {character.location.name}
            </strong>
          </div>
          {
              isAddToFavourite?
              (
                <p style={{color:"white"}}>
                  Alerady Added ✅
                </p>
              ):
              (
                <button 
                  className="btn btn--primary"
                  onClick={()=>onAddFavourite(character)}
                  >
                  Add To Favourite
                </button>
              )
            }
        </div>
    </div>
  )
}
function ListEpisodes({item}){
  // console.log(item);
  const [sortBy,setSortby]=useState(true);

  let sortedEpisodes;

  if(sortBy){
    sortedEpisodes=[...item].sort(
      (a,b)=>new Date(a.created)-new Date(b.created)
    );
  }else{
    sortedEpisodes=[...item].sort(
      (a,b)=>new Date(b.created)-new Date(a.created)
    );
  }

  return(
    <div className="list-episodes">
      <header>
        <h1>List Of Episodes:</h1>   
        <IoMdArrowDown
         className="icon" 
         size={30}
         onClick={()=>setSortby(pre=>!pre)}
         style={{
          rotate:sortBy? "0deg":"180deg",
          transition:"0.3s ease-out"
         }}
         /> 
      </header>
      <ul className="listepisodes-info">
        {
          sortedEpisodes.map((epi,index)=>(
            <li key={epi.id}>
              <div className="episodes-title">
                <span>{String(index+1).padStart(2,"0")} - {epi.episode}:</span>
                <strong>{epi.name}</strong>
              </div>
              <div className="episodes-date">
                {epi.air_date}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}