import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		maxHeight: 340,
		minHeight: 340,
		overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
	},
  end: {
    flex: 1,
    alignSelf: 'end',
    justifySelf: 'flex-end'
  }
});

const ProductCard = ({className, product, ...rest}: any) => {
	const classes = useStyles();
  const {url} = useRouteMatch()

	return (
		<Card className={classes.root}>
			<CardActionArea style={{flex: '3'}}>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={product.image}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="h6">
						<b>{product.name}</b>
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{product.product_description.slice(0, 30)}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Box className={classes.end}>
				<CardActions>
					<Button variant="outlined" component={Link} to={`${url}/${product.id}/detail`}>
						See Detail
					</Button>
				</CardActions>
			</Box>
		</Card>
	);
};

export default ProductCard;
