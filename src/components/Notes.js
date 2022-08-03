import React, { useContext, useEffect, useRef  , useState} from "react";
import noteContext from "../context/notes/noteContext";
import { Addnote } from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { note, getNote, editNote } = context;

  useEffect(() => {
    getNote();
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [notes, setnotes] = useState({id:"",etitle: "", edescription: "", etags: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setnotes({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etags:currentNote.tags})
  }

  const handleClick = (e) => {
    console.log("Updating the note.....",notes)
    editNote(notes.id,notes.etitle,notes.edescription,notes.etags)
    refClose.current.click();
}

const onChange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <Addnote />

      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit a Note</h5>
            </div>
            <div class="modal-body">
            <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="etitle"
                            name="etitle"
                            value={notes.etitle}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="edescription"
                            name="edescription"
                            value={notes.edescription}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="etags"
                            name="etags"
                            value={notes.etags}
                            onChange={onChange}
                        />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h1>Your Note</h1>
        <p>{note.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
        })}</p>
      </div>
    </>
  )
}

export default Notes