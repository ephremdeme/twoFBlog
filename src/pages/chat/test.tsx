import React, { useEffect, useRef } from 'react'
import firebase from "../../firebase/firebase";
import { list } from 'rxfire/database';
import { map } from 'rxjs/operators';
import { setClearRealTimeMessage_admin, setGetRealTimeMessage_admin, updateViewStatus } from 'features/user';
import { UserRole } from 'features/user/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { Box, ListItemText, Paper, styled, Typography } from '@material-ui/core';
import { ReactComponent as SeenIcon } from "public/chat_icons/icons8_double_tick.svg";
import { ReactComponent as UnseenIcon } from "public/chat_icons/icons8_checkmark.svg";

const PaperList = styled(Paper)({
    height: 'calc(100vh - 180px)',
    overflowY: 'scroll',
    borderRadius: 'none',
});

const TextPaper = styled(Typography)({
    background: '#716BE4',
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '1px 10px',
    margin: '5px',
    marginLeft: '10px',
    color: 'white',
});

function Test({ uid_1, uid_2 }: any) {
    const state = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const AlwaysScrollToBottom = () => {
        const elementRef: any = useRef<React.MutableRefObject<any>>();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };
    useEffect(() => {
        const ref = firebase.database().ref("convserations");
        const example = list(ref)
            .pipe(
                map((changes: any) => {
                    let data: any = [];
                    changes.forEach((element: any) => {
                        if ((element.snapshot.val().user_uid_1 === uid_1 && element.snapshot.val().user_uid_2 === uid_2 && element.snapshot.val().from === UserRole.CUSTOMER_SERVICE) ||
                            (element.snapshot.val().user_uid_1 === uid_2 && element.snapshot.val().user_uid_2 === uid_1 && element.snapshot.val().from === UserRole.USER))
                            data.push({ ...element.snapshot.val(), key: element.snapshot.key })
                    })
                    return data
                }
                )
            ).subscribe((next: any) => {
                dispatch(setClearRealTimeMessage_admin());
                dispatch(setGetRealTimeMessage_admin(next))
                dispatch(updateViewStatus(next, uid_1))
            }
            )
        return () => {
            dispatch(setClearRealTimeMessage_admin());
            example.unsubscribe()
        }
    }, [])

    return (
        <div>
            <PaperList elevation={0}>
                {state.conversations_admin &&
                    state.conversations_admin.map((message, index) => {
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
                        if (state.conversations_admin.length - 1 === index)
                            return (
                                <Box
                                    width="100%"
                                    display="flex"
                                    justifyContent="flex-end"
                                    flexDirection="column"
                                    mt={1}>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent={
                                            message.user_uid_1 === uid_1
                                                ? 'flex-start'
                                                : 'flex-end'
                                        }>
                                        <Box display="flex" flexDirection="row" pl={1}>
                                            <ListItemText secondary={formattedTime} />
                                        </Box>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent={
                                            message.user_uid_1 === uid_1
                                                ? 'flex-start'
                                                : 'flex-end'
                                        }>
                                        <Box>
                                            <TextPaper style={{ background: message.user_uid_1 === uid_1 ? '#7B1FA2' : '#716BE4' }}>{message.message}</TextPaper>
                                        </Box>
                                        {
                                            message.user_uid_1 === uid_1 && message.isView ?
                                                <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                    <SeenIcon width="1rem" height="1rem" />
                                                </Box> :
                                                message.user_uid_1 === uid_1 && !message.isView ?
                                                    <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                        <UnseenIcon width="1rem" height="1rem" />
                                                    </Box> : null
                                        }
                                    </Box>
                                    <AlwaysScrollToBottom />
                                </Box>
                            );
                        return (
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="flex-end"
                                flexDirection="column"
                                mt={1}>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent={
                                        message.user_uid_1 === uid_1
                                            ? 'flex-start'
                                            : 'flex-end'
                                    }>
                                    <Box display="flex" flexDirection="row" pl={1}>
                                        <ListItemText secondary={`${formattedTime}`} />
                                    </Box>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent={
                                        message.user_uid_1 === uid_1
                                            ? 'flex-start'
                                            : 'flex-end'
                                    }>
                                    <TextPaper style={{ background: message.user_uid_1 === uid_1 ? '#7B1FA2' : '#716BE4' }}>{message.message}</TextPaper>
                                    {
                                        message.user_uid_1 === uid_1 && message.isView ? <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                            <SeenIcon width="1rem" height="1rem" />
                                        </Box> : message.user_uid_1 === uid_1 && !message.isView ?
                                            <Box height="100%" display="flex" pb={1} alignSelf="flex-end">
                                                <UnseenIcon width="1rem" height="1rem" />
                                            </Box> : null
                                    }
                                </Box>
                            </Box>
                        );
                    })}
            </PaperList>
        </div>
    )
}
export default React.memo(Test)