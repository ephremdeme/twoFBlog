import React, {useState, useEffect, useRef, createRef, RefObject} from 'react'
import { Container, Grid, Box } from "@material-ui/core";
import UserCard from "./UserCard";
import UserList from "./UserList";
import ChatArea from "./ChatArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getRealTimeUser, sendRealTimeMessage, getRealTimeMessage, getSupportUser } from "../../features/user";
import { User, Conversation } from "../../features/user/types";

export interface ICUser {
    user_name: string;
    email: string;
    photo: string;
    uid: string
}

export default function ChatPage(): JSX.Element {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.user);
    const uid = useSelector((state: RootState) => state.auth.uid);
    const conversations = useSelector((state: RootState) => state.user.conversations_admin);
    const [chatStart, setchatStart] = useState<boolean>(false);
    const [message, setmessage] = useState("");
    const [currentUser, setCurrentUser] = useState<ICUser>({user_name: "", email: "", photo: "", uid: ""})
    const referance = createRef<any>();
   

    useEffect(() => {
        dispatch(getSupportUser(uid))
        // dispatch(getRealTimeUser(uid))
        // dispatch(getRealTimeMessageView());
    }, [])
    
    const init_selected_user = (user: User)=> {
        setCurrentUser({...currentUser, user_name: user.user_name, email: user.email, photo: user.photo, uid: user.uid})
        setchatStart(true);
        // dispatch(getRealTimeMessage({uid_1: uid, uid_2: user.uid}));
    }

    console.log('[CONVO STORE]', conversations);
    
    const handleSendMessage = (e: any): void=>{
        e.preventDefault()
        if(message){
            const messageContent: Conversation = {
                user_uid_1: uid,
                user_uid_2: currentUser.uid,
                message,
                isView: false,
                createdAt: new Date()
            }
            console.log(messageContent)
            dispatch(sendRealTimeMessage(messageContent))
            setmessage("");
        }
    }
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item lg={4}><UserList users={state.users_admin} selected = {init_selected_user}/></Grid>
                <Grid item lg={8} >
                    <ChatArea chatStart={chatStart} 
                    currentUser = {currentUser}
                    setMessage={setmessage} conversations = {conversations} referance = {referance}
                    message = {message} handleSendMessage = {handleSendMessage}/>
                </Grid>
            </Grid>
        </Container>
    )
}
