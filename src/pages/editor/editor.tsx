import {Editor, Element, Frame, useEditor} from '@craftjs/core';
import {
	Container as MuiContainer,
	Typography,
	makeStyles,
	Theme,
	createStyles,
	CssBaseline,
} from '@material-ui/core';
import {Container} from '../../components/selectors/Container';
import Divider from '../../components/selectors/Divider';
import {CoverImage, Image} from '../../components/user/image/image';
import TitleInput from '../../components/user/text/TitleInput';
import {Video} from '../../components/user/video/video';
import NavBar from '../../layouts/editor/appbar';
import MiniDrawer from '../../layouts/editor/drawer';
import React, {useState} from 'react';
import RenderNode from '../../components/user/RenderNode';
import {TextEditAble} from '../../components/user/text/Text';
import lz from 'lzutf8';
import {IBlog} from '../../features/editor';
import Viewport from 'components/selectors/Viewport';
import {RootState} from 'app/store';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		main: {
			boxShadow:
				'0 8px 60px 0 rgb(103 151 255 / 11%), 0 12px 90px 0 rgb(103 151 255 / 11%)',
			marginBottom: '40vh',
			[theme.breakpoints.down('lg')]: {
				marginLeft: '95px',
				maxWidth: '90%',
			},
		},
		title: {
			marginTop: '50px',
			marginBottom: '70px',
			paddingTop: '10px',
			paddingBottom: '10px',
		},
		author: {
			fontSize: '1.1em',
			maxWidth: '850px',
			color: '#6d7c90',
			marginTop: '40px',
		},
		coverImage: {
			marginTop: '20px',
		},
		Container: {
			// background: theme.palette.,
		},
	})
);

const EditorPage: React.FC<{edit: boolean; blog?: IBlog}> = ({edit, blog}) => {
	const resolvers = {TextEditAble, Image, Video, Divider, Container};
	const classes = useStyles();

	// const hashed = `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`;
	// console.log('Equal', blog?.blogHash === hashed);

	const user = useSelector((state: RootState) => state.auth);

	const [values, setValues] = useState<IBlog>({
		id: blog?.id ? blog.id : '',
		title:
			(blog?.title as string) || 'Here is all the features being tested out',
		coverImageUrl: blog?.coverImageUrl as string,
		blogHash: (blog?.blogHash as string) || '',
		authorId: (blog?.authorId as string) || 'jkjkjkjkjkjkjkjkj',
		date: blog?.date
			? new Date(blog?.date as string).toDateString()
			: new Date().toDateString(),
	});

	const json = lz.decompress(lz.decodeBase64(blog?.blogHash as string));

	const handleChange = (key: string, value: string) => {
		setValues({
			...values,
			[key]: value,
		});
	};

	console.log('Editor', blog, edit);

	const [enabled, setEnabled] = useState(edit === undefined ? true : edit);
	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<CssBaseline />
			<NavBar
				enabled={enabled}
				setEnable={setEnabled}
				handleChange={handleChange}
				values={values}
			/>
			{enabled && <MiniDrawer />}
			<MuiContainer maxWidth={'lg'}>
				<div className={classes.title}>
					{enabled && (
						<TitleInput value={values.title} handleChange={handleChange} />
					)}
					{!enabled && (
						<>
							<Typography variant="h2" align="center">
								{values.title}
							</Typography>
							<Typography
								variant="body1"
								align="center"
								className={classes.author}>
								Posted on Posted on {values.date} by {user.user_name}
							</Typography>
						</>
					)}
				</div>
			</MuiContainer>

			<MuiContainer maxWidth={'lg'} className={classes.main} disableGutters>
				<div className={classes.coverImage}>
					<CoverImage
						handleChange={handleChange}
						imageUrl={blog?.coverImageUrl}
					/>
				</div>
				<Viewport>
					<Frame data={json}>
						<Element
							canvas
							is={Container}
							id="parent"
							width="100%"
							height="auto"
							flexDirection="column"
							padding={['30', '30', '30', '30']}
						/>
					</Frame>
				</Viewport>

				{/* <Grid container spacing={5}>
					<Grid item xs={12} md={12}>
						</Grid>
					<Grid item xs={12} md={2}>
						<Layers expandRootOnLoad={true} />
					</Grid>
				</Grid> */}
			</MuiContainer>
		</Editor>
	);
};

export default EditorPage;
