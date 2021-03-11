import React from 'react';
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
		maxHeight: 260,
		minHeight: 260,
		overflow: 'hidden',
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		borderRadius: 0,
	},
	cardImageContainer: {
		alignSelf: 'start',
	},
	cardImage: {
		maxHeight: '140px',
	},
	center: {
		flexGrow: 1,
	},
});

const ProductCard = ({className, product, ...rest}: any) => {
	const classes = useStyles();
	const {url} = useRouteMatch();

	return (
		<Card className={classes.root} elevation={0}>
			<CardMedia
				component="img"
				alt="Product Image"
				className={classes.cardImage}
				image={product.image}
				title="Product Image"
			/>
			<CardContent className={classes.center}>
				<Box pb={1}>
					<Typography gutterBottom variant="body1" component="p">
						<b>{product.name.slice(0, 20)}</b>
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{product.description.slice(0, 30)}...
					</Typography>
				</Box>
				<Button
					variant="outlined"
					size="small"
					component={Link}
					to={`${url}/${product.id}/detail`}>
					See Detail
				</Button>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
