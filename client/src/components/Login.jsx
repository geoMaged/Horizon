import React, { useState,useContext } from 'react';
import {UserContext} from './UserContext';
import Input from './Input';
import img from '../images/login.jpg';
import axios from 'axios';
import Heading from './Heading';
import {Link, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

function Login(props){

    const {dispatch} = useContext(UserContext);
    const [userData,setUserData] = useState({
        email:'',
        password:''
    });

    const[isHome,setIsHome] = useState(false);
    const [wrongPassword,setWrongPassword]= useState(false);
    const[notFound,setNotFound]=useState(false);

    const responseGoogle = (response) => {
        console.log(response);
      } 

    function editUser(event){

         const {name,value}=event;
        setUserData(prevValue => {
            return {
                ...prevValue,
                [name]:value
            }
        });
    }

    // function loginGoogle(event){
    //     axios.get('http://localhost:3001/auth/google')
    //         .then(response => {
    //             console.log(response);
    //         })
    // }

    function handleClick(event){
        axios.post('/login',userData)
        .then(response => {
           // console.log(response.data);
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
                setIsHome(true);
            }else if(response.data.page === 'Register'){
                setNotFound(true);
            }else{
                setWrongPassword(true);
            }
        })
        .catch(err => {
            console.log(err)
        })
            
    }
        return(
            <div className='container login'>
            {isHome &&  <Redirect to='/home' /> }
            {notFound&& <Redirect to='/register' />}
            <div className='row'>
            <div className='col'>
            <img className='login-img' src={img} alt='typewriter' />
            </div>
            <div className='col right-part col-xs-12'>
            <Heading value='Login'/>
            <form className='login'>
                <div className='form-group'>
                <Input name='email' type='email' placeholder='Email' onEdit={editUser} /><br/>
                <Input name='password' type='password' placeholder='Password' onEdit={editUser} /><br />
                </div>
                <button className='btn btn-dark btn-lg' type='button' onClick={handleClick} >Login</button><br/>
             </form>
             {
                wrongPassword ? <p className='form-paragraph'>Wrong Username or Password</p>:null
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
                    /> */}
                <Link to='/register'><p className='signIn-paragraph' >Register here!</p></Link>
   
            </div>
            </div>
            </div>
        )
    }

export default Login;