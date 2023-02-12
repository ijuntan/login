import React from 'react'
import {
    Card,
    Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'

const ResetPassword = () => {
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
                                    Reset Password
                                </Typography>
                            </Grid>

                            <Grid item sx = {{paddingLeft: '5vw', paddingRight: '5vw'}}>
                                <Typography variant = 'h8' 
                                sx = {{color: '#28282B'}}
                                >
                                    Securely reset your password and regain access to your account
                                </Typography>
                            </Grid>

                            <Grid item>
                                <TextField
                                sx = {{minWidth: '20vw'}}
                                label = "Password"
                                type = "password"
                                name = "password"
                                variant = "filled"
                                />
                            </Grid>

                            <Grid item>
                                <TextField
                                sx = {{minWidth: '20vw'}}
                                label = "Password"
                                type = "password"
                                name = "password"
                                variant = "filled"
                                />
                            </Grid>
                            
                            <Grid item>
                                <Button variant = "contained">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                </Card>
            </Grid>
        </>
    )
}

export default ResetPassword