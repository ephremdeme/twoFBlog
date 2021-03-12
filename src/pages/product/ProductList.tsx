import React, {useState, useEffect} from 'react';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import {
	fetchProducts,
	selectFilterableProducts,
	selectLoading,
} from '../../features/product';
import {useSelector, useDispatch} from 'react-redux';

import Page from '../../components/shared/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

import data from './data';

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
	// const products = useSelector(selectFilterableProducts);
	// dummy data load
	const products = data;
	const loading = useSelector(selectLoading);

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
					<Container maxWidth={false}>
						<Box mt={3}>
							<Grid container spacing={3}>
								{products.map((product) => (
									<Grid item key={product.id} lg={3} md={4} xs={12}>
										<ProductCard
											className={classes.productCard}
											product={product}
										/>
									</Grid>
								))}
							</Grid>
						</Box>
					</Container>
				</>
			)}
		</Page>
	);
};

export default ProductList;
