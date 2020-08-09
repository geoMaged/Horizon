import React from 'react'
import { Link } from 'react-router-dom'

function ArticleCard(props) {
  //console.log(props.email);
  return (
    <div className='article-card card'>
      <Link
        key={props.id}
        style={{ textDecoration: 'none' }}
        to={`/articles/${props.id}`}
      >
        <div className='card-body'>
          <h1 className='article-card-text' style={{ fontSize: '2rem' }}>
            {props.title}
          </h1>
          <p className='article-card-text'>{props.content}</p>
        </div>
      </Link>
      <div className='flex-container card-body'>
        <Link
          style={{ textDecoration: 'none' }}
          to={{
            pathname: '/author',
            search: 'email=' + props.email,
          }}
        >
          <div className='avatarCircle'>
            {' '}
            <span className='avatarCircle-letter'>
              {props.authorName.substring(0, 1)}
            </span>
          </div>
        </Link>
        <p className='author-card'>
          {' '}
          Author: {props.authorName} <br /> Date: {props.date}
        </p>
      </div>
    </div>
  )
}

export default ArticleCard
