import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import axios from 'axios'

function Article() {
  let { id } = useParams()
  const [article, setArticle] = useState({
    title: '',
    content: '',
    id: id,
  })
  const [bookmark, setBookmark] = useState(false)
  const [isMyArticle, setIsMyArticle] = useState(false)
  const [isDelete, setDelete] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/articles/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const articleTitle = response.data.article.title
        const articleContent = response.data.article.content
        const isBookmark = response.data.bookmark
        const authorEmail = response.data.authorEmail
        setIsMyArticle(
          localStorage.getItem('email') === authorEmail ? true : false
        )
        setArticle((prevValue) => ({
          title: articleTitle,
          content: articleContent,
        }))
        console.log(article)
        setBookmark(isBookmark)
      })
      .catch((err) => console.log(err))
  }, [bookmark])

  function handleClick(e) {
    e.preventDefault()
    if (bookmark) {
      axios
        .delete('/api/articles/bookmark', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            article: id,
          },
        })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .post(
          '/api/articles/bookmark',
          { article: id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((err) => console.log(err))
    }
    setBookmark(!bookmark)
  }

  function handleDelete(e) {
    e.preventDefault()
    axios
      .delete('/api/articles/', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          article: id,
        },
      })
      .then((response) => {
        //console.log(response);
        setDelete(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='article'>
      {isDelete && <Redirect to='/home' />}
      <button className='bookmark-btn btn btn-dark' onClick={handleClick}>
        {bookmark ? (
          <i className='fas fa-bookmark'></i>
        ) : (
          <i className='far fa-bookmark'></i>
        )}
        {bookmark ? ' Bookmarked' : ' Add to Bookmarks'}
      </button>
      {isMyArticle ? (
        <Link to={{ pathname: '/editarticle', state: { article, id } }}>
          {' '}
          <button className='bookmark-btn btn btn-dark'>
            <i className='fas fa-edit'> </i> Edit article
          </button>{' '}
        </Link>
      ) : null}
      {isMyArticle ? (
        <button className='bookmark-btn btn btn-dark' onClick={handleDelete}>
          <i className='fas fa-trash-alt'></i> Delete article
        </button>
      ) : null}
      <h1 className='article-title'>{article.title}</h1>
      <p className='article-paragraph'>{article.content}</p>
    </div>
  )
}

export default Article
