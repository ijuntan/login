import axios from 'axios'

const API_URL = "http://localhost:8080/api/v1/user/"

const AuthService = {
    signup(cred) {
        return axios.post(`${API_URL}signup`, cred)
    },
    login(cred){
        return axios.post(`${API_URL}login`, cred)
    },
    logout(){
        return localStorage.removeItem('token')
    },
    getCurrentUser(){
        return JSON.parse(localStorage.getItem('token'))
    }
}

export default AuthService