import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Article(){

    let {id} =useParams();
    const [article,setArticle] = useState({
        title:'',
        content:''
    });
    const [bookmark,setBookmark] = useState(false);
    axios.get(`/articles/view/${id}`,{
        headers:{
            'authorization':`Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response =>{
         const articleTitle = response.data.article.title;
         const articleContent=response.data.article.content;
         const isBookmark = response.data.bookmark;
         setArticle({
             title: articleTitle,
             content:articleContent
         });
         setBookmark(isBookmark);
    })
    .catch(err => console.log(err));

    function handleClick(e){
        e.preventDefault();
        if(bookmark){
            axios.post('/removeBookmark',{article:id},{
                headers:{
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response);
                
            })
        }else{
            axios.post('/addBookmark',{article:id},{
                headers:{
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response);
            })
        }
       
    }
    return(
        <div className='article' >
            <button className='bookmark-btn btn btn-dark' onClick={handleClick}>{bookmark ? <i className="fas fa-bookmark">Bookmarked</i>:<i className="far fa-bookmark">Add To Bookmarks</i>}</button>
            <h1 className='article-title'>{article.title}</h1>
            <p className='article-paragraph'>{article.content}</p>
            
        </div> 
    )
}

export default Article;