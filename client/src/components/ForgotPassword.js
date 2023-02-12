import React, { useState } from 'react'
import {
    Card,
    Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'
import AuthService from '../services/authService'


const ForgotPassword = () => {
    const [username, setUsername] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AuthService.forgotpassword({username})
        }
        catch(err) {
            console.log('err: ', err.response.data.error)
        }
    }
    
    return (
        <>
            <Grid
                sx = {{paddingTop: '15vh', minWidth: '100vw'}}
                container rowSpacing = {2} 
                direction = "column" 
                justifyContent = "center" 
                alignItems = "center"
            >
                <Card sx = {{minHeight: '10vh', width: '50%', paddingBottom: '5vh', paddingTop: '5vh'}}>
                    <Grid container rowSpacing = {2} direction = "column">
                        <Grid item sx = {{paddingBottom: '10px'}}>
                            <Typography variant = 'h3'>
                                Forgot Password
                            </Typography>
                        </Grid>

                        <Grid item sx = {{paddingLeft: '5vw', paddingRight: '5vw'}}>
                            <Typography variant = 'h8' 
                            sx = {{color: '#28282B'}}
                            >
                                Don't worry, we've got you covered. Click here to reset your password and regain access to your account.
                            </Typography>
                        </Grid>

                        <Grid item>
                            <TextField
                            sx = {{minWidth: '20vw'}}
                            label = "Email"
                            type = "email"
                            name = "email"
                            variant = "filled"
                            value = {username}
                            onChange = { (e) => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item>
                            <Button variant = "contained" onClick = { (e) => handleSubmit(e)}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </>
    )
}

export default ForgotPassword