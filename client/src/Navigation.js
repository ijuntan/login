import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Dash from './components/Dash'
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
                <Route path = '/dash' element = { 
                    <AuthComponent>
                        <Dash/>
                    </AuthComponent>
                } />
            </Routes>
        </MainContextProvider>
        
    )
}