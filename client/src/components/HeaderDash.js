import React from 'react'
import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';

import {
    AccountCircle as Account
} from '@mui/icons-material'

const HeaderDash = () => {
    return(
        <>
            <AppBar position = "static"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CssBaseline/>
                <Toolbar>
                    <Typography sx = {{flexGrow: 1}}/>
                    <IconButton size = "large" edge = "right" color = "inherit">
                        <Account/>
                    </IconButton>    
                </Toolbar>
            </AppBar>        
        </>
    )
}

export default HeaderDash