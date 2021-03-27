import * as React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import { Box, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import OverlayLoading from 'components/shared/OverlayLoading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { fetchUsers, setLastUserDoc } from 'features/admin';
import { User } from 'features/user/types';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Id', width: 200 },
	{ field: 'user_name', headerName: 'Name', width: 180 },
	{ field: 'email', headerName: 'Email', width: 180 },
	{ field: 'role', headerName: 'User Role', width: 180, },
	{ field: 'view', headerName: 'Views', width: 180, type: 'number' },
	// photo: string;
	// isOnline: boolean;
];

const UserList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const users = useSelector((state: RootState) => state.admin.users);

	React.useEffect(() => {
		if (users.length) {
			const lastDoc = users[users.length - 1]
			dispatch(setLastUserDoc(lastDoc))
		}
		dispatch(fetchUsers())
	}, [])


	const fetchPaginatedData = (params: any) => {
		if (users.length) {
			const lastDoc = users[users.length - 1]
			dispatch(setLastUserDoc(lastDoc))
		}
		dispatch(fetchUsers())
	}

	const handleDelete = () => {
		alert('delete Here')
	}


	const getData = (users: User[]) => {
		if (users) {
			return users.map((user: User, id: number) => ({
				id: user.uid,
				user_name: user.user_name,
				email: user.email,
				role: user.role,
				view: user.view,
				createdAt: new Date().toTimeString(),
				updatedAt: new Date().toTimeString()
			}));
		} else {
			return [];
		}
	};

	return (
		<div style={{ maxHeight: '80vh', width: '90%', margin: 'auto' }}>
			{users.length ? (
				<>
					<Box my={2} display="flex">
						<Button
							component={Link}
							to="/auth/create/user"
							size="small"
							variant="outlined">
							Add new user
						</Button>
					</Box>
					{users.length && (
						<>
							<DataGrid
								rows={getData(users)}
								columns={columns}
								pageSize={7}
								autoHeight
								checkboxSelection={false}
								onPageChange={() => {
									alert('paginate')
								}}
								onRowClick={(param: GridRowParams, event: React.MouseEvent) => {
									const id = param.id;
									const columns = param.columns;
									const data = param.row;
									history.push(`/auth/users/${data.id}`)
									// setCurrentEditData(data)
								}}
							/>
						</>
					)}
				</>
			) : (
				<OverlayLoading />
			)}
		</div>
	);
};

export default UserList;
