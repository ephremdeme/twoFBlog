import React from 'react';
import {Grid, Container, Box} from '@material-ui/core';
import ProductCard from './ProductCard';
import { IProduct } from 'features/product/types';

interface IProps {
	products: IProduct[]
}

const ProductListUser:React.FC<IProps> = ({products}) => {
	return (
		<Container maxWidth={false}>
			<Box mt={3}>
				<Grid container spacing={3}>
					{products.map((product: any) => (
						<Grid item key={product.id} lg={3} md={4} xs={12}>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default ProductListUser;