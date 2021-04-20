import React from 'react';
import { 
    AppBar,  
    makeStyles, 
    Toolbar, 
    Typography 
} from "@material-ui/core";
// import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useState } from "react";

const useStyle = makeStyles((theme: any) =>(
    {
        appBar: {
            position:'relative',
        },
        button:{
            textTransform:'none'
        },
        appBarPost:{
            flexGrow:1
        },
        appBarWrapper:{
            width:'90%',
            margin:'0 auto'
        },
        list: {
            width: 250,
          },
        fullList: {
            width: 'auto',
        },
        brand: {
            flexGrow:1,
            margin:'auto, 0'
        }
    }
));

const Header = () => {
    const [open, setOpen] = useState(false)

    const classes = useStyle();

    return (
        <>
            <AppBar 
                className={classes.appBar} 
            >
                <Toolbar className={classes.appBarWrapper}>
                    <Typography className={classes.brand}><span style={{ color:'yellow', fontWeight:'bolder'}}>Our </span><span style={{ color:'black', fontWeight:'bolder'}}>BLOG</span></Typography>
                    <IconButton color="inherit" onClick={()=>setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                {/* <Drawer open={open} onClose={() => setOpen(false)}>
fdasfdsafdsa
                </Drawer> */}
            </AppBar>
        </>
    )
}

export default Header