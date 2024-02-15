import { GoXCircleFill } from "react-icons/go";

function Modal({children,isOpen,onOpen,title}) {
  if(!isOpen) return null;
  return (
    <div>
        <div className="backdrop" onClick={()=>onOpen(false)}></div>
        <div className="modal">
            <div className="modal_header">
                <h2 className="title">{title}</h2>
                <button onClick={()=>{onOpen(false);console.log("clicked")}}>
                    <GoXCircleFill className="icon red"/>
                </button>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal