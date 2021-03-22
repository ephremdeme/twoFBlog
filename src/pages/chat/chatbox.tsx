import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, CardHeader, Badge, IconButton, styled, Paper, ListItemText, Box, Typography } from '@material-ui/core';
import { ReactComponent as MessageLogo } from '../../public/icons/icons8_message.svg';
import { ReactComponent as CloseMessage } from '../../public/icons/icons8_delete_sign_4.svg';
import { ReactComponent as Message } from '../../public/icons/icons8_filled_message.svg';
import { ReactComponent as SendMessage } from '../../public/icons/icons8_paper_plane.svg';
import firebase from '../../firebase/firebase';
import './Chat.css';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { SupervisedUserCircle } from "@material-ui/icons";
import { getRealTimeUser_Customer_Service, sendRealTimeUserMessage, getSupportUser, fetchMessage_user } from "../../features/user";

interface IItems {
    date: Date;
    message: string;
    sender: string;
    to: string;
}

const PaperList = styled(Paper)({
    height: '22rem',
    overflowY: 'scroll',
    position: 'relative',
    paddingBottom: '1rem'
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

const Chatbox = (): JSX.Element => {
    const [message, setMessage] = useState('');
    const user = useSelector((state: RootState) => state.user.users)
    const conversations = useSelector((state: RootState) => state.user.conversations)
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRealTimeUser_Customer_Service(auth.uid));
    },[])

    const startChat = ()=>{
        dispatch(fetchMessage_user(auth.uid));
    }

    const handleSendMessage = (e: any): void=>{
        e.preventDefault()
        if(message){
            const messageContent = {
                user_uid_1: auth.uid,
                message,
                isView: false,
                createdAt: new Date()
            }
            dispatch(sendRealTimeUserMessage(messageContent))
            setMessage("");
        }
    }

    const AlwaysScrollToBottom = () => {
        const elementRef: any = useRef<React.MutableRefObject<any>>();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
        <Container>
            <div className="message"></div>

            <div className="chat-widget" id="chatWidget">
                {/* <!-- chat toggle --> */}
                <input
                    id="chat-widget-toggle"
                    className="chat-widget-toggle"
                    type="checkbox"
                    onClick={()=>{startChat()}}
                />

                {/* <!-- chat close button --> */}
                <label
                    title="close chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-close-button">
                    <CloseMessage />
                </label>

                <div className="chat-box">
                    {/* <!-- chat user info     --> */}

                    <div className="chat-message-box">
                        {/* <!--  chat header --> */}
                        <Card>
                            <CardHeader
                                title="Customer support service"
                                // subheader="September 14, 2016"
                                action={
                                    <IconButton>
                                        {user && <Badge badgeContent={user.length} color="secondary">
                                            <SupervisedUserCircle style={{ width: '2rem', height: '2rem' }} />
                                        </Badge>}
                                    </IconButton>
                                }
                            />
                        </Card>


                        {/* <!--   chat message  --> */}
                        <PaperList>
                            {
                                conversations && conversations.map((message, index) => {
                                    if (conversations.length - 1 === index)
                                        return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} key={index}>
                                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"}>
                                                    <Box display="flex" flexDirection="row" pl={1}>
                                                        <ListItemText />
                                                    </Box>
                                                </Box>
                                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"} ><TextPaper>{message.message}</TextPaper></Box>
                                                <AlwaysScrollToBottom />
                                            </Box>
                                    return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} key={index}>
                                        <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"}>
                                            <Box display="flex" flexDirection="row" pl={1}>
                                                <ListItemText />
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"} ><TextPaper>{message.message}</TextPaper></Box>
                                    </Box>
                                })
                            }
                        </PaperList>

                        {/* <!-- chat input box  --> */}
                        <div className="chat-form-box">
                            <form
                                className="chat-form"
                                id="chat-form"
                                name="chat-form"
                                onSubmit={handleSendMessage}
                            >
                                <input
                                    className="chat-form-input"
                                    type="text"
                                    placeholder="Type your message...."
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                />
                                <button
                                    title="send message"
                                    type="submit"
                                    className="chat-form-button">
                                    <SendMessage />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <!-- chat open button --> */}
                <label
                    title="open chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-open-button chat-widget-toggle"
                // onClick={onGetMessage}
                >
                    <MessageLogo />
                </label>
            </div>
        </Container>
    );
};

export default Chatbox;