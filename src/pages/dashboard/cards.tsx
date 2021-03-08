import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Grid, Container, styled, Button, Box } from "@material-ui/core";
import firebase from '../../firebase/firebase';

export const Cards = (): JSX.Element => {
    const appTheme = useSelector((state: RootState) => state.app.appTheme);
    React.useEffect(() => {
        return () => {
        }
    }, [])
    const MyPaper = styled(Paper)({
        position: 'relative',
        width: '100%',
        height: '10rem',
        backgroundColor: appTheme ? 'grey' : 'white',
        '&:hover': {
            backgroundColor: appTheme ? 'grey' : 'white',
        }
    })

    const MyPaper2 = styled(Paper)({
        width: '100%',
        height: '20rem',
        backgroundColor: appTheme ? 'grey' : 'white',
        '&:hover': {
            backgroundColor: appTheme ? 'grey' : 'white',
        }
    })

    const HoverPaper = styled(Paper)({
        position: 'absolute',
        width: '35%',
        height: '50%',
        bottom: '100px',
        left: '15px',
        backgroundColor: appTheme ? 'white' : 'grey',
        '&:hover': {
            backgroundColor: appTheme ? 'white' : 'grey',
        }
    })

    return (
        <Container>
            <Box height={20} />
            <Grid container spacing={4} justify="center">
                <Grid item lg={3} xs={10}>
                    <MyPaper elevation={1}>
                        <HoverPaper></HoverPaper>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper></HoverPaper>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper></HoverPaper>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper></HoverPaper>
                    </MyPaper>
                </Grid>
            </Grid>
            <Box height={50}/>
            <Grid container spacing={5}>
                <Grid item lg={9} xs={9}>
                    <MyPaper2></MyPaper2>
                </Grid>
                <Grid item lg={3} xs={9}>
                    <MyPaper2></MyPaper2>
                </Grid>
            </Grid>
        </Container>
    );
}