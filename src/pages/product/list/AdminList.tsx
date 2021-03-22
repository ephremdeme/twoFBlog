import * as React from 'react';
import {DataGrid, GridColDef, ValueGetterParams} from '@material-ui/data-grid';
import {useFireCollection, useFireCollectionRef} from 'hooks/useFirestore';
import {PDB} from 'features/product/init';
import {selectProducts, setProducts} from 'features/product';
import {getDatabase, useAppSelector, useFirestore} from 'app/hooks';
import {IProduct} from 'features/product/types';
import firebase from 'firebase'

// { field: 'uid', headername: 'Uid', width: 80 },
// { field: 'sid', headername: 'sid', width: 80 },

const columns: GridColDef[] = [
	{field: 'id', headerName: 'Id', width: 80},
	{field: 'name', headerName: 'Name', width: 180},
	{field: 'description', headerName: 'description', width: 180},
	{field: 'qty', headerName: 'qty', width: 180},
	{field: 'price', headerName: 'price', width: 180},
	{field: 'currency', headerName: 'currency', width: 180},
	{field: 'ratingReview', headerName: 'ratingReview', width: 180},
	{field: 'catagory', headerName: 'catagory', width: 180},
	{field: 'brand', headerName: 'brand', width: 180},
	{field: 'condition', headerName: 'condition', width: 180},
	{field: 'createdAt', headerName: 'createdAt', width: 180},
	{field: 'updatedAt', headerName: 'updatedAt', width: 180},

	// {
	//   field: 'fullName',
	//   headerName: 'Full name',
	//   description: 'This column has a value getter and is not sortable.',
	//   sortable: false,
	//   width: 160,
	//   valueGetter: (params: ValueGetterParams) =>
	//     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
	// },
];


const AdminList = () => {
  const blogs = useAppSelector(selectProducts);
	const blogCollRef = useFirestore().collection(PDB.PRODCUTS);
	const {data: RefData} = useFireCollectionRef<IProduct>(
    blogCollRef,
		setProducts
  );

  const t = firebase.firestore.Timestamp;
  
  const getData = (blogs: any) => {
    if(blogs) {
      return blogs.map((blog:any, id: number) => ({
        id: id+1,
        name: blog.name,
        description: blog.description,
        qty: blog.qty,
        price: blog.price,
        currency: blog.currency,
        ratingReview: blog.ratingReview,
        catagory: blog.catagory,
        brand: blog.brand,
        condition: blog.condition,
        createdAt: firebase.firestore.Timestamp.fromDate(blog.createdAt).toDate(),
        updatedAt: firebase.firestore.Timestamp.fromDate(blog.updatedAt).toDate()
      }))
    } else {
      return []
    }
  }

  console.log('BLGOS BLOGS: ', getData(blogs));

	return (
		<div style={{height: 400, width: '100%'}}>
			{blogs.length && <DataGrid rows={getData(blogs)} columns={columns} pageSize={5} checkboxSelection />}
		</div>
	);
};

export default AdminList;
