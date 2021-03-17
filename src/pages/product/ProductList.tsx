import React from 'react';
import {useFirestore} from 'app/hooks';
import Page from 'components/shared/Page';
import {selectFilteredProducts, setProducts} from 'features/product';
import {IProduct} from 'features/product/types';
import {useFireCollectionRef} from 'hooks/useFirestore';
import {useSelector} from 'react-redux';
import ProductListUser from './user/ProductListUser';
import ProductCardLoading from './user/ProductCardLoading';
import {Container} from '@material-ui/core';
import OverlayLoading from '../../components/shared/OverlayLoading';

const ProductList = () => {
	const productData = useSelector(selectFilteredProducts);
	const productsRef = useFirestore().collection('products');
	const {data, loading} = useFireCollectionRef<IProduct>(productsRef);

	console.log('Data: ', data)

	return (
		<Page title="Products">
			<Container>
				{loading ? (
					<>
						<OverlayLoading />
						<ProductCardLoading loading={loading} items={15} />
					</>
				) : (
					<ProductListUser products={data} />
				)}
			</Container>
		</Page>
	);
};

export default ProductList;
