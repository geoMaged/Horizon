import React, { useContext, useState, useEffect } from 'react'
import avatar from '../images/avatar.png'
import { UserContext } from './UserContext'
import { Link } from 'react-router-dom'

function DropdownList() {
  const [screensize, setScreensize] = useState(window.innerWidth)

  const handleResize = () => {
    setScreensize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', () => handleResize)
  }, [window.innerWidth])

  const email = localStorage.getItem('email')
  console.log(email)
  const { dispatch } = useContext(UserContext)
  function handleClick() {
    dispatch({
      type: 'LOGOUT',
    })
  }
  return (
    <div className='dropdown show'>
      <button
        className='btn dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <img src={avatar} alt='avatar' className='avatar' />
      </button>
      <div
        className='dropdown-menu dropdown-menu-right'
        aria-labelledby='dropdownMenuButton'
      >
        <Link className='dropdown-item' to='/home'>
          Home
        </Link>
        <Link
          className='dropdown-item'
          to={{
            pathname: '/author',
            search: 'email=' + email,
          }}
        >
          View my profile
        </Link>
        <Link className='dropdown-item' to='/bookmarks'>
          View Bookmarks
        </Link>
        <Link className='dropdown-item' to='/myarticles'>
          View my Articles
        </Link>
        {screensize >= 600 ? (
          <div></div>
        ) : (
          <div>
            <Link className='dropdown-item' to='/about'>
              About
            </Link>
            <Link className='dropdown-item' to='/createArticle'>
              Create an Article
            </Link>
          </div>
        )}
        <Link className='dropdown-item' to='/' onClick={handleClick}>
          Logout
        </Link>
      </div>
    </div>
  )
}

export default DropdownList
