import React from 'react';
import {useHistory, useParams} from 'react-router';
import {Box, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useFireDoc} from '../../hooks/useFirestore';
import OverlayLoading from '../../components/shared/OverlayLoading';
import { IProduct } from 'features/product/types';

const useStyles = makeStyles({
	root: {
		maxWidth: 600,
		margin: 'auto',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
	},
	end: {
		flex: 1,
		alignSelf: 'end',
		justifySelf: 'flex-end',
	},
});

const ProductDetial = () => {
	const classes = useStyles();
	// const {id} = useParams();
	const history = useHistory();

	// const {data: product, loading} = useFireDoc<IProduct>('products', id);
	// console.log('The F Data: ', data, loading);

	return (
		<div>
			{/* {loading ? (
				<OverlayLoading />
			) : (
					<Card className={classes.root}>
						<CardActionArea style={{flex: '3'}}>
							<CardMedia
								component="img"
								alt="Contemplative Reptile"
								height="240"
								image={product.thumbnail}
								title="Contemplative Reptile"
							/>
							<CardContent>
								<Typography gutterBottom variant="h6" component="h6">
									<b>{product.name}</b>
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{product.description}
								</Typography>
							</CardContent>
						</CardActionArea>
						<Box className={classes.end}>
							<CardActions>
								<Button
									variant="outlined"
									onClick={() => {
										// FB.getInstance().db.collection('products').doc(id).delete().then(() => {
										// 	history.push('/product')
										// })
									}}>
									Delete Product
								</Button>
							</CardActions>
						</Box>
					</Card>
			)} */}
		</div>
	);
};

export default ProductDetial;
