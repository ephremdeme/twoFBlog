import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, Badge, IconButton, styled, Paper, ListItemText, Box, Typography } from '@material-ui/core';
import { ReactComponent as SendMessage } from '../../public/icons/icons8_paper_plane.svg';
import firebase from '../../firebase/firebase';
import './Chat.css';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { SupervisedUserCircle } from "@material-ui/icons";
import { sendRealTimeUserMessage, setClearRealTimeMessage, setGetRealTimeMessage, updateViewStatus, setIsTyping } from "../../features/user";
import { list } from 'rxfire/database';
import { debounceTime, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserRole } from 'features/user/types';
import { ReactComponent as SeenIcon } from "public/chat_icons/icons8_double_tick.svg";
import { ReactComponent as UnseenIcon } from "public/chat_icons/icons8_checkmark.svg";

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

const Chatbox = ({ uid_1 }: any): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.users)
    const conversations = useSelector((state: RootState) => state.user.conversations)
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    const [finish, setFinish] = useState(true);
    const [queryName, setQueryName] = useState("");
    const [debouncedName, setDebouncedName] = useState<any>("");
    const [onSearch$] = useState(() => new Subject());

    useEffect(() => {
        const subscription = onSearch$.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            tap(a => {
                dispatch(setIsTyping(uid_1, false));
                setFinish(true)
            })
        ).subscribe(setDebouncedName);
        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleTyping = (e: any) => {
        if (finish) {
            dispatch(setIsTyping(uid_1, true));
        }
        setFinish(false)
        setQueryName(e.target.value);
        onSearch$.next(e.target.value);
    };

    useEffect(() => {
        dispatch(setClearRealTimeMessage());
        const ref = firebase.database().ref("convserations");
        const user_messages = list(ref)
            .pipe(
                map((changes: any) => changes.map((c: any) => {
                    return { key: c.snapshot.key, event: c.event, ...c.snapshot.val() }
                }),
                ))
            .subscribe((data: any[]) => {
                console.log('nul', data.length)
                const filtered = data.filter((item) => {
                    return (item.user_uid_1 === auth.uid || item.user_uid_2 === auth.uid) &&
                        (item.from === UserRole.CUSTOMER_SERVICE || item.from === UserRole.USER)
                })
                dispatch(setClearRealTimeMessage());
                dispatch(setGetRealTimeMessage(filtered))
                dispatch(updateViewStatus(filtered, auth.uid))
            })
        return () => {
            dispatch(setClearRealTimeMessage());
            user_messages.unsubscribe();
        }
    }, [])

    const handleSendMessage = (e: any): void => {
        e.preventDefault()
        if (queryName) {
            const messageContent = {
                user_uid_1: auth.uid,
                message: queryName,
                isView: false,
                createdAt: new Date()
            }
            dispatch(sendRealTimeUserMessage(messageContent))
            setQueryName("");
        }
    }

    const AlwaysScrollToBottom = () => {
        const elementRef: any = useRef<React.MutableRefObject<any>>();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };

    return (
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
                            const unix_timestamp = new Date(`${message.createdAt}`).getTime()
                            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                            var date = new Date(unix_timestamp * 1000);
                            // Hours part from the timestamp
                            var hours = date.getHours();
                            // Minutes part from the timestamp
                            var minutes = "0" + date.getMinutes();
                            // Seconds part from the timestamp
                            var seconds = "0" + date.getSeconds();
                            // Will display time in 10:30:23 format
                            var formattedTime = hours + ':' + minutes.substr(-2);
                            if (conversations.length - 1 === index)
                                return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} key={index}>
                                    <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"}>
                                        <Box display="flex" flexDirection="row" pl={1}>
                                            <ListItemText secondary={formattedTime} />
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"} >
                                        {
                                            message.user_uid_1 === uid_1 && message.isView ? <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                <SeenIcon width="1rem" height="1rem" />
                                            </Box> : 
                                            message.user_uid_1 === uid_1 && !message.isView ?
                                            <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                <UnseenIcon width="1rem" height="1rem" />
                                            </Box> : null
                                        }
                                        <TextPaper style={{ background: message.user_uid_1 === uid_1 ? '#7B1FA2' : '#716BE4' }}>{message.message}</TextPaper>
                                    </Box>
                                    <AlwaysScrollToBottom />
                                </Box>
                            return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1} key={index}>
                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"}>
                                    <Box display="flex" flexDirection="row" pl={1}>
                                        <ListItemText secondary={formattedTime} />
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="row" justifyContent={message.user_uid_1 === auth.uid ? "flex-end" : "flex-start"} >
                                    {
                                        message.user_uid_1 === uid_1 && message.isView ? <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                            <SeenIcon width="1rem" height="1rem" />
                                        </Box> :
                                        message.user_uid_1 === uid_1 && !message.isView ?
                                                    <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                        <UnseenIcon width="1rem" height="1rem" />
                                                    </Box> : null
                                    }
                                    <TextPaper style={{ background: message.user_uid_1 === uid_1 ? '#7B1FA2' : '#716BE4' }}>{message.message}</TextPaper>
                                </Box>
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
                            value={queryName}
                            onChange={handleTyping}
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
    );
};

export default Chatbox;