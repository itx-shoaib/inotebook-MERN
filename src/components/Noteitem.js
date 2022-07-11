import React, { useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context
    const { note } = props;

    const handleClick = ()=>{
        deleteNote(note._id)
    }
    return (
        <div className="col-md-3">
            <div className="card shadow bg-white rounded m-2">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">Description:</p>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-pen-to-square "></i>
                        <i className="fa-solid fa-trash mx-3" onClick={handleClick}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem