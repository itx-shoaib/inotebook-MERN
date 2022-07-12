import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const noteInitial = []
  const [note, setNote] = useState(noteInitial)

  // Fetch All notes
  const getNote = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNjkzMGM3M2Y1NDE5YTdlOTAyY2M2In0sImlhdCI6MTY1NzE4NjY0NH0.YStZ2Wd2pDRBqpwb-2JUjWcB9_u7C_zKfbeV7GXZBW0"
      },
    });
    // return response.json();
    const json = await response.json();
    console.log(json);
    setNote(json);
  }

  // Add a note
  const addNote = async (title, description, tags) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNjkzMGM3M2Y1NDE5YTdlOTAyY2M2In0sImlhdCI6MTY1NzE4NjY0NH0.YStZ2Wd2pDRBqpwb-2JUjWcB9_u7C_zKfbeV7GXZBW0"
      },
      body: JSON.stringify({title,description,tags})
    });
    // return response.json();

    console.log("Adding a new note")
    let notes = {
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
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNjkzMGM3M2Y1NDE5YTdlOTAyY2M2In0sImlhdCI6MTY1NzE4NjY0NH0.YStZ2Wd2pDRBqpwb-2JUjWcB9_u7C_zKfbeV7GXZBW0"
      }
    });
    const json = await response.json();
    console.log(json)

    
    console.log("Deleting the note of id= " + id);

    const newNote = note.filter((note) => { return note._id !== id })
    setNote(newNote)
  }
  // edit a note
  const editNote = async (id, title, description, tags) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjNjkzMGM3M2Y1NDE5YTdlOTAyY2M2In0sImlhdCI6MTY1NzE4NjY0NH0.YStZ2Wd2pDRBqpwb-2JUjWcB9_u7C_zKfbeV7GXZBW0"
      },
      body: JSON.stringify({title,description,tags})
    });
    // return response.json();


    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tags = tags;
      }

    }
  }


    return (
      <noteContext.Provider value={{ note, addNote, deleteNote, editNote,getNote }}>
        {props.children}
      </noteContext.Provider>
    )
  }

export default NoteState;