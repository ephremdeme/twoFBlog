import React from 'react'
import {
    AppBar,
    Button,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyle = makeStyles((theme: any) => (
    {
        appBar: {
            background: 'none',
            position: 'sticky'
        },
        button: {
            // flexGrow:1
        },
        appBarPost: {
            flexGrow: 1
        },
        appBarWrapper: {
            width: '85%',
            margin: '0 auto'
        },
        linkStyle: {
            textDecoration: 'none'
        }
    }
));

const Header = () => {
    const classes = useStyle();
    const history = useHistory();

    return (
        <>
            <AppBar
                className={classes.appBar}
                elevation={0}
            >
                <Toolbar className={classes.appBarWrapper}>
                    <Button onClick={() => history.goBack()} className={classes.button}><ChevronLeftIcon /></Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header