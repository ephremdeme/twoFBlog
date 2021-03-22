import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {IProduct} from 'features/product/types';
import {Link} from 'react-router-dom';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		prodImage: {
			maxWidth: 210,
			maxHeight: 158,
			margin: 'auto',
			borderRadius: '10px',
			boxShadow: '0 0 5px rgba(0,0,0,0.1)',
		},
	})
);

interface ProductCard {
	product: IProduct;
}

const ProductCard = ({product}: ProductCard) => {
	const classes = useStyles();
	const theme = useSelector((state: RootState) => state.app.appTheme);

	return (
		<Grid container>
			<Box minWidth={210} marginRight={0.47} my={1}>
				<Box display="flex" justifyContent="center">
					<img
						className={classes.prodImage}
						alt={product.name}
						src={product.thumbnail}
					/>
				</Box>
				<Box pr={2}>
					<Link
						to={`/products/${product.id}/detail`}
						style={{
							textDecoration: 'none',
							color: theme ? 'white' : '#212121',
						}}>
						<Typography gutterBottom variant="body2">
							{product.name}
						</Typography>
					</Link>
					<Typography display="block" variant="caption" color="textSecondary">
						{product.currency} {product.price}
					</Typography>
					<Typography variant="caption" color="textSecondary">
						{product.description.slice(0, 25)}...
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

export default ProductCard;
