import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

function Bookmarks(){

    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/bookmarks',{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=>{
            console.log(response.data.bookmarks);
            const bookmarks=response.data.bookmarks;
            setArticles(bookmarks);
        })
    },[])
    return(
        <div>
        <h1>My Bookmarks</h1>
            {articles.map(article=>{
                return(
                    <ArticleCard 
                            key={article._id}
                            id={article._id}
                            title={article.title}
                            content={article.content.substring(0,100)}
                            authorName={article.authorName}
                            date={article.date}
                            email={article.authorEmail}
                        />
                )
            })}
        </div>
    )
}

export default Bookmarks;