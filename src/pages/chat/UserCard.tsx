import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { Badge, styled, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
            marginBottom: "10px"
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

const Online = styled(FiberManualRecord)({
    color: '#63F700'
})

export default function UserCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader

                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                }
                action={
                    <IconButton>
                        <Badge badgeContent={4} color="secondary">
                            <Online />
                        </Badge>
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
        </Card>
    );
}
