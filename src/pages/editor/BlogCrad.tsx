import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useSpring, animated } from 'react-spring'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import './styles.css'

const useStyles = makeStyles({
	cardIcons: {
        float: 'right'
    },
	root: {
        maxWidth: 383,
	},
	media: {
		height: 100,
		paddingTop: '56.25%',	
	},
	avatar: {
		backgroundColor: red[500],
	  },
	rootDiv: {
		paddingTop: '5%'
	},
});
const calc = (x: number, y: number) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x: number, y: number, s: number) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

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
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
 

	return (
        <div className={classes.rootDiv}>
            <animated.div
                className="card"
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                // style={{ transform: props.xys.interpolate(trans) }}
            >
		<Card className={classes.root}>
			<CardHeader
			 avatar={
				<Avatar aria-label="recipe" className={classes.avatar}>
				  G
				</Avatar>
			  }
			  title={blog.title}
			  subheader={blog.authorId}
			>
				
			</CardHeader>
			<CardMedia
					className={classes.media}
					image={blog.coverImageUrl}
					title="Contemplative Reptile"
				/>
			<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
                        {blog.date}
					</Typography>
			</CardContent>
            <CardActions className={classes.cardIcons}>
                <Link to={'/blogs/' + blog.id}>
                    <IconButton >
                        <VisibilityIcon style={{ color: 'skyblue'}} />
                    </IconButton>
                </Link>
                <IconButton >
                    <DeleteIcon style={{ color: 'red'}} />
                </IconButton>
            </CardActions>
		</Card>
        </animated.div>
        </div>
	);
};