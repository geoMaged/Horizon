import React, { useState } from "react";

function TextArea(props){

    const [articleText,setArticleText] = useState(props.value);

    function handleChange(event){
        const text = event.target.value;
        setArticleText(text);
        props.onEdit(event.target);
    }


    return(
        <textarea 
        className='form-control form-control-lg article'
        name={props.name}
        rows='20'
        onChange={handleChange}
        value={articleText}>
        </textarea>
    )
    
}

export default TextArea;