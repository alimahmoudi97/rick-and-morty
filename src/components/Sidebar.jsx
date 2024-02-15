import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Sidebar({data,handleSelectCharacter,selectCharacter}) {

  return (
    <div className="sidebar">
        {
          data.map((item)=>
          <Character
           key={item.id} 
           character={item}
           onSelectCharacter={handleSelectCharacter}
           >
            <div className="icon-character" onClick={()=>handleSelectCharacter(item.id)}>
              {selectCharacter !==item.id ?
              <FaRegEye className="icon" size={30}/>
              :<FaEyeSlash className="icon" size={30}/>
              }
            </div>
          </Character>
        )
        }
    </div>
  )
}

export default Sidebar

export function Character({character,children}){
  return(
    <div className="character">
        <div className="picture-character">
          <img src={character.image}/>
        </div>
        <div className="info-character">
          <h3>{character.gender=="Male"?"👨":"👩‍🦰"} {character.name}</h3>
          <div>
            <span className="status"/>
            <span>
              &nbsp;{character.status} - {character.species}
            </span>
          </div>
        </div>
        {
          children
        }
    </div>
  )
}