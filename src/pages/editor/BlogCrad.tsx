import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

export const BlogCard: React.FC<{
	blog: {
		id: string;
		title: string;
		coverImageUrl: string;
		authorId: string;
		date: string;
	};
}> = ({blog}) => {
	const classes = useStyles();
	console.log(blog);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={blog.coverImageUrl}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{blog.title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{/* By <strong>{blog.authorId}</strong> {blog.date} */}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Link color="primary" to={'/blogs/' + blog.id}>
					Edit
				</Link>
				<Button size="small" color="default">
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};
