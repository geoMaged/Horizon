import React, { useState, useContext } from 'react';
import Input from './Input';
import img from '../images/login.jpg';
import axios from 'axios';
import Heading from './Heading';
import {Link,Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { UserContext } from './UserContext';

function Register(props){


    const {dispatch} = useContext(UserContext);
    const [userData,setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [isHome,setIsHome] = useState(false);
    const [existingEmail,setExistingEmail] = useState(false);

    const responseGoogle = (response) => {
        const userData = response.profileObj;
        axios.post('http://localhost:3001/googleAuth',userData)
         .then(response => {
             console.log(response);
         })
      } 

    function editUser(update){

        const {name,value} = update; 

        setUserData(prevValue => {
            return {
                ...prevValue,
                [name]:value
            } 
            });
    }

    function handleClick(){

        console.log(userData);
        axios.post('http://localhost:3001/register',userData)
        .then(response => {
            console.log(response);
            const newUser={
                name:response.data.name,
                token:response.data.accessToken,
                email:response.data.email
            }
            dispatch({
                type:'LOGIN',
                payload:newUser
            });
            if(response.data.page === 'Home'){   
                console.log('HEY ')             
                setIsHome(true);
            }else{
                setExistingEmail(true);
            }
        })
        .catch(err => {
            console.log(err)
        })
            
    }
    
        return(
            <div className='container login'>
             {isHome &&  <Redirect to='/home' /> }
            <div className='row'>
            <div className='col'>
            <img className='login-img' src={img} alt='typewriter' />
            </div>
            <div className='col right-part col-xs-12'>
            <Heading value='Register' />
            <form className='login'>
                <div className='form-group'>
                <Input name='firstName' type='text' placeholder='Enter Your First Name' onEdit={editUser} /><br/>
                <Input name='lastName' type='text' placeholder='Enter Your Last Name' onEdit={editUser}  /><br />
                <Input name='email' type='email' placeholder='Email' onEdit={editUser} /><br/>
                <Input name='password' type='password' placeholder='Password' onEdit={editUser} /><br />
                <button className='btn btn-dark btn-lg' type='button' onClick={handleClick} >Register</button><br/>
                </div>
             </form>
             {
                 existingEmail ? <p className='form-paragraph' >This email already exists!</p> :null
             }
                 {/* <GoogleLogin
                        clientId="240788499799-q9fci6hcl175bd1j3bmve0fld09opk57.apps.googleusercontent.com"
                        render={renderProps => (
                             <button className='btn btn-social btn-google btn-dark btn-lg ' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                             Continue with Google
                             </button>
                        )}
                        buttonText="Login"
                           onSuccess={responseGoogle}
                           onFailure={responseGoogle}
                           cookiePolicy={'single_host_origin'}
                    />     */}
                <Link to='/'><p className='signIn-paragraph' >Sign in!</p></Link>    
            </div>
            </div>
            </div>
        )
    }

export default Register;