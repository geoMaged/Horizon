import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export const ProtectedRoute = ({component: Component,...rest}) => {

    return(
        <Route 
            {...rest}
            render={props => {
               return localStorage.getItem('token')!==null?
                     <Component {...props} />:
                     <Redirect to={
                        {
                            pathname:'/',
                            state: {
                                from: props.location
                            },
                        }
                    } />
            }}
        />
    )
}