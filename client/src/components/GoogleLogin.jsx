import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


function GoogleLogin(){

    const responseGoogle = (response) => {
        console.log(response);
      }

      return(
          
        <GoogleLogin
        clientId='240788499799-q9fci6hcl175bd1j3bmve0fld09opk57.apps.googleusercontent.com'
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      )
    
}

export default GoogleLogin;