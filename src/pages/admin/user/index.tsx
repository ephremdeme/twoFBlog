import * as React from 'react';
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridOverlay,
	GridToolbarContainer,
	GridToolbarExport
} from '@material-ui/data-grid';
import {
	Avatar,
	Badge,
	Box,
	Button,
	ButtonGroup,
	Card,
	Chip,
	Container,
	createStyles,
	Grid,
	IconButton,
	makeStyles,
	Theme,
	withStyles,
	fade
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getCollection } from 'app/hooks';
import { User } from 'features/user/types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import AppsIcon from '@material-ui/icons/Apps';
import BlockIcon from '@material-ui/icons/Block';
import ContactlessIcon from '@material-ui/icons/Contactless';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexDirection: 'column',
			'& .ant-empty-img-1': {
				fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
			},
			'& .ant-empty-img-2': {
				fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
			},
			'& .ant-empty-img-3': {
				fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
			},
			'& .ant-empty-img-4': {
				fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
			},
			'& .ant-empty-img-5': {
				fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
				fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
			},
		},
		label: {
			marginTop: theme.spacing(1),
		},
	})
);

function CustomNoRowsOverlay() {
	const classes = useStyles();

	return (
		<GridOverlay className={classes.root}>
			<svg
				width="120"
				height="100"
				viewBox="0 0 184 152"
				aria-hidden
				focusable="false">
				<g fill="none" fillRule="evenodd">
					<g transform="translate(24 31.67)">
						<ellipse
							className="ant-empty-img-5"
							cx="67.797"
							cy="106.89"
							rx="67.797"
							ry="12.668"
						/>
						<path
							className="ant-empty-img-1"
							d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
						/>
						<path
							className="ant-empty-img-2"
							d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
						/>
						<path
							className="ant-empty-img-3"
							d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
						/>
					</g>
					<path
						className="ant-empty-img-3"
						d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
					/>
					<g className="ant-empty-img-4" transform="translate(149.65 15.383)">
						<ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
						<path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
					</g>
				</g>
			</svg>
			<div className={classes.label}>No Rows</div>
		</GridOverlay>
	);
}

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbarExport />
		</GridToolbarContainer>
	);
}

const useStylesUserList = makeStyles((theme: Theme) =>
	createStyles({
		rounded: {
			width: theme.spacing(6),
			height: theme.spacing(6),
		},
		search: {
			position: 'relative',
			borderRadius: 10,
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			border: `${theme.palette.type === 'dark' ? "1px solid #555" : "1px solid #aaa"}`,
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			width: '100%',
			color: 'inherit',
			fontSize: '.8rem',
			padding: '5px',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '18ch',
				'&:focus': {
					width: '25ch',
				},
			},
		},
	})
);

const StyledBadge = withStyles((theme: Theme) =>
	createStyles({
		badge: {
			backgroundColor: '#44b700',
			color: '#44b700',
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			'&::after': {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				borderRadius: '50%',
				animation: '$ripple 1.2s infinite ease-in-out',
				border: '1px solid currentColor',
				content: '""',
			},
		},
		'@keyframes ripple': {
			'0%': {
				transform: 'scale(.8)',
				opacity: 1,
			},
			'100%': {
				transform: 'scale(2.4)',
				opacity: 0,
			},
		},
	})
)(Badge);

const UserList = () => {
	const classes = useStylesUserList();
	const [users, setUsers] = React.useState<User[]>([]);
	const [usersFiltered, setUsersFiltered] = React.useState<User[]>([]);
	const [gridView, setGridView] = React.useState(false);

	React.useEffect(() => {
		getCollection('users').onSnapshot((snapshot) => {
			const users = snapshot.docs.map((user) => user.data());
			setUsers(users as User[]);
			setUsersFiltered(users as User[])
		});
	}, []);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 170 },
		{ field: 'user_name', headerName: 'User Name', width: 160 },
		{ field: 'email', headerName: 'Email', width: 160 },
		{
			field: 'role',
			headerName: 'User Role',
			type: 'string',
			width: 190
		},
		{
			field: 'view',
			headerName: 'View',
			width: 90,
			renderCell: (params: GridCellParams) => {
				let { id } = params.value?.valueOf() as { id: string };

				return (
					<Link to={`/auth/user/${id}`}>
						<IconButton>
							<VisibilityIcon style={{ color: '#666' }} />
						</IconButton>
					</Link>
				);
			},
		},
		{
			field: 'edit',
			headerName: 'Edit',
			width: 90,
			renderCell: (params: GridCellParams) => {
				let { id } = params.value?.valueOf() as { id: string };

				return (
					<Link to={`/auth/user/${id}/edit`}>
						<IconButton>
							<EditIcon style={{ color: '#666' }} />
						</IconButton>
					</Link>
				);
			},
		},
		{
			field: 'blocked',
			headerName: 'Account Status',
			width: 130,
			renderCell: (params: GridCellParams) => {
				let { id, blocked } = params.value?.valueOf() as {
					id: string;
					blocked: boolean;
				};

				const onClick = () => {
					if (blocked) {
						getCollection('users').doc(id).update({
							blocked: false,
						});
					} else {
						getCollection('users').doc(id).update({
							blocked: true,
						});
					}
				};

				return (
					<Button
						color={blocked ? 'secondary' : 'default'}
						size="small"
						variant="outlined"
						onClick={onClick}>
						{blocked ? 'Blocked' : 'Active'}
					</Button>
				);
			},
		},
	];

	const rows = usersFiltered.map((user: User) => {
		const { uid, user_name, email, role, blocked } = user;

		return {
			id: uid,
			user_name,
			email,
			role,
			view: { id: uid, role },
			edit: { id: uid },
			blocked: { id: uid, blocked },
		};
	});

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filteredUsers = users.filter((user) =>
			user.user_name.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setUsersFiltered(filteredUsers);
	};

	return (
		<Container>
			<Box
				display="flex"
				alignItems="flex-end"
				justifyContent="space-between"
				m={3}>
				<Button
					component={Link}
					to="/auth/create/user"
					size="small"
					variant="outlined">
					Add new user
				</Button>
				<Box flexGrow={1} mx={3}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search products…"
							onChange={handleFilter}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</Box>
				<Box>
					<ButtonGroup size="small" aria-label="small outlined button group">
						<Button
							startIcon={<ViewListIcon />}
							onClick={() => setGridView(false)}>
							list
						</Button>
						<Button startIcon={<AppsIcon />} onClick={() => setGridView(true)}>
							grid
						</Button>
					</ButtonGroup>
				</Box>
			</Box>

			<Box my={3}>
				<div style={{ minHeight: '400px', width: '100%' }}>
					{gridView ? (
						<Grid container spacing={3}>
							{usersFiltered.map((user, i) => (
								<Grid item key={i} sm={12} md={4} lg={3}>
									<Box
										style={{
											maxWidth: '250px',
											minHeight: '150px',
											maxHeight: '150px',
										}}>
										<Box
											display="flex"
											p={2}
											flexDirection="column"
											alignItems="center"
											justifyContent="center">
											<Box display="flex" alignItems="center" mt={1} mb={2}>
												<Box mr={2}>
													{user?.isOnline ? (
														<StyledBadge
															overlap="circle"
															anchorOrigin={{
																vertical: 'bottom',
																horizontal: 'right',
															}}
															variant="dot">
															<Avatar
																src={user?.photo}
																className={classes.rounded}
															/>
														</StyledBadge>
													) : (
														<Avatar
															src={user?.photo}
															className={classes.rounded}
														/>
													)}
												</Box>
												<Box>
													<Box fontSize="1rem" fontWeight={600} mb={1}>
														{user?.user_name.substring(0, 10)}
													</Box>
													<Box mr={1}>
														<Chip
															variant="outlined"
															size="small"
															label={user?.role.substring(0, 10)}
														/>
													</Box>
												</Box>
											</Box>

											<ButtonGroup
												size="small"
												aria-label="small outlined button group">
												<Button
													component={Link}
													to={`/auth/user/${user?.uid}`}
													onClick={() => setGridView(false)}>
													<VisibilityIcon />
												</Button>
												<Button
													component={Link}
													to={`/auth/user/${user?.uid}/edit`}
													onClick={() => setGridView(true)}>
													<EditIcon />
												</Button>

												<Button
													onClick={() => {
														if (user.blocked) {
															getCollection('users').doc(user.uid).update({
																blocked: false,
															});
														} else {
															getCollection('users').doc(user.uid).update({
																blocked: true,
															});
														}
													}}>
													{!user.blocked ? <ContactlessIcon /> : <BlockIcon />}
												</Button>
											</ButtonGroup>
										</Box>
									</Box>
								</Grid>
							))}
						</Grid>
					) : (
						<DataGrid
							components={{
								NoRowsOverlay: CustomNoRowsOverlay,
								Toolbar: CustomToolbar,
							}}
							rows={rows}
							columns={columns}
							pageSize={8}
							autoHeight
						/>
					)}
				</div>
			</Box>
		</Container>
	);
};

export default UserList;
