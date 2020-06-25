import React, { useState, useContext} from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Heading from './Heading';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {UserContext} from './UserContext';

function CreateArticle(){

    const {state} = useContext(UserContext);
    const [article,setArticle] = useState({
        title: '',
        content:''
        });

    function handleClick(){
        
        console.log(state);
        axios.post('/article',article,{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response =>{
                console.log(response);
            })
    }

    function editArticle(event){
        
        const {name,value} = event;
        setArticle( prevValue => {
            return(
                {
                    ...prevValue,
                    [name]:value
                }
            )
        });
    }


    return (
        <div>
            <Heading value='Be Creative' />
            <Input name='title' type='text' placeholder='Title' onEdit={editArticle}/><br/>
            <TextArea name='content' onEdit={editArticle}/>
            <Link to='/home' >
                <button className='btn btn-lg btn-dark' onClick={handleClick}>Add Article</button>
            </Link>
        </div>
    )
}

export default CreateArticle;
