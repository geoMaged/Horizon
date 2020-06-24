import React,{useContext} from 'react';
import avatar from '../images/avatar.png';
import {UserContext} from './UserContext';
import {Link} from 'react-router-dom';

function DropdownList(){

    const email = localStorage.getItem('email');
    console.log(email);
    const {dispatch} = useContext(UserContext);
    function handleClick(){
        dispatch({
            type:'LOGOUT'
        })
    }
    return(
        <div className="dropdown show">
  <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <img src={avatar} alt='avatar' className='avatar' />
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link className="dropdown-item" to="/home">Home</Link>
    <Link className="dropdown-item" to={{
                pathname:'/author',
                search: 'email=' +email
            }}>View my profile</Link>
    <Link className="dropdown-item" to="/bookmarks">View Bookmarks</Link>
    <Link className="dropdown-item" to="/myarticles">View my Articles</Link>
    <Link className="dropdown-item" to="/" onClick={handleClick}>Logout</Link>
  </div>
</div>
    )
}

export default DropdownList;