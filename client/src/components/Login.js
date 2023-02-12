import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import {
    Button, 
    TextField, 
    InputAdornment, 
    IconButton, 
    Unstable_Grid2 as Grid, 
    Typography,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState('')
    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {jwt, setJwt} = useContext(MainContext)
    const history = useNavigate()

    const alertToggle = async (msg) => {
        setAlertText(msg)
        setShowAlert(true)
    }

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = {
                username,
                password
            }
            const response = await AuthService.login(user)
            const { token } = response.data
            localStorage.setItem('token', token)
            setJwt(token)
            history('/dash')
        }
        catch(error) {
            //console.log('err: ', error.response.data.error)
            alertToggle(error.response.data.error)
        }
        
    }
    
    useEffect(() => {
        if(jwt || jwt !== '') {
            return history('/dash')
        }
    }, [jwt, history])

    return(
        <>
            <Grid 
             sx = {{paddingTop: '15vh'}}
             container rowSpacing = {2} 
             direction = "column" 
             justifyContent="center" 
             alignItems = "center"
            >
                <Grid item>
                    <Typography variant = 'h2'>
                        Login
                    </Typography>
                </Grid>

                <Grid item>
                    <TextField
                     sx = {{minWidth: '20vw'}}
                     label = "Username"
                     type = "username"
                     name = "username"
                     value = {username ? username: null}
                     onChange = { (e) => handleChange(e)}
                     variant = "filled"
                    />
                </Grid>
                
                <Grid item>
                    <TextField
                     sx = {{minWidth: '20vw'}}
                     label = "Password"
                     type = {showPassword ? 'text' : 'password'}
                     name = "password"
                     value = {password ? password: null}
                     variant = "filled"
                     onChange = { (e) => handleChange(e)}
                     InputProps = {{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label = "toggle password visibility"
                                    onClick = {handleClickShowPassword}
                                    edge = "end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    />

                    <Grid item container justifyContent="flex-start" rowSpacing={1}>
                        <Link to = '/forgotpassword' style={{ textDecoration: 'none', left: '0px' }}>
                            <Typography variant = 'h8' sx = {{ color:'gray'}}>
                                Forgot Password?
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                
                <Grid item>
                    {
                        showAlert?

                        <Alert severity="error" sx = {{minWidth:'18vw'}}> 
                            {alertText}
                        </Alert>
                        : null
                    }
                </Grid>

                <Grid item>
                    <Button onClick = { e => handleSubmit(e)}>
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Link to = '/signup' style={{ textDecoration: 'none' }}>
                        <Typography variant = 'h8' sx = {{ color:'gray'}}>
                            Don't have an account? Sign up here
                        </Typography>
                    </Link>
                </Grid>
                
            </Grid>
            
        </>
    )
}

export default Login
