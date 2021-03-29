import * as React from 'react';
import {
	DataGrid,
	GridColDef,
	GridPageChangeParams,
	GridRowParams,
} from '@material-ui/data-grid';
import {Box, Button} from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';
import OverlayLoading from 'components/shared/OverlayLoading';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {fetchUsers} from 'features/admin';
import {User} from 'features/user/types';
import {getCollection} from 'app/hooks';
import {collection} from 'rxfire/firestore';
import {map} from 'rxjs/operators';
import LoadingOnly from 'components/shared/LoadingOnly';

const columns: GridColDef[] = [
	{field: 'id', headerName: 'Id', width: 200},
	{field: 'user_name', headerName: 'Name', width: 180},
	{field: 'email', headerName: 'Email', width: 180},
	{field: 'role', headerName: 'User Role', width: 180},
	{field: 'view', headerName: 'Views', width: 180, type: 'number'},
	// photo: string;
	// isOnline: boolean;
];

const UserList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const users = useSelector((state: RootState) => state.admin.users.users);
	const [users, setUsers] = React.useState<any[]>([]);
	const lastDoc = useSelector((state: RootState) => state.admin.users.lastDoc);
	const [nextPagenatedData, setNextPagenatedData] = React.useState<any | null>(
		null
	);
	const [prevPagenatedData, setPrevPagenatedData] = React.useState<any | null>(
		null
	);
	const [loading, setLoading] = React.useState(false);
	const [page, setPage] = React.useState(0);

	const getUserData = (users$: any) => {
		setLoading(true);

		collection(users$)
			.pipe(
				map((docs) => {
					setPrevPagenatedData(docs[0]);
					setNextPagenatedData(docs[docs.length - 1]);
					return docs.map((doc) => doc.data());
				})
			)
			.subscribe((data) => {
				console.log('FIREBASE PAGINATED DATA: ', data);
				setUsers(data);
				setLoading(false);
			});
	};

	React.useEffect(() => {
		const users$ = getCollection('users')
			.orderBy('user_name')
			.startAfter(0)
			.limit(7);
		getUserData(users$);
	}, []);

	const fetchPaginatedData = (params: GridPageChangeParams) => {
		console.log('PAGINATION DATA: ', params);
		console.log('now fire the beatch', lastDoc);

		if (params.page > page) {
			setPage(page);
			const users$ = getCollection('users')
				.orderBy('user_name')
				.startAfter(nextPagenatedData)
				.limit(7);
			getUserData(users$);
		} else if (params.page < page) {
			setPage(page);
			const users$ = getCollection('users')
				.orderBy('user_name')
				.endBefore(prevPagenatedData)
				.limitToLast(7);
			getUserData(users$);
		} else {
			setPage(page);
			return;
		}
	};

	const handleDelete = () => {
		alert('delete Here');
	};

	const getData = (users: User[]) => {
		if (users) {
			return users.map((user: User, id: number) => ({
				id: user.uid,
				user_name: user.user_name,
				email: user.email,
				role: user.role,
				view: user.view,
				createdAt: new Date().toTimeString(),
				updatedAt: new Date().toTimeString(),
			}));
		} else {
			return [];
		}
	};

	return (
		<div style={{maxHeight: '80vh', width: '90%', margin: 'auto'}}>
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
								pagination
								rowCount={100}
								loading={loading}
								paginationMode="server"
								checkboxSelection={false}
								onPageChange={fetchPaginatedData}
								onRowClick={(param: GridRowParams, event: React.MouseEvent) => {
									const id = param.id;
									const columns = param.columns;
									const data = param.row;
									history.push(`/auth/user/${data.id}`);
									// setCurrentEditData(data)
								}}
							/>
						</>
					)}
				</>
			) : (
				<LoadingOnly size={50} /> 
			)}
		</div>
	);
};

export default UserList;
