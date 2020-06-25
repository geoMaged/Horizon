import React,{useState, useEffect} from 'react';
import backgroundImg from '../images/background.jpg';
import ArticleCard from './ArticleCard';
import Testimonial from './Testimonial';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home(){

    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        axios.get('/articles',{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
           //console.log(response.status)
            if(response.status=== 200){
                setArticles(response.data);
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    },[])

    return(
        <div className='home'>
        <img src={backgroundImg} alt='nature' className='background-img' />
        <Link to='/createArticle'>
            <button className='btn btn-outline-dark'>Create an Article</button>
        </Link>
        <div className='viewArticles'>
        <h1 className='home-title'>Recent Articles</h1>
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
        {/* <ArticleCard /> */}
        </div>
        <Testimonial />
        </div>
    )
}

export default Home;