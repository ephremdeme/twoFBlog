import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {IProduct} from 'features/product/types';
import {Link} from 'react-router-dom';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		productCard: {
			position: 'relative',
			transition: 'all .4s',
			zIndex: 1,
			'&:hover': {
				// transform: 'scale(1.14)',
				boxShadow: '0 0 10px rgba(0,0,0,0.3)',
				transform: 'translateY(-5px)',
				borderRadius: '5px',
				background: theme.palette.background.default,
				// padding: '1rem'
			},
		},
		prodImage: {
			maxWidth: 210,
			maxHeight: 158,
			margin: 'auto',
			borderRadius: '10px',
			boxShadow: '0 0 5px rgba(0,0,0,0.1)',
		},
		child: {
			position: 'absolute',
			display: 'none',
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
			<Link
				to={`/products/${product.id}/detail`}
				style={{
					textDecoration: 'none',
					color: theme ? 'white' : '#212121',
				}}>
				<Box
					minWidth={210}
					marginRight={0.47}
					my={1}
					p={1}
					className={classes.productCard}>
					<Box display="flex" justifyContent="center">
						<img
							className={classes.prodImage}
							alt={product.name}
							src={product.thumbnail}
						/>
						<Box className={classes.child}>Child</Box>
					</Box>
					<Box pr={2}>
						<Typography gutterBottom variant="body2">
							{product.name}
						</Typography>

						<Typography display="block" variant="caption" color="textSecondary">
							{product.currency} {product.price}
						</Typography>
						<Typography variant="caption" color="textSecondary">
							{product.description.slice(0, 25)}...
						</Typography>
					</Box>
				</Box>
			</Link>
		</Grid>
	);
};

export default ProductCard;
