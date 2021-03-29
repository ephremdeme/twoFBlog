import React, { useEffect, useState } from 'react';
import { Container, Badge } from '@material-ui/core';
import { ReactComponent as MessageLogo } from '../../public/icons/icons8_message.svg';
// import { ReactComponent as MessageLogo } from '../../public/chat_icons/icons_chat_start.svg';
import { ReactComponent as CloseMessage } from '../../public/icons/icons8_delete_sign_4.svg';
import './Chat.css';
import { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getRealTimeUser_Customer_Service, setOpenChatBox } from "../../features/user";
import Popup from './popup';


const Chatbox = (): JSX.Element => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const openChatBox = useSelector((state: RootState) => state.user.openChatBox)
    const messageView = useSelector((state: RootState) => state.user.messageView)

    useEffect(() => {
        dispatch(getRealTimeUser_Customer_Service(auth.uid));
    }, [])


    const initiate_chat = () => {
        dispatch(setOpenChatBox(true))
    }

    const endMessage = () => {
        setTimeout(() => {
            dispatch(setOpenChatBox(false))
        }, 1000);
    }

    return (
        <Container>
            <div className="message"></div>

            <div className="chat-widget" id="chatWidget">
                {/* <!-- chat toggle --> */}
                <input
                    id="chat-widget-toggle"
                    className="chat-widget-toggle"
                    type="checkbox"
                    onClick={() => { initiate_chat() }}
                />

                {/* <!-- chat close button --> */}
                <label
                    title="close chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-close-button"
                    onClick={() => { endMessage() }}
                >
                    <CloseMessage />
                </label>
                {openChatBox && <Popup uid_1={auth.uid} />}
                {/* <!-- chat open button --> */}
                <label
                    title="open chat"
                    htmlFor="chat-widget-toggle"
                    className="chat-widget-button chat-open-button chat-widget-toggle"
                >
                    <Badge badgeContent={messageView} color="secondary">
                        <MessageLogo width="4rem" height="4rem" />
                    </Badge>
                </label>
            </div>
        </Container>
    );
};

export default Chatbox;