import * as React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@material-ui/data-grid';
import { useFireCollection, useFireCollectionRef } from 'hooks/useFirestore';
import { PDB } from 'features/product/init';
import { selectProducts, setProducts } from 'features/product';
import { getDatabase, useAppSelector, useFirestore } from 'app/hooks';
import { IProduct } from 'features/product/types';
import firebase from 'firebase';
import { Box, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import OverlayLoading from 'components/shared/OverlayLoading';


const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Id', width: 80 },
	{ field: 'name', headerName: 'Name', width: 180 },
	{ field: 'qty', headerName: 'qty', width: 180, type: 'number' },
	{ field: 'price', headerName: 'price', width: 180, type: 'number' },
	{ field: 'condition', headerName: 'condition', width: 180 },
	{ field: 'catagory', headerName: 'catagory', width: 180 },
];

const AdminList = () => {
	const blogs = useAppSelector(selectProducts);
	const blogCollRef = useFirestore().collection(PDB.PRODCUTS);
	const { data: RefData } = useFireCollectionRef<IProduct>(
		blogCollRef,
		setProducts
	);
	const history = useHistory();

	const getData = (blogs: any) => {
		if (blogs) {
			return blogs.map((blog: any, id: number) => ({
				id: blog.id,
				name: blog.name,
				qty: blog.qty,
				price: blog.price,
				condition: blog.condition,
				catagory: blog.catagory,
			}));
		} else {
			return [];
		}
	};

	return (
		<div style={{ height: 400, width: '90%', margin: 'auto' }}>
			{blogs.length ? (
				<>
					<Box m={3} display="flex">
						<Button
							component={Link}
							to="/products/create"
							size="small"
							variant="outlined">
							Add New Product
						</Button>
						{blogs.length && (
							<Box ml="auto">
								<Button
									component={Link}
									to="/products/create"
									size="small"
									variant="outlined">
									{blogs && blogs.length} Prodcuts Available
								</Button>
							</Box>
						)}
					</Box>
					{blogs.length && (
						<DataGrid
							rows={getData(blogs)}
							columns={columns}
							pageSize={5}
							checkboxSelection
							onRowClick={(param: GridRowParams, event: React.MouseEvent) => {
								const id = param.id;
								const columns = param.columns;
								const data = param.row;
								history.push(`/products/${data.id}/detail`);
								// setCurrentEditData(data)
							}}
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
