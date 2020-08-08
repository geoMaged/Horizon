import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropdownList from './DropdownList'

function Nav() {
  const [screensize, setScreensize] = useState(window.innerWidth)

  const handleResize = () => {
    setScreensize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', () => handleResize)
  }, [window.innerWidth])

  return (
    <nav>
      <Link to='/home' style={{ textDecoration: 'none' }} className='nav-item'>
        <h1 className='nav-item'>Horizon</h1>
      </Link>
      {screensize >= 600 ? (
        <ul className='nav-item nav-item-list'>
          <Link to='/about' className='nav-list-item'>
            <li>About</li>
          </Link>
          <Link to='/createArticle' className='nav-list-item'>
            <li>Create an article</li>
          </Link>
        </ul>
      ) : (
        <div></div>
      )}

      <DropdownList className='nav-list-item' />
    </nav>
  )
}

export default Nav
