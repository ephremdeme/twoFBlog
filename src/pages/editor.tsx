import {Editor, Element, Frame} from '@craftjs/core';
import {Layers} from '@craftjs/layers';
import {
	Box,
	Grid,
	Container as MuiContainer,
	Typography,
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

const EditorPage = () => {
	const resolvers = {Text, Image, Video, Divider, Container};
	const [values, setValues] = useState({
		id: null,
		title: '',
		coverImage: null,
		blogHash: null,
		date: new Date().toLocaleDateString(),
	});
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
				<Grid container spacing={5}>
					<Grid item xs={12} md={10} style={{marginTop: '80px'}}>
						<CoverImage handleChange={handleChange} />

						<Typography style={{margin: '20px 0'}} variant="h5" align="center">
							{enabled && (
								<TitleInput
									value="Type Blog Title"
									handleChange={handleChange}
								/>
							)}
						</Typography>
						<Frame>
							<Element
								canvas
								is={Container}
								width="800px"
								height="auto"
								padding={['40', '40', '40', '40']}>
								<Element
									canvas
									is={Container}
									flexDirection="row"
									width="100%"
									height="auto"
									padding={['40', '40', '40', '40']}
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
					</Grid>
					{/* <Grid item xs={12} md={2}>
						<Layers expandRootOnLoad={true} />
					</Grid> */}
				</Grid>
			</MuiContainer>
		</Editor>
	);
};

export default EditorPage;
