import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { Badge, styled, Box } from "@material-ui/core";
import { User } from "../../features/user/types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "100%",
            marginBottom: "10px"
        },
        avatar: {
            // backgroundColor: red[500],
        },
    }),
);

const Online = styled(FiberManualRecord)({
    color: '#63F700'
})

const Offline = styled(FiberManualRecord)({
    color: '#969696'
})

const UserCard: React.FC<{user: User, onclick: Function, unique: number}> = ({user, onclick, unique}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} onClick = {()=>{onclick(user)}} key={unique}>
            <CardHeader

                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={user.photo}/>
                }
                action={
                    <IconButton>
                        <Badge badgeContent={user.view} color="secondary">
                            {user.isOnline ? <Online />: <Offline/>}
                        </Badge>
                    </IconButton>
                }
                title={user.user_name}
                subheader={user.email}
            />
        </Card>
    );
}

export default UserCard;