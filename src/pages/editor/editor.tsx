import {Editor, Element, Frame, useEditor} from '@craftjs/core';
import {
	Container as MuiContainer,
	Typography,
	makeStyles,
	Theme,
	createStyles,
	CssBaseline,
	Grid,
} from '@material-ui/core';
import {Container} from '../../components/selectors/Container';
import Divider from '../../components/selectors/Divider';
import {CoverImage, Image} from '../../components/user/image/image';
import TitleInput from '../../components/user/text/TitleInput';
import {Video} from '../../components/user/video/video';
import NavBar from '../../layouts/editor/appbar';
import MiniDrawer from '../../layouts/editor/drawer';
import React, {useEffect, useState} from 'react';
import RenderNode from '../../components/user/RenderNode';
import {TextEditAble} from '../../components/user/text/Text';
import lz from 'lzutf8';
import {
	IBlog,
	selectBlog,
	selectBlogs,
	setBlog,
	setEditBlog,
} from '../../features/editor';
import Viewport from 'components/selectors/Viewport';
import {RootState} from 'app/store';
import {useDispatch, useSelector} from 'react-redux';
import {BlogCard} from '../blogs/BlogCard';
import {useCollection} from 'app/hooks';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			boxShadow:
				'0 8px 60px 0 rgb(103 151 255 / 11%), 0 12px 90px 0 rgb(103 151 255 / 11%)',
			marginBottom: '4vh',
			marginTop: '4vh',
			[theme.breakpoints.down('lg')]: {
				// marginLeft: '95px',
				maxWidth: '80%',
				// margin: '20px',
			},
		},
		title: {
			paddingTop: '10px',
			paddingBottom: '10px',
			width: '100%',
		},
		author: {
			fontSize: '1.1em',
			maxWidth: '850px',
			color: '#6d7c90',
			marginTop: '40px',
		},
		coverImage: {
			marginTop: '20px',
			textAlign: 'center',
			width: '100%',
		},
	})
);

const EditorPage: React.FC<{
	edit: boolean;
	blog?: IBlog;
	deleteAble?: boolean;
}> = ({edit, deleteAble, blog}) => {
	const resolvers = {
		TextEditAble,
		Image,
		Video,
		Divider,
		Container,
		CoverImage,
		TitleInput,
	};
	const classes = useStyles();

	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.auth);
	const userColl = useCollection('blogs');

	const blogs = useSelector(selectBlogs);
	const blogEd = useSelector(selectBlog);

	useEffect(() => {
		if (edit) {
			if (!blog?.published)
				dispatch(
					setEditBlog({
						key: 'published',
						value: user.role === 'EDITOR',
					})
				);
			return;
		}
		if (edit === undefined) {
			dispatch(
				setBlog({
					id: userColl.doc().id,
					title: '',
					blogHash: '',
					date: new Date().toDateString(),
					coverImageUrl: '',
					authorId: user.uid,
					published: user.role === 'EDITOR',
				})
			);
		}
	}, []);

	useEffect(() => {
		dispatch(
			setEditBlog({
				key: 'authorId',
				value: blog?.authorId ? (blog?.authorId as string) : user.uid,
			})
		);
	}, []);

	const json = lz.decompress(lz.decodeBase64(blog?.blogHash as string));

	const handleChange = (key: string, value: string) => {
		// setValues({
		// 	...values,
		// 	[key]: value,
		// });
		// console.log({...values, [key]: value});
	};

	const [enabled, setEnabled] = useState(edit === undefined ? true : edit);

	useEffect(() => {
		setEnabled(edit === undefined ? true : edit);
		console.log(edit, 'Edit');
	}, [edit]);

	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<CssBaseline />
			{(edit || edit === undefined) && (
				<NavBar
					enabled={enabled}
					deleteAble={deleteAble}
					setEnable={setEnabled}
					handleChange={handleChange}
					values={blogEd}
				/>
			)}
			{enabled && (edit || edit === undefined) && <MiniDrawer />}

			<MuiContainer maxWidth={'lg'} className={classes.main} disableGutters>
				<Viewport>
					<Frame data={json}>
						<Element
							canvas
							is={Container}
							id="parent"
							width="100%"
							height="auto"
							flexDirection="column"
							padding={['30', '30', '30', '30']}>
							<Element
								id="titleinputid"
								is={TitleInput}
								placeholder="Title ....."
								value={blogEd.title}
							/>
							<CoverImage
								handleChange={handleChange}
								imageUrl={blog?.coverImageUrl}
							/>
							{/* <div className={classes.coverImage}>
							</div> */}
						</Element>
					</Frame>
				</Viewport>
			</MuiContainer>
			{!enabled && (
				<MuiContainer>
					<Typography align="center" variant="subtitle1">
						Related Blogs
					</Typography>
					<Grid container spacing={5}>
						{blogs.slice(0, 3).map((blog: IBlog) => (
							<Grid item md={4} key={blog.id}>
								<BlogCard blog={blog} />
							</Grid>
						))}
					</Grid>
				</MuiContainer>
			)}

			<EditEnabler edit={edit} setEnable={setEnabled} />
		</Editor>
	);
};

export const EditEnabler: React.FC<{
	edit: boolean;
	setEnable: (enabled: boolean) => void;
}> = ({edit, setEnable}) => {
	const {actions, enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}));

	useEffect(() => {
		if (!edit && edit !== undefined) {
			actions.setOptions((options) => (options.enabled = false));
			setEnable(enabled);
		}
	}, []);
	return <></>;
};

export default EditorPage;
