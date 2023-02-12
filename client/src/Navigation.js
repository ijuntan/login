import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Dash from './components/Dash'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { Routes, Route } from 'react-router-dom'
import { MainContextProvider } from './MainContext'
import AuthComponent from './services/authComponent'

export default function Navigation() {
    return(
        <MainContextProvider>
            <Routes>
                <Route path = '/' exact element = { <Login/> } />
                <Route path = '/login' element = { <Login/> } />
                <Route path = '/signup' element = { <Signup/> } />
                <Route path = '/forgotpassword' element = { <ForgotPassword/> } />
                <Route path = '/resetpassword' element = { <ResetPassword/> } />
                <Route path = '/dash' element = { 
                    <AuthComponent>
                        <Dash/>
                    </AuthComponent>
                } />
            </Routes>
        </MainContextProvider>
        
    )
}