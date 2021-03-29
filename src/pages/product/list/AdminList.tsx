import * as React from 'react';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {useFireCollection, useFireCollectionRef} from 'hooks/useFirestore';
import {PDB} from 'features/product/init';
import {selectProducts, setProducts} from 'features/product';
import {getDatabase, useAppSelector, useFirestore} from 'app/hooks';
import {IProduct} from 'features/product/types';
import firebase from 'firebase';
import {Box, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import OverlayLoading from 'components/shared/OverlayLoading';


const columns: GridColDef[] = [
	{field: 'id', headerName: 'Id', width: 80},
	{field: 'name', headerName: 'Name', width: 180},
	{field: 'description', headerName: 'description', width: 180},
	{field: 'qty', headerName: 'qty', width: 180, type: 'number'},
	{field: 'price', headerName: 'price', width: 180, type: 'number'},
	{field: 'currency', headerName: 'currency', width: 180},
	{field: 'ratingReview', headerName: 'ratingReview', width: 180},
	{field: 'catagory', headerName: 'catagory', width: 180},
	{field: 'brand', headerName: 'brand', width: 180},
	{field: 'condition', headerName: 'condition', width: 180},
	{field: 'createdAt', headerName: 'createdAt', width: 180},
	{field: 'updatedAt', headerName: 'updatedAt', width: 180},
];

const AdminList = () => {
	const blogs = useAppSelector(selectProducts);
	const blogCollRef = useFirestore().collection(PDB.PRODCUTS);
	const {data: RefData} = useFireCollectionRef<IProduct>(
		blogCollRef,
		setProducts
	);

	const getData = (blogs: any) => {
		if (blogs) {
			return blogs.map((blog: any, id: number) => ({
				id: id + 1,
				name: blog.name,
				description: blog.description,
				qty: blog.qty,
				price: blog.price,
				currency: blog.currency,
				ratingReview: blog.ratingReview,
				catagory: blog.catagory,
				brand: blog.brand,
				condition: blog.condition,
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
