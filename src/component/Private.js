import React from 'react'
import { useContext } from 'react'
import { Route,Redirect } from 'react-router'
import AuthContext from './AuthContext'
const Private = ({children,...rest}) => {
    console.warn('privteRoute')
    const {user} =useContext(AuthContext)
    return (
           <Route {...rest}>
            {!user ? <Redirect to='/login'/> :children}
           </Route> 
    )
}

export default Private