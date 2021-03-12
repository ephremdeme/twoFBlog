import React, {useEffect} from 'react';
import {
	fetchProducts,
	selectFilterableProducts,
	selectLoading,
} from '../../features/product';
import Toolbar from './Toolbar';
import {useSelector, useDispatch} from 'react-redux';
import Page from '../../components/shared/Page';
import ProductListAdmin from './admin/ProductListAdmin';
import ProductListUser from './user/ProductListUser';
import data from './data';

const ProductList = () => {
	const dispatch = useDispatch();
	// const products = useSelector(selectFilterableProducts);
	// dummy data load
	const products = data;
	const loading = useSelector(selectLoading);
	const isAdmin = false;

	useEffect(() => {
		dispatch(fetchProducts());
		return () => {};
	}, []);

	return (
		<Page title="Products">
			{loading ? (
				<h1>Loading prodcuts...</h1>
			) : (
				<>
					<Toolbar backbtn={false} />
					{!isAdmin ? (
						<ProductListUser products={products} />
					) : (
						<ProductListAdmin products={products} />
					)}
				</>
			)}
		</Page>
	);
};

export default ProductList;
