import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import { Addnote } from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
    const context = useContext(noteContext);
    const {note,addNote} = context;
  return (
    <>
    <Addnote/>
    <div className="row my-4">
    <h1>Your Note</h1>
    <p>{note.map((note)=>{
        return <Noteitem key={note._id} note={note}/>;
    })}</p>
    </div>
    </>
  )
}

export default Notes