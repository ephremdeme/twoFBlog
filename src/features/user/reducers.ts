import { PayloadAction } from "@reduxjs/toolkit";
import { initialState, Iuser } from "./init";
import { Conversation, IUsers, User } from "./types";

export default {
    setTempo: (state: any, action: PayloadAction<boolean>) => {
        state.tempo = action.payload;
    },
    setTypingStatus: (state: IUsers, action: PayloadAction<boolean>) => {
        state.isTyping = action.payload;
    },
    setOpenChatBox: (state: any, action: PayloadAction<boolean>) => {
        state.openChatBox = action.payload;
    },
    setMessageView: (state: any, action: PayloadAction<number>) => {
        state.messageView = action.payload;
    },
    setTest: (state: any, action: PayloadAction<any[]>) => {
        state.test = action.payload;
    },
    setRefreshUser: (state: IUsers) => {
        state.users = initialState.users;
    },
    setGetRealTimeUser: (state: IUsers, action: PayloadAction<User[]>) => {
        state.users.push(...action.payload)
    },
    setGetRealTimeMessage: (state: IUsers, action: PayloadAction<Conversation[]>) => {
        state.conversations.push(...action.payload)
    },
    setClearRealTimeMessage: (state: IUsers) => {
        state.conversations = initialState.conversations;
    },
    // ------------------------------------------------
    setRefreshUser_admin: (state: IUsers) => {
        state.users_admin = initialState.users_admin;
    },
    setGetRealTimeUser_admin: (state: IUsers, action: PayloadAction<User[]>) => {
        state.users_admin.push(...action.payload)
    },
    setGetRealTimeMessage_admin: (state: IUsers, action: PayloadAction<Conversation[]>) => {
        state.conversations_admin.push(...action.payload)
    },
    setClearRealTimeMessage_admin: (state: IUsers) => {
        state.conversations_admin = initialState.conversations_admin;
    },
    setGetUser_admin: (state: IUsers, action: PayloadAction<Iuser>) => {
        state.users_admin.forEach((user) => {
            if (user.uid === action.payload.uid)
                user.view = action.payload.view
        })
        // var flag = false;
        // state.users_admin.forEach((user) => {
        //     if(user.view !== 0){
        //         flag = true;
        //     }
        // });
        // if(flag)
        // state.users_admin.sort(function(a, b) {
		// 	var keyA = a.view,
		// 	  keyB = b.view;
		// 	if (keyA > keyB) return -1;
		// 	if (keyA < keyB) return 1;
		// 	return 0;
		//   });
    },
    //  --------------------------------------------------
    setGetUser: (state: IUsers, action: PayloadAction<Iuser>) => {
        state.users.forEach((user) => {
            if (user.uid === action.payload.uid)
                user.view = action.payload.view
        })
    },
    setGetPageView: (state: IUsers, action: PayloadAction<number>) => {
        state.pageVisit = action.payload
    },
}