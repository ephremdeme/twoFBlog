import React, {useState, useEffect} from 'react';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import {
	fetchProducts,
	selectProducts,
	selectLoading,
} from '../../features/product';
import {useSelector, useDispatch} from 'react-redux';

import Page from '../../components/shared/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100%',
		paddingBottom: theme.spacing(3),
		paddingTop: theme.spacing(3),
	},
	productCard: {
		height: '100%',
	},
}));

const ProductList = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const products = useSelector(selectProducts);
	const loading = useSelector(selectLoading);

	useEffect(() => {
		console.log('now....');
		dispatch(fetchProducts());

		return () => {};
	}, []);

	return (
		<Page title="Products">
			{loading ? (
				<h1>Loading prodcuts...</h1>
			) : (
				<Container maxWidth={false}>
					<Toolbar />
					<Box mt={3}>
						<Grid container spacing={3}>
							{products.map((product) => (
								<Grid item key={product.id} lg={4} md={6} xs={12}>
									<ProductCard
										className={classes.productCard}
										product={product}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</Container>
			)}
		</Page>
	);
};

export default ProductList;
