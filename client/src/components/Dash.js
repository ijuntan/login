import React, { useContext, useState, useEffect } from 'react'
import {
    Grid,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Divider
} from '@mui/material'
import {
    Abc
} from '@mui/icons-material'
import { MainContext } from '../MainContext'
import AuthService from '../services/authService'
import { useNavigate } from 'react-router-dom'
import HeaderDash from './HeaderDash'

const Dash = () => {
    const {jwt, setJwt} = useContext(MainContext)
    const [parsed, setParsed] = useState('')
    const history = useNavigate()

    const logout = () => {
        AuthService.logout()
        setJwt('')
        return history('/')
    }
    
    useEffect(() => {
        try {
            return setParsed(JSON.parse(atob(jwt.split('.')[1])))
        }
        catch(err) {
            AuthService.logout()
            setJwt('')
            return history('/')
        }
    }, [jwt, history, setJwt])

    return(
        <>
        <header>
            <HeaderDash/>
        </header>
        <Drawer 
            sx = {{
            '& .MuiDrawer-paper': {
            width: '20vw'
          }}} 
          variant = "permanent" anchor = "left"
        >
            <Box>
                <Typography variant = "h2" sx ={{paddingTop: '3vh', paddingBottom: '2vh'}}>
                    Surat Kita
                </Typography>
                <Divider/>
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Abc/>
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Box>
        </Drawer>
        <Grid 
             sx = {{paddingTop: '15vh'}}
             container rowSpacing = {2} 
             direction = "column" 
             justifyContent="center" 
             alignItems = "center"
        >
            <Grid item>
                <Typography variant = "h2">
                    Dashboard page
                </Typography>
            </Grid>

            {/* <Grid item sx = {{minWidth:'30vw'}}>
                <pre>
                <Typography variant = "h8">
                    {JSON.stringify(parsed, null, 2)}
                </Typography>
                </pre>
            </Grid> */}

            <Grid item>
                <Button color = "error" onClick = {logout}>
                    <Typography>
                        Logout
                    </Typography>
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default Dash
