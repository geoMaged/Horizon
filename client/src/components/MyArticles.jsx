import React, { useEffect,useState } from "react";
import axios from 'axios';
import ArticleCard from './ArticleCard';

function MyArticles(){

    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        axios.get('/myarticles',{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response =>{
            console.log(response.data.myArticles);
            setArticles(response.data.myArticles);
        })
    },[])
    return(
        <div>
            <h1>My Articles</h1>
            {
                articles.map(article => {
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
export default MyArticles;