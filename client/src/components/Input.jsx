import React,{useState} from 'react';

function Input(props){
    const [inputText,setInputText] = useState('');
    function handleChange(event){
        const value=event.target.value;
        setInputText(value);
        props.onEdit(event.target);
        //console.log(inputText)
    }
    return(
     <input className='form-control-lg form-control login'
     type={props.type} 
     name={props.name} 
     onChange={handleChange} 
     value={inputText} 
     placeholder={props.placeholder}
     aria-describedby='inputGroup-sizing-lg'
     autoComplete='off'
     required
     />
    )
}

export default Input;