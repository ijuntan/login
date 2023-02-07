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

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(0)
    const [alertText, setAlertText] = useState('')
    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {jwt, setJwt} = useContext(MainContext)
    const history = useNavigate()

    const alertToggleError = async (msg) => {
        setAlertText(msg)
        setShowAlert(1)
    }

    const alertToggleSuccess = async () => {
        setAlertText("Sign up successful")
        setShowAlert(2)
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
            const response = await AuthService.signup(user)
            alertToggleSuccess()
        }
        catch(error) {
            //console.log('err: ', error.response.data.error)
            alertToggleError(error.response.data.error)
        }
        
    }
    
    useEffect(() => {
        if(jwt || jwt !== '') {
            return history('/dash')
        }
    }, [jwt, history, setJwt])

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
                        Sign up
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
                     autoComplete
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
                     autoComplete = "new-password"
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
                </Grid>
                
                <Grid item>
                    {
                        showAlert?
                        <Alert severity= {showAlert == 1 ? "error" : "success"} sx = {{minWidth:'18vw'}}> 
                            {alertText}
                        </Alert>
                        : null
                    }
                </Grid>

                <Grid item>
                    <Button onClick = { e => handleSubmit(e)}>
                        Sign up
                    </Button>
                </Grid>
                <Grid item>
                    <Link to = '/login' style={{ textDecoration: 'none' }}>
                        <Typography variant = 'h8' sx = {{ color:'gray'}}>
                            Already have an account? Sign in here
                        </Typography>
                    </Link>
                </Grid>
                
            </Grid>
            
        </>
    )
}

export default Signup
