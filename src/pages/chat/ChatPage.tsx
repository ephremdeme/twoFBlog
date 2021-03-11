import React from 'react'
import { Container, Grid, Box } from "@material-ui/core";
import UserCard from "./UserCard";
import UserList from "./UserList";
import ChatArea from "./ChatArea";

export default function ChatPage(): JSX.Element {
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item lg={4}><UserList/></Grid>
                <Grid item lg={8} ><ChatArea/></Grid>
            </Grid>
        </Container>
    )
}
