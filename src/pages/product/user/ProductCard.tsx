import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {IProduct} from 'features/product/types';
import {Link} from 'react-router-dom';
import {Chip, createStyles, IconButton, makeStyles, Theme} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {RootState} from 'app/store';
import {AddBoxOutlined} from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		productCard: {
			position: 'relative',
			zIndex: 1,
		},
		prodImage: {
			width: 210,
			maxHeight: 165,
			borderRadius: '5px',
			boxShadow: '0 0 5px rgba(0,0,0,0.1)',
			overflow: 'hidden',
			position: 'relative',
		},
		image: {
			width: '100%',
			height: 'auto',
			transition: 'all .4s',
			'&:hover': {
				transform: 'scale(1.2)',
			},
		},
		child: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			background: 'rgba(0,0,0,0.4)',
			zIndex: 3,
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
					// my={1}
					px={1}
					className={classes.productCard}>
					<Box className={classes.prodImage}>
						<img
							className={classes.image}
							alt={product.name}
							src={product.thumbnail}
						/>
						<Box className={`${classes.child} image_overlay`}>
							<IconButton aria-label="add product to chart">
								<AddShoppingCartIcon />
							</IconButton>
						</Box>
					</Box>
					<Box pr={2}>
						<Box fontSize="1rem" my={1} fontWeight={600}>
							{product.name}
						</Box>

						<Typography display="block" variant="caption" color="textSecondary">
							{product.currency}{' '}
							<Chip
								variant="outlined"
								size="small"
								icon={<LocalOfferIcon />}
								label={product.price}
								clickable
								color="primary"
							/>
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
