import React from 'react';
import "./Chat.css";
import { Send } from "@material-ui/icons";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { Paper, TextField, Button, Box, styled, Typography, Divider } from "@material-ui/core";

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

export default function ChatArea(): JSX.Element {
    return (
        <div>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
                <Box display="flex" justifyContent="center" alignItems="center" px={2}>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </Box>
                <Box display="flex" flexDirection="row">
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </Box>
            </Box>
            <Divider/>
            <PaperList>
                {[1].map(num => {
                    return <Box width="100%" display="flex" justifyContent="flex-end" flexDirection="column" mt={1}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            <Box display="flex" flexDirection="row" pl={1}>
                                <ListItemText secondary="Jan 9, 2014" />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" ><TextPaper>Hello</TextPaper></Box>
                    </Box>
                })}
            </PaperList>

            <PaperBox display="flex" flexDirection="row" width="100%" p={1}>
                <Box flexGrow={1}>
                    <MessageText size="small" label="Type Message..." variant="outlined" fullWidth />
                </Box>
                <Box flexShrink={1} display="flex" justifyContent="center">
                    <SendButton variant="contained"
                        color="primary"
                        endIcon={<Send />}>
                    </SendButton></Box>
            </PaperBox>
        </div>
    )
}
