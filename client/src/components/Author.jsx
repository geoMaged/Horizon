import React, { useEffect,useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import ArticleCard from './ArticleCard';


function Author({location}){    //location to get query parameters
    

   const data = qs.parse(location.search,{ignoreQueryPrefix:true});
     
    const[articles,setArticles] = useState([]);
    const[author,setAuthor] = useState('');
    const email = data.email;
    useEffect(()=>{
        axios.get('http://localhost:3001/author?email='+email,{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=>{
            console.log(response.data);
            const authorArticles=response.data.articles;
            setArticles(authorArticles);
            const receivedAuthor=response.data.name;
            setAuthor(receivedAuthor);
        })
    },[email])
    return(
        <div>
           <h1>{author}</h1>
           {
               articles.map(article =>{
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
               })
           }
        </div>
    )
}

export default Author;