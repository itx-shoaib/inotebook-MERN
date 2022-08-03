import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

export const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;


    const [note, setnote] = useState({title: "", description: "", tags: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tags)

    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
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
                            id="description"
                            name="description"
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
                            id="tags"
                            name="tags"
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
