import React, { FormEventHandler, useEffect, useRef } from 'react';
import "./Chat.css";
import { Send } from "@material-ui/icons";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { ICUser } from "./ChatPage";
import { Paper, TextField, Button, Box, styled, Typography, Divider } from "@material-ui/core";
import { Conversation } from 'features/user/types';

const PaperList = styled(Paper)({
    height: '32rem',
    overflowY: 'scroll',
    position: 'relative'
})

const PaperBox = styled(Box)({
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

const ChatArea: React.FC<{ chatStart: boolean, currentUser: ICUser, setMessage: Function, message: string, handleSendMessage: FormEventHandler<HTMLFormElement>, conversations: Conversation[], referance: any }> =
    ({ chatStart, currentUser, setMessage, message, handleSendMessage, conversations, referance }) => {
        const AlwaysScrollToBottom = () => {
            const elementRef: any = useRef<React.MutableRefObject<any>>();
            useEffect(() => elementRef.current.scrollIntoView());
            return <div ref={elementRef} />;
        };
        return (
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
                        {chatStart ? <ListItemText primary={currentUser.user_name} secondary={currentUser.email} />: <ListItemText primary="User name" secondary="user email"/>}
                    </Box>
                </Box>
                <Divider />
                <PaperList>
                    {chatStart ?
                        conversations.map((message, index) => {
                            if (conversations.length - 1 === index)
                                return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} >
                                        <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === currentUser.uid ? "flex-start" : "flex-end"}>
                                            <Box display="flex" flexDirection="row" pl={1}>
                                                <ListItemText secondary={"jan 2 02"} />
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === currentUser.uid ? "flex-start" : "flex-end"} ><TextPaper>{message.message}</TextPaper></Box>
                                    </Box>
                            return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1}>
                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === currentUser.uid ? "flex-start" : "flex-end"}>
                                    <Box display="flex" flexDirection="row" pl={1}>
                                        <ListItemText secondary={"jan 2 02"} />
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === currentUser.uid ? "flex-start" : "flex-end"} ><TextPaper>{message.message}</TextPaper></Box>
                            </Box>
                        }) : null
                    }
                    <AlwaysScrollToBottom />
                </PaperList>

                <PaperBox display="flex" flexDirection="row" width="100%" p={1}>
                    <Box flexGrow={1}>
                        <MessageText size="small" label="Type Message..." variant="outlined" value={message} fullWidth onChange={(e) => { setMessage(e.target.value) }} />
                    </Box>
                    <Box flexShrink={1} display="flex" justifyContent="center">
                        <form onSubmit={handleSendMessage}>
                            <SendButton variant="contained"
                                type="submit"
                                color="primary"
                                endIcon={<Send />}>
                            </SendButton>
                        </form>
                    </Box>
                </PaperBox>
            </div>
        )
    }

export default ChatArea;