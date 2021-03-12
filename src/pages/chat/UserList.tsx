import React from 'react';
import UserCard from './UserCard';
import "./Chat.css";
import ImageIcon from "@material-ui/icons/Image";
import { Paper, Box, styled, Avatar, ListItemText } from "@material-ui/core";

const PaperList = styled(Paper)({
    height: '35rem',
    overflowY: 'scroll',
})

export default function UserList() {
    return (
        <div>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                <Box display="flex" flexDirection="row">
                    <ListItemText primary="Chats" secondary="Users list" />
                </Box>
            </Box>
            <PaperList>
                {
                    [1, 2].map(num => {
                        return <UserCard />
                    })
                }
            </PaperList>
        </div>
    )
}
