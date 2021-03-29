import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {red} from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useSpring, animated} from 'react-spring';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import './styles.css';
import {IBlog} from 'features/editor';
import {useSelector} from 'react-redux';
import {useFireDelete} from 'hooks/useFirestore';
import EditorBackdrop from './EditorBackdrop';
import {RootState} from 'app/store';
import {useImageDirDelete} from 'hooks/useStorage';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		cardIcons: {
			float: 'right',
			marginLeft: '60%',
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
			paddingTop: '5%',
		},
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	})
);

const calc = (x: number, y: number) => [
	-(y - window.innerHeight / 4) / 200,
	(x - window.innerWidth / 4) / 200,
	1.1,
];
const trans = (x: number, y: number, s: number) =>
	`perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export const BlogCard: React.FC<{
	blog: IBlog;
}> = ({blog}) => {
	const classes = useStyles();
	// console.log(blog);
	const [props, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: {mass: 1, tension: 150, friction: 20},
	}));

	const {loading, deleteDoc} = useFireDelete('blogs');

	const user = useSelector((state: RootState) => state.auth);

	const {handleDirDelete} = useImageDirDelete('images/');

	return (
		<div className={classes.rootDiv}>
			<animated.div
				className="card"
				onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
				onMouseLeave={() => set({xys: [0, 1, 1]})}
				// @ts-ignore
				style={{transform: props.xys.interpolate(trans)}}>
				<Card className={classes.root}>
					<CardHeader
						// avatar={
						// 	<Avatar aria-label="recipe" className={classes.avatar}>
						// 		G
						// 	</Avatar>
						// }
						title={blog.title}
						subheader={'By ' + blog.author?.user_name}></CardHeader>
					<CardMedia
						className={classes.media}
						image={blog.coverImageUrl}
						title="Contemplative Reptile"
						to={'/blogs/' + blog.id}
						component={Link}
					/>
					<CardContent>
						{/* <Typography variant="body1" color="textSecondary" component="p">
							By <strong>{blog.author?.user_name}</strong>
						</Typography> */}
						<Typography variant="body2">
							Published on <strong>{blog.date}</strong>
						</Typography>
					</CardContent>
					<CardActions className={classes.cardIcons}>
						<Link to={'/blogs/' + blog.id}>
							<IconButton>
								<VisibilityIcon style={{color: 'skyblue'}} />
							</IconButton>
						</Link>
						{(user.role === 'BLOGGER' || user.role === 'ADMIN') && (
							<IconButton
								disabled={loading}
								onClick={(e) => {
									deleteDoc(blog.id);
									handleDirDelete(blog.id);
								}}>
								<DeleteIcon style={{color: 'red'}} />
								<EditorBackdrop loading={loading} />
							</IconButton>
						)}
					</CardActions>
				</Card>
			</animated.div>
		</div>
	);
};
