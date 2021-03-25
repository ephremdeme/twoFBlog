import React, {useEffect} from 'react';
import Page from 'components/shared/Page';
import {Box, Container, Grid} from '@material-ui/core';
import MiniLoader from '../../../components/shared/MiniLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
	fetchProducts,
	selectFilterableProducts,
	selectLoadingProducts,
	selectProdcutsLoaded,
} from 'features/product';
import ProductListUser from '../user/ProductListUser';
import ProductCardLoading from '../user/ProductCardLoading';
import ProductFilters from './ProductFilters';

const ProductList = () => {
	const products = useSelector(selectFilterableProducts);
	const productsLoaded = useSelector(selectProdcutsLoaded);
	const loadingProducts = useSelector(selectLoadingProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<Page title="Products">
			<Container>
				{loadingProducts && <MiniLoader />}
				{!productsLoaded && <ProductCardLoading loading={true} items={15} />}
				<Grid container spacing={2}>
					<Grid item xs={12} md={9}>
						<ProductListUser products={products} />
					</Grid>
					<Grid item xs={12} md={3}>
						{products && (
							<Box m={2} minWidth="300px">
								<ProductFilters />
							</Box>
						)}
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default ProductList;
