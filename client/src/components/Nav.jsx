import React from 'react';
import {Link} from 'react-router-dom';
import DropdownList from './DropdownList';

function Nav(){

    
    return(
        <nav>
            <Link to='/home' style={{textDecoration:'none'}} className='nav-item' ><h1 className='nav-item'>Horizon</h1></Link>
            <ul className='nav-item'>
                <Link to='/about' className='nav-list-item'>
                    <li>About</li>
                </Link>
                <Link to='/createArticle' className='nav-list-item'>
                    <li>Create an article</li>
                </Link>
            </ul>
            <DropdownList />
        </nav>
    )
}

export default Nav;