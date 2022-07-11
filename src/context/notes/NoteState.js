import React,{useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const noteInitial = [
        {
          "_id": "62c6d4a41a88d67efa4a8def",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def6",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def5",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def4",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def3",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def2",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
        {
          "_id": "62c6d4a41a88d67efa4a8def1",
          "user": "62c6930c73f5419a7e902cc6",
          "title": "My title",
          "description": "Wake up at 9 AM",
          "tags": "General",
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        },
      ]
      const [note, setNote] = useState(noteInitial)

      // Add a note
      const addNote = (title,description,tags)=>{
        console.log("Adding a new note")
        let notes ={
          "_id": "62c6d4a41a88d67efa4a8def12",
          "user": "62c6930c73f5419a7e902cc6",
          "title": title,
          "description": description,
          "tags": tags,
          "date": "2022-07-07T12:42:12.527Z",
          "__v": 0
        };
        setNote(note.concat(notes))
      }
      // delete a note
      const deleteNote = (id)=>{
        console.log("Deleting the note of id= "+ id);

        const newNote = note.filter((note)=>{ return note._id !== id})
        setNote(newNote)
      }
      // edit a note
      const editNote = (id,title,description,tags)=>{

      }

    return(
        <noteContext.Provider value={{note,addNote,deleteNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;