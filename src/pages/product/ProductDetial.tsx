import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';
import FB from '../../firebase/firebase';

import {Box, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link, useRouteMatch} from 'react-router-dom';

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
	const {id} = useParams();
	const [product, setProduct] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const history = useHistory()

	useEffect(() => {
		const fetchPord = async () => {
			setLoading(true);
			const docs: any = await FB.getInstance()
				.db.collection('products')
				.doc(id)
				.get();
			const data = docs.data();
			setProduct(data);
			setLoading(false);
		};
		fetchPord();
	}, []);

	return (
		<div>
			{loading ? (
				<h1>Loading... product detail</h1>
			) : (
				<Card className={classes.root}>
					<CardActionArea style={{flex: '3'}}>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="240"
							image={product.image}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h6" component="h6">
								<b>{product.name}</b>
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{product.product_description}
							</Typography>
						</CardContent>
					</CardActionArea>
					<Box className={classes.end}>
				<CardActions>
					<Button variant="outlined" onClick={() => {
						FB.getInstance().db.collection('products').doc(id).delete().then(() => {
							history.push('/product')
						})
					}}>
						Delete Product
					</Button>
				</CardActions>
			</Box>
				</Card>
			)}
		</div>
	);
};

export default ProductDetial;
