import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { IProduct } from 'features/product/types';
import { Link } from 'react-router-dom';
interface ProductCard {
	product: IProduct
}

const ProductCard = ({ product }: ProductCard) => {
	return (
		<Grid container>
			<Box width={210} marginRight={0.87} my={5}>
				<img
					style={{width: 210, height: 118}}
					alt={product.name}
					src={product.thumbnail}
				/>
				<Box pr={2}>
					<Link to={`/products/${product.id}/detail`}>
					<Typography gutterBottom variant="body2">
						{product.name}
					</Typography>
					</Link>
					<Typography display="block" variant="caption" color="textSecondary">
						{product.currency} {product.price}
					</Typography>
					<Typography variant="caption" color="textSecondary">
						{product.description.slice(0,25)}...
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
}

export default ProductCard