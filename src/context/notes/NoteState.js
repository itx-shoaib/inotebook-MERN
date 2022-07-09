import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name":"Shoaib",
        "class":"CS"
    }
    const [state,setState] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setState({
            "name":"Shoaib Jamil",
            "class":"CS-4"
            })
        },1000)
    }
    return(
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;