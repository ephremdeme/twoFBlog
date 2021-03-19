import React, {useEffect} from 'react';
import Page from 'components/shared/Page';
import {Container} from '@material-ui/core';
import MiniLoader from '../../components/shared/MiniLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
	fetchProducts,
	selectLoadingProducts,
	selectProdcutsLoaded,
	selectProducts,
} from 'features/product';
import ProductListUser from './user/ProductListUser';
import ProductCardLoading from './user/ProductCardLoading';

const ProductList = () => {
	const products = useSelector(selectProducts);
	const productsLoaded = useSelector(selectProdcutsLoaded);
	const loadingProducts = useSelector(selectLoadingProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<Page title="Products">
			<Container>
				{JSON.stringify(productsLoaded)}
				{loadingProducts && <MiniLoader />}
				{!productsLoaded && <ProductCardLoading loading={true} items={15} /> }
				{products && <ProductListUser products={products} />}
			</Container>
		</Page>
	);
};

export default ProductList;
