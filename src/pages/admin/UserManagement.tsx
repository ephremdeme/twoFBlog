import * as React from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {useFireCollection, useFireCollectionRef} from 'hooks/useFirestore';
import {PDB} from 'features/product/init';
import {selectProducts, setProducts} from 'features/product';
import {getDatabase, useAppSelector, useFirestore} from 'app/hooks';
import {IProduct} from 'features/product/types';
import {Box, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import OverlayLoading from 'components/shared/OverlayLoading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { fetchUsers } from 'features/admin/actions';
import { User } from 'features/user/types';


const columns: GridColDef[] = [
	{field: 'id', headerName: 'Id', width: 80},
	{field: 'user_name', headerName: 'Name', width: 180},
	{field: 'email', headerName: 'Email', width: 180},
	{field: 'role', headerName: 'User Role', width: 180,},
	{field: 'view', headerName: 'Views', width: 180, type: 'number'},
	// photo: string;
	// isOnline: boolean;
];

const AdminList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.admin.users);
	const blogs = useAppSelector(selectProducts);
	const blogCollRef = useFirestore().collection(PDB.PRODCUTS);
	const {data: RefData} = useFireCollectionRef<IProduct>(
		blogCollRef,
		setProducts
	);

  React.useEffect(() => {
    dispatch(fetchUsers())
  }, [])

	const getData = (users: User[]) => {
		if (users) {
			return users.map((user: User, id: number) => ({
				id: id + 1,
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
		<div style={{height: 400, width: '90%', margin: 'auto'}}>
			{blogs.length ? (
				<>
					<Box m={3} display="flex">
						<Button
							component={Link}
							to="/users/create"
							size="small"
							variant="outlined">
							Add new user
						</Button>
					</Box>
					{blogs.length && (
						<DataGrid
							rows={getData(users)}
							columns={columns}
							pageSize={5}
							checkboxSelection
						/>
					)}
				</>
			) : (
				<OverlayLoading />
			)}
		</div>
	);
};

export default AdminList;
