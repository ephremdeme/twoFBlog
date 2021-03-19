import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Paper, Grid, Container, styled, Button, Box, Typography } from "@material-ui/core";
import firebase from '../../firebase/firebase';
import { ReactComponent as Dashboard_Icon_Web_Visit } from "public/icons/dashboard/icons8_web_visit.svg";
import { ReactComponent as Dashboard_Icon_Web_Blog } from "public/icons/dashboard/icons8_blog.svg";
import { ReactComponent as Dashboard_Icon_Web_Shooping } from "public/icons/dashboard/icons8_shopping_cart.svg";
import { ReactComponent as Dashboard_Icon_Web_Users } from "public/icons/dashboard/icons8_users.svg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Cards = (): JSX.Element => {
    const appTheme = useSelector((state: RootState) => state.app.appTheme);
    React.useEffect(() => {
        return () => {
        }
    }, [])
    const MyPaper = styled(Paper)({
        position: 'relative',
        width: '100%',
        height: '8rem',
        backgroundColor: appTheme ? 'white' : 'white',
        '&:hover': {
            backgroundColor: appTheme ? 'white' : 'white',
        },
        display: 'flex',
        justifyContent: 'flex-end'
    })

    const MyPaper2 = styled(Paper)({
        width: '100%',
        height: '20rem',
        backgroundColor: appTheme ? 'white' : 'white',
        '&:hover': {
            backgroundColor: appTheme ? 'white' : 'white',
        },
        padding: '20px'
    })

    const HoverPaper = styled(Paper)({
        position: 'absolute',
        width: '45%',
        height: '70%',
        bottom: '60px',
        left: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme ? 'white' : 'white',
        '&:hover': {
            backgroundColor: appTheme ? 'white' : 'white',
        },
        // boxShadow: '2px 2px 10px',
        border: 'none'
    })

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <Container>
            <Box height={20} />
            <Grid container spacing={4} justify="center">
                <Grid item lg={3} xs={10}>
                    <MyPaper elevation={1}>
                        <HoverPaper style={{backgroundColor: '#F99028'}} elevation={10}>
                            <Dashboard_Icon_Web_Users />
                        </HoverPaper>
                        <Box width="45%" py={2}>
                            <Typography>Total Users</Typography>
                            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>20</Typography>
                        </Box>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper style={{backgroundColor: '#E84848'}} elevation={10}>
                            <Dashboard_Icon_Web_Shooping />
                        </HoverPaper>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper style={{backgroundColor: '#5AAF5E'}} elevation={10}>
                            <Dashboard_Icon_Web_Blog />
                        </HoverPaper>
                    </MyPaper>
                </Grid>
                <Grid item lg={3} xs={10}>
                    <MyPaper>
                        <HoverPaper style={{backgroundColor: '#2CBECF'}} elevation={10}>
                            <Dashboard_Icon_Web_Visit />
                        </HoverPaper>
                    </MyPaper>
                </Grid>
            </Grid>
            <Box height={50} />
            <Grid container spacing={5}>
                <Grid item lg={9} xs={9}>
                    <MyPaper2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </MyPaper2>
                </Grid>
                <Grid item lg={3} xs={9}>
                    <MyPaper2></MyPaper2>
                </Grid>
            </Grid>
        </Container>
    );
}