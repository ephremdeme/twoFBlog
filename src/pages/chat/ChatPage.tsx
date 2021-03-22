import React, {
	useState,
	useEffect,
	useRef,
	createRef,
	useCallback,
	useMemo,
} from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
	sendRealTimeMessage,
	getSupportUser,
	fetchMessage,
} from '../../features/user';
import { User, Conversation } from '../../features/user/types';
import {
	Paper,
	styled,
	Avatar,
	ListItemText,
	makeStyles,
	Theme,
	createStyles,
	Badge,
	Typography,
	Button,
	TextField,
	Hidden,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import ImageIcon from '@material-ui/icons/Image';
import { Send } from '@material-ui/icons';
import { UserRole } from 'features/auth/types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

export interface ICUser {
	user_name: string;
	email: string;
	photo: string;
	uid: string;
}

const PaperList = styled(Paper)({
	height: 'calc(100vh - 180px)',
	overflowY: 'scroll',
	borderRadius: 'none',
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: '100%',
			marginBottom: '10px',
			boxShadow: 'none',
			'&:hover': {
				background: 'rgba(0,0,0,0.2)',
			},
		},
		avatar: {
			// backgroundColor: red[500],
		},
		chatContainer: {
			height: 'calc(100vh - 180px)',
		},
		showMobileChatMenu: {
			position: 'absolute',
			left: 0,
			boxShadow: '0 0 10px rgba(0,0,0,0.2)',
			zIndex: 2000
		},
		hideMobileChatMenu: {
			position: 'absolute',
			left: '-2000px',
		},
		chatUsers: {
			background: theme.palette.background.default,
		},
	})
);

const Online = styled(FiberManualRecord)({
	color: '#63F700',
});

const Offline = styled(FiberManualRecord)({
	color: '#969696',
});

const Guest = styled(FiberManualRecord)({
	color: '#613BBB',
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

const SendButton = styled(Button)({
	backgroundColor: '#5596EB',
	height: '2.28rem',
	marginLeft: '1rem',
});

const MessageText = styled(TextField)({
	height: '2rem',
});

const PaperBox = styled(Box)({});

const ChatPage: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.user);
	const uid = useSelector((state: RootState) => state.auth.uid);
	const [chatStart, setchatStart] = useState<boolean>(false);
	const [message, setmessage] = useState('');
	const [currentUser, setCurrentUser] = useState<ICUser>({
		user_name: '',
		email: '',
		photo: '',
		uid: '',
	});

	const [showChatMobile, setShowChatMobile] = useState(false);

	const realtime_users = useCallback(() => {
		dispatch(getSupportUser(uid));
	}, []);

	useEffect(() => {
		dispatch(getSupportUser(uid));
	}, []);

	const init_selected_user = (user: User) => {
		setchatStart(false);
		setCurrentUser({
			...currentUser,
			user_name: user.user_name,
			email: user.email,
			photo: user.photo,
			uid: user.uid,
		});
		setchatStart(true);
		dispatch(fetchMessage(uid, user.uid));
	};


	const handleSendMessage = (e: any): void => {
		e.preventDefault()
		if (message) {
			const messageContent: Conversation = {
				user_uid_1: uid,
				user_uid_2: currentUser.uid,
				message,
				isView: false,
				createdAt: new Date(),
			};
			console.log('CONTENT', messageContent);
			dispatch(sendRealTimeMessage(messageContent));
			setmessage('');
		}
	};

	const AlwaysScrollToBottom = () => {
		const elementRef: any = useRef<React.MutableRefObject<any>>();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	const classes = useStyles();
	return (
		<Box className={classes.chatContainer}>
			<Container>
				<Grid container justify="flex-start" alignItems="center">
					<Grid item lg={4} alignItems="center">
						<Box
							fontWeight={700}
							display="flex"
							fontSize="1rem"
							textAlign="center">
							<Hidden mdUp implementation="css">
								<IconButton
									color="inherit"
									aria-label="open drawer"
									edge="start"
									onClick={() => setShowChatMobile(!showChatMobile)}
									size="medium">
									{showChatMobile ? <CancelIcon /> : <MenuIcon />}
								</IconButton>
							</Hidden>
							<Hidden smDown implementation="css">
								CHATS
							</Hidden>
						</Box>
					</Grid>

					<Grid item lg={8}>
						<Box display="flex">
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
								px={2}>
								{chatStart ? (
									<Avatar src={currentUser.photo}>
										<ImageIcon />
									</Avatar>
								) : (
										<Avatar src={currentUser.photo}>
											<ImageIcon />
										</Avatar>
									)}
							</Box>
							<Box display="flex" flexDirection="row">
								{chatStart ? (
									<ListItemText
										primary={currentUser.user_name}
										secondary={currentUser.email}
									/>
								) : (
										<ListItemText primary="User name" secondary="user email" />
									)}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>

			<Box
				width="80%"
				className={`${
					showChatMobile
						? classes.showMobileChatMenu
						: classes.hideMobileChatMenu
					}`}
			>
				<PaperList elevation={0}>
					<Box style={{ overflow: 'hidden', height: 'calc(100vh - 90px)' }}>
						{state.users_admin &&
							state.users_admin.map((user: User, index) => {
								return (
									<Card
										className={classes.root}
										onClick={() => {
											init_selected_user(user);
										}}
										key={index}
										elevation={0}>
										<CardHeader
											avatar={
												<Avatar
													aria-label="recipe"
													className={classes.avatar}
													src={user.photo}
												/>
											}
											action={
												<IconButton>
													<Badge badgeContent={user.view} color="secondary">
														{user.role === UserRole.GUEST ? (
															<Guest />
														) : user.isOnline ? (
															<Online />
														) : (
																	<Offline />
																)}
													</Badge>
												</IconButton>
											}
											title={user.user_name}
											subheader={user.email}
										/>
									</Card>
								);
							})}
					</Box>
				</PaperList>
			</Box>

			<Grid container>
				<Grid item md={4} xs={1}>
					<Hidden smDown implementation="css">
						<Box className={classes.chatUsers} style={{ overflowY: 'scroll', height: 'calc(100vh - 180px)' }}>
							{state.users_admin && state.users_admin
								.map((user: User, index) => {
									return (
										<Card
											className={classes.root}
											onClick={() => {
												init_selected_user(user);
											}}
											key={index}>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={classes.avatar}
														src={user.photo}
													/>
												}
												action={
													<IconButton>
														<Badge badgeContent={user.view} color="secondary">
															{user.role === UserRole.GUEST ? (
																<Guest />
															) : user.isOnline ? (
																<Online />
															) : (
																		<Offline />
																	)}
														</Badge>
													</IconButton>
												}
												title={user.user_name}
												subheader={user.email}
											/>
										</Card>
									);
								})}
						</Box>
					</Hidden>
				</Grid>

				<Grid item md={8} xs={12}>
					{
						<div>
							<PaperList elevation={0}>
								{state.conversations_admin &&
									state.conversations_admin.map((message, index) => {
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
															message.user_uid_1 === uid
																? 'flex-start'
																: 'flex-end'
														}>
														<Box display="flex" flexDirection="row" pl={1}>
															<ListItemText secondary={'jan 2 02'} />
														</Box>
													</Box>
													<Box
														display="flex"
														flexDirection="row"
														justifyContent={
															message.user_uid_1 === uid
																? 'flex-start'
																: 'flex-end'
														}>
														<TextPaper>{message.message}</TextPaper>
													</Box>
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
														message.user_uid_1 === uid
															? 'flex-start'
															: 'flex-end'
													}>
													<Box display="flex" flexDirection="row" pl={1}>
														<ListItemText secondary={'jan 2 02'} />
													</Box>
												</Box>
												<Box
													display="flex"
													flexDirection="row"
													justifyContent={
														message.user_uid_1 === uid
															? 'flex-start'
															: 'flex-end'
													}>
													<TextPaper>{message.message}</TextPaper>
												</Box>
											</Box>
										);
									})}
								<AlwaysScrollToBottom />
							</PaperList>

							<PaperBox display="flex" flexDirection="row" width="100%" p={1}>
								{/* <form onSubmit={handleSendMessage}> */}
									<Box flexGrow={1}>
										<MessageText
											size="small"
											label="Type Message..."
											variant="outlined"
											value={message}
											fullWidth
											onChange={(e) => {
												setmessage(e.target.value);
											}}
										/>
									</Box>
									<Box flexShrink={1} display="flex" justifyContent="center">
										<form onSubmit={handleSendMessage}>
										<SendButton
											variant="contained"
											// type="submit"
											color="primary"
											endIcon={<Send />}
											type="submit"
											></SendButton>
										</form>
									</Box>
								{/* </form> */}
							</PaperBox>
						</div>
					}
				</Grid>
			</Grid>
		</Box>
	);
};

export default ChatPage;
