import React from 'react'
import { 
    AppBar, 
    Button, 
    Container,  
    makeStyles, 
    Toolbar, 
    Typography 
} from "@material-ui/core";

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
        }
    }
));
const Header = () => {
    const classes = useStyle();

    return (
        <>
            <AppBar 
                className={classes.appBar} 
            >
                <Toolbar className={classes.appBarWrapper}>
                    <Typography><span style={{ color:'yellow', fontWeight:'bolder'}}>Our </span><span style={{ color:'black', fontWeight:'bolder'}}>BLOG</span></Typography>
                    <Container>
                        <Button className={classes.button} color="inherit">Our Story</Button>
                        <Button className={classes.button} color="inherit">Membership</Button>
                        <Button className={classes.button} color="inherit">Write</Button>
                        <Button className={classes.button} color="inherit">Signin</Button>
                        <Button className={classes.button} color="inherit">Get started</Button>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header