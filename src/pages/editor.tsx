import {Editor, Element, Frame} from '@craftjs/core';
import {Layers} from '@craftjs/layers';
import {
	Box,
	Grid,
	Container as MuiContainer,
	Typography,
	makeStyles,
} from '@material-ui/core';
import {Container} from 'components/selectors/Container';
import Divider from 'components/selectors/Divider';
import {CoverImage, Image} from 'components/user/image/image';
import TitleInput from 'components/user/text/TitleInput';
import {Video} from 'components/user/video/video';
import NavBar from 'layouts/editor/appbar';
import MiniDrawer from 'layouts/editor/drawer';
import React, {useState} from 'react';
import RenderNode from '../components/user/RenderNode';
import {Text} from '../components/user/text/Text';
import lz from 'lzutf8';
import {useDispatch} from 'react-redux';
// import {fetchBlogs} from 'features/editor';

const useStyles = makeStyles({
	main: {
		boxShadow:
			'0 8px 60px 0 rgb(103 151 255 / 11%), 0 12px 90px 0 rgb(103 151 255 / 11%)',
	},
	title: {
		marginTop: '50px',
		marginBottom: '50px',
		paddingTop: '10px',
		paddingBottom: '10px',
	},
	author: {
		fontSize: '1.1em',
		maxWidth: '850px',
		color: '#6d7c90',
	},
	coverImage: {
		marginTop: '20px',
	},
});

const EditorPage = () => {
	const resolvers = {Text, Image, Video, Divider, Container};
	const classes = useStyles();

	const hashed =
		'eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWZsZXhEaXJlY3Rpb24iOiJjb2x1bW4iLCJhbGlnbkl0ZW1zIjrFJi1zdGFydCIsImp1c3RpZnnEYGVudNAeZmlsbFNwYWPkAINubyIsInBhZGRpbmciOlsiNDAiLM4FXSwibWFyZ2luxB/EFMoEXSwiYmFja2dyb3VuZOUA4CI6MjU1LCJnxwhixwhhIjoxfSzkALpvcscoMMUmMMUkMMkic2hhZG93xRJyYWRpdXPFC3dpZHRoIjoiOTkwcHgiLCJoZWlnaOQA1zEwMThweOQBPmRpc3BsYXnxAVksImN1c3RvbSI6e30sImhpZGRlbiI6ZmFsc2UsIm5vZGVz5ADXalZiUDFrX01weiIsInNENHlyLXZkSeQA4GxpbmtlZE7GKXt9fSzMLP8B2v8B2vIB2nJvd/8B1/8B1/8B1/8B18cd/wHY/wHY/wHY9QHYMTAwJewB12F1dG//AdX/AdXlAdVjT3dxN2JOT1IiLCJJYkFGVzFsQWdL8wHW5AErcuYBUuUDsuQB5so9/wHm/wHm8gHm/wHj/wHj+QHj5AG7MugByTL/A7j/AeD/AeD/AeDxAeA07gHf5QHv/wHf/wHfOlsibXFFcjNWcU1OSv4B0usDsH0szDb6AdhUZXh07gHTx33pAdR0xCI6IkNyYWZ0LmpzIGlzIGEgUmVhY3QgZnJhbWV3b3JrIGZvciBidWls5AGiIHBvd2VyZnVsICYgZmVhdHVyZS1yaWNoIGRyYWctbi1kcm9wIHBhZ2UgZWRpdG9ycy7kAe9vbnRTaXrkAJMyMyIsxXZB5AI75AJG8QFB5QC2/wE85gE8/gEw6gL6fe0DOP8DCP8DCP8DCP8DCP8DCP8DCP8DCP8DCP8DCP8DCOwDCDb/Awj/Awj2Awh1anRSLUFSSmFz/wMI7QMIyzb/Awj/AwjlAwhFdmVyeXRo5ALoeW91IHNlZSBoZXJlLCBpbmNsdeUDAHRo6ALbLCBpdHNlbGbkAzVtYWRlIG9m5wM7Y29tcG9uZW50cy4gIOkDXGNvbWVzIG9ubHkgd2l0aMVK6QNXYmxvY2tz5QNrYewDQDsgaXQgcHJvdmlkZeQDnOwDZ3N5c3RlbSBhbmQgaGFuZGxlc8VUd2F5IHVzZXIg6wCIIHNob3VsZCBiZSByZW5kZXJlZCwgdXBkYXRlZMVBbW92xBNhbW9uZyBvdGhlciDlAQjkAMI8YnIgLz7IB1lvdSBjb250cm9syW95b3Vy5wCxIGxvb2tzxVRiZWhhdmXvBAExNP8EAf8EAf8EAesCKesD8+QC0ukJDvoCKEltYWdl/gIpc21hbGzJF2Jlc3RGaXTJEGZ1bGxX5gMlxxJpZCI6MTYxNTIwMTI3ODI0M/EA7sV1VXBsb2FkRHJhZ2FibGX/AP3/AP3rCAB9';
	const json = lz.decompress(lz.decodeBase64(hashed));

	const [values, setValues] = useState<any>({
		id: null,
		title: '',
		coverImageUrl: undefined,
		blogHash: null,
		date: new Date().toLocaleDateString(),
	});
	const dispatch = useDispatch();
	// let blogs = dispatch(fetchBlogs());
	const handleChange = (key: string, value: string) => {
		setValues({
			...values,
			[key]: value,
		});
	};

	const [enabled, setEnabled] = useState(true);
	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<NavBar
				enabled={enabled}
				setEnable={setEnabled}
				handleChange={handleChange}
				values={values}
			/>
			<MiniDrawer />
			<MuiContainer maxWidth={'lg'}>
				<div className={classes.title}>
					<Typography variant="h1" align="center">
						{enabled && (
							<TitleInput value="Type Blog Title" handleChange={handleChange} />
						)}
					</Typography>
					<Typography variant="body1" className={classes.author}>
						<p>Posted on Posted on February 16, 2020 by B.J. Keeton</p>
					</Typography>
				</div>
			</MuiContainer>

			<MuiContainer maxWidth={'lg'} className={classes.main} disableGutters>
				<div className={classes.coverImage}>
					<CoverImage
						handleChange={handleChange}
						imageUrl={values.coverImageUrl}
					/>
				</div>

				<Frame>
					<Element
						canvas
						is={Container}
						width="100%"
						height="auto"
						flexDirection="column"
						padding={['30', '30', '30', '30']}>
						<Element
							canvas
							is={Container}
							flexDirection="row"
							width="auto"
							height="auto"
							padding={['30', '30', '30', '30']}
							margin={['0', '0', '40', '0']}>
							<Element
								canvas
								is={Container}
								width="40%"
								height="100%"
								padding={['0', '20', '0', '20']}>
								<Text
									fontSize="23"
									text="Craft.js is a React framework for building powerful &amp; feature-rich drag-n-drop page editors."></Text>
							</Element>
							<Element
								canvas
								is={Container}
								width="60%"
								height="100%"
								padding={['0', '20', '0', '20']}>
								<Text
									fontSize="14"
									text="Everything you see here, including the editor, itself is
										 made of React components. 
										Craft.js comes only with the building blocks for a page editor;
										 it provides a drag-n-drop system and handles the way user 
										 components should be rendered, updated and moved, among other things. 
										 <br /> <br /> You control the way your editor looks and behave."></Text>
							</Element>
						</Element>
					</Element>
				</Frame>

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
