import { IoMdHeartEmpty } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import Modal from "./Modal";
import { useState } from "react";
import { Character } from "./Sidebar";

function Navbar({character,favourites,onDeleteFavourite,children}) {
  return (
    <nav className="nav-container">
        <div className="logo">
             logo 😊
        </div>  
        {children}
        <div className="character-no">
             number {character.length} of charachters 
        </div>
        <Favourites>
          {
            favourites.map(item=>
            <Character key={item.id} character={item}>
                <FaTrashCan
                 className="icon red"
                 onClick={()=>onDeleteFavourite(item.id)}
                 />
            </Character>
            )
          }
     
        </Favourites>
     </nav>
  )
}

export default Navbar

export function Search({setQuery}){
  
  return(
    <div className="search-input">
         <input 
          type='text' 
          placeholder='Search...' 
          onChange={e=>setQuery(()=>e.target.value)}/>
    </div>
  )
}

function Favourites({children}){
  const[isOpen,onOpen]=useState(false);

  return(
      <>
        <Modal isOpen={isOpen} onOpen={onOpen} title="Favourites">
          {
            children
          }
        </Modal>
        <div className="favourites">
          <IoMdHeartEmpty
           className="favourites-icon"
            size={40}
            onClick={()=>onOpen(true)}
          />
          <span className="favourites-no">
            {
              children.length
            }
          </span>
        </div>
      </>
  )
}