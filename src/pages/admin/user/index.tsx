import * as React from 'react';
import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridOverlay,
	GridToolbarContainer,
	GridToolbarExport,
} from '@material-ui/data-grid';
import {
	Box,
	Button,
	Container,
	createStyles,
	FormControl,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchUsers, selectUsers} from 'features/admin';
import {getCollection} from 'app/hooks';
import {User} from 'features/user/types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

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

const UserList = () => {
	// const dispatch = useDispatch();
	// const users = useSelector(selectUsers);
	const [users, setUsers] = React.useState<User[]>([]);

	React.useEffect(() => {
		// dispatch(fetchUsers());
		getCollection('users')
			.onSnapshot((snapshot) => {
				const users = snapshot.docs.map((user) => user.data());
				setUsers(users as User[]);
			});
	}, []);

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'ID', width: 170},
		{field: 'user_name', headerName: 'User Name', width: 160},
		{field: 'email', headerName: 'Email', width: 160},
		{
			field: 'role',
			headerName: 'User Role',
			type: 'string',
			width: 190,
			// renderCell: (params: GridCellParams) => {
			// 	let {id, role} = params.value?.valueOf() as {
			// 		id: string;
			// 		role: string;
			// 	};

			// 	const onClick = () => {
			// 		console.log('Updating Publish');
			// 		// dispatch(updateBlogPublish(id, !published));
			// 	};

			// 	return (
			// 		<FormControl style={{width: "100%"}}>
			// 			<InputLabel id="demo-simple-select-label">User Role</InputLabel>
			// 			<Select
			// 				labelId="demo-simple-select-label"
			// 				id="demo-simple-select"
			// 				value={role}
			// 				// onChange={handleChange}
			// 			>
			// 				<MenuItem value="ADMIN">ADMIN</MenuItem>
			// 				<MenuItem value="BLOGGER">BLOGGER</MenuItem>
			// 				<MenuItem value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</MenuItem>
			// 				<MenuItem value="USER">USER</MenuItem>
			// 				<MenuItem value="GUEST">GUEST</MenuItem>
			// 				<MenuItem value="SHOPE_ADMIN">SHOPE_ADMIN</MenuItem>
			// 				<MenuItem value="SELLER">SELLER</MenuItem>
			// 			</Select>
			// 		</FormControl>
			// 	);
			// },
		},
		{
			field: 'view',
			headerName: 'Publish',
			width: 90,
			renderCell: (params: GridCellParams) => {
				let {id} = params.value?.valueOf() as {id: string};

				return (
					<Link to={`/auth/user/${id}`}>
						<IconButton>
							<VisibilityIcon style={{color: '#666'}} />
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
				let {id} = params.value?.valueOf() as {id: string};

				return (
					<Link to={`/auth/user/${id}/edit`}>
						<IconButton>
							<EditIcon style={{color: '#666'}} />
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
				let {id, blocked} = params.value?.valueOf() as {
					id: string;
					blocked: boolean;
				};

				const onClick = () => {
					if(blocked) {
						getCollection('users').doc(id).update({
							blocked: false
						});
					} else {
						getCollection('users').doc(id).update({
							blocked: true
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

	const rows = users.map((user: User) => {
		const {uid, user_name, email, role, blocked} = user;

		return {
			id: uid,
			user_name,
			email,
			role,
			view: {id: uid, role},
			edit: {id: uid},
			blocked: {id: uid, blocked},
		};
	});

	return (
		<Container>
			<Box my={2} display="flex">
				<Button
					component={Link}
					to="/auth/create/user"
					size="small"
					variant="outlined">
					Add new user
				</Button>
			</Box>
			<Box my={3}>
				<div style={{minHeight: '400px', width: '100%'}}>
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
				</div>
			</Box>
		</Container>
	);
};

export default UserList;
