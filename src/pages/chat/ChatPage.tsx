import React, { useState, useEffect, useRef, createRef, useCallback, useMemo } from 'react'
import { Container, Grid, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { sendRealTimeMessage, getSupportUser, fetchMessage } from "../../features/user";
import { User, Conversation } from "../../features/user/types";
import { Paper, styled, Avatar, ListItemText, makeStyles, Theme, createStyles, Badge, Typography, Button, TextField, Divider } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { useList } from 'react-firebase-hooks/database';
import firebase from '../../firebase/firebase';
import ImageIcon from '@material-ui/icons/Image';
import { Send } from "@material-ui/icons";
import { UserRole } from 'features/auth/types';

export interface ICUser {
    user_name: string;
    email: string;
    photo: string;
    uid: string
}

const PaperList = styled(Paper)({
    height: '35rem',
    overflowY: 'scroll',
})

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

const Guest = styled(FiberManualRecord)({
    color: '#613BBB'
})

const TextPaper = styled(Typography)({
    background: '#716BE4',
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '1px 10px',
    margin: '5px',
    marginLeft: '10px',
    color: 'white'
})

const SendButton = styled(Button)({
    backgroundColor: '#5596EB',
    height: '2.28rem',
    marginLeft: '1rem'
})

const MessageText = styled(TextField)({
    height: '2rem',
})

const PaperBox = styled(Box)({
})

const ChatPage: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.user);
    const uid = useSelector((state: RootState) => state.auth.uid);
    const [chatStart, setchatStart] = useState<boolean>(false);
    const [message, setmessage] = useState("");
    const [currentUser, setCurrentUser] = useState<ICUser>({ user_name: "", email: "", photo: "", uid: "" })

    const realtime_users = useCallback(
        () => {
            dispatch(getSupportUser(uid))
        },
        [],
    )

    useEffect(() => {
        dispatch(getSupportUser(uid))
    }, [])

    const init_selected_user = (user: User) => {
        setCurrentUser({ ...currentUser, user_name: user.user_name, email: user.email, photo: user.photo, uid: user.uid })
        setchatStart(true);
        dispatch(fetchMessage(uid, user.uid))
    }

    const handleSendMessage = (): void => {
        if (message) {
            const messageContent: Conversation = {
                user_uid_1: uid,
                user_uid_2: currentUser.uid,
                message,
                isView: false,
                createdAt: new Date()
            }
            console.log("CONTENT", messageContent)
            dispatch(sendRealTimeMessage(messageContent))
            setmessage("");
        }
    }


    const AlwaysScrollToBottom = () => {
        const elementRef: any = useRef<React.MutableRefObject<any>>();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    const classes = useStyles();
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item lg={4}>
                    {/* <UserList users={state.users_admin} selected={init_selected_user} /> */}
                    <div>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            <Box display="flex" flexDirection="row">
                                <ListItemText primary="Chats" secondary="Users list" />
                            </Box>
                        </Box>
                        <PaperList>
                            {
                                state.users_admin && state.users_admin.map((user: User, index) => {
                                    return <Card className={classes.root} onClick={() => { init_selected_user(user) }} key={index}>
                                        <CardHeader

                                            avatar={
                                                <Avatar aria-label="recipe" className={classes.avatar} src={user.photo} />
                                            }
                                            action={
                                                <IconButton>
                                                    <Badge badgeContent={user.view} color="secondary">
                                                        {user.role === UserRole.GUEST ? <Guest/> : user.isOnline ? <Online /> : <Offline />}
                                                    </Badge>
                                                </IconButton>
                                            }
                                            title={user.user_name}
                                            subheader={user.email}
                                        />
                                    </Card>
                                })
                            }
                        </PaperList>
                    </div>
                </Grid>
                <Grid item lg={8} >
                    {
                        <div>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                <Box display="flex" justifyContent="center" alignItems="center" px={2}>
                                    {chatStart ? <Avatar src={currentUser.photo}>
                                        <ImageIcon />
                                    </Avatar> :
                                        <Avatar src={currentUser.photo}>
                                            <ImageIcon />
                                        </Avatar>}
                                </Box>
                                <Box display="flex" flexDirection="row">
                                    {chatStart ? <ListItemText primary={currentUser.user_name} secondary={currentUser.email} /> : <ListItemText primary="User name" secondary="user email" />}
                                </Box>
                            </Box>
                            <Divider />
                            <PaperList>
                                {
                                    state.conversations_admin && state.conversations_admin.map((message, index) => {
                                        if (state.conversations_admin.length - 1 === index)
                                            return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} >
                                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === uid ? "flex-start" : "flex-end"}>
                                                    <Box display="flex" flexDirection="row" pl={1}>
                                                        <ListItemText secondary={"jan 2 02"} />
                                                    </Box>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === uid ? "flex-start" : "flex-end"} ><TextPaper>{message.message}</TextPaper></Box>
                                            </Box>
                                        return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1}>
                                            <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === uid ? "flex-start" : "flex-end"}>
                                                <Box display="flex" flexDirection="row" pl={1}>
                                                    <ListItemText secondary={"jan 2 02"} />
                                                </Box>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === uid ? "flex-start" : "flex-end"} ><TextPaper>{message.message}</TextPaper></Box>
                                        </Box>
                                    })
                                }
                                <AlwaysScrollToBottom />
                            </PaperList>

                            <PaperBox display="flex" flexDirection="row" width="100%" p={1}>
                                <Box flexGrow={1}>
                                    <MessageText size="small" label="Type Message..." variant="outlined" value={message} fullWidth onChange={(e) => { setmessage(e.target.value) }} />
                                </Box>
                                <Box flexShrink={1} display="flex" justifyContent="center">
                                    {/* <form > */}
                                    <SendButton variant="contained"
                                        // type="submit"
                                        color="primary"
                                        endIcon={<Send />}
                                        onClick={() => { handleSendMessage() }}
                                    >
                                    </SendButton>
                                    {/* </form> */}
                                </Box>
                            </PaperBox>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default ChatPage