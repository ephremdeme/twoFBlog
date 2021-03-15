import React, {useEffect, useState} from 'react';
import UserCard from './UserCard';
import "./Chat.css";
import ImageIcon from "@material-ui/icons/Image";
import { Paper, Box, styled, Avatar, ListItemText } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getRealTimeUser } from "../../features/user";
import { User } from "../../features/user/types";

const PaperList = styled(Paper)({
    height: '35rem',
    overflowY: 'scroll',
})

const UserList: React.FC<{users: User[], selected: Function}> = ({users, selected})=> {
    return (
        <div>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                <Box display="flex" flexDirection="row">
                    <ListItemText primary="Chats" secondary="Users list" />
                </Box>
            </Box>
            <PaperList>
                {
                    users && users.map((user: User, index) => {
                        return <UserCard user={user} onclick = {selected} unique={index}/>
                    })
                }
            </PaperList>
        </div>
    )
}

export default UserList