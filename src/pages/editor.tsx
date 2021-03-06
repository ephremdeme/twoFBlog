import {Editor, Element, Frame} from '@craftjs/core';
import {Box, Grid} from '@material-ui/core';
import Container from 'components/user/container/container';
import NavBar from 'layouts/editor/appbar';
import MiniDrawer from 'layouts/editor/drawer';
import React from 'react';
import RenderNode from '../components/user/RenderNode';
import {Text} from '../components/user/text/Text';

const EditorPage = () => {
	const resolvers = {Text};

	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<NavBar />
			<Grid container spacing={5}>
				<Grid item md={1}>
					<MiniDrawer />
				</Grid>
				<Grid item xs={12} md={8}>
					<Frame>
						<Box my={10}>
							<Element is={Text} id="test" />

							<Box my={10} color="red" minHeight="50px">
								<Element is={Container} canvas>
									<Element is={Text} id="test12" />
								</Element>
							</Box>
						</Box>
					</Frame>
				</Grid>
				<Grid item xs={12} md={2}></Grid>
			</Grid>
		</Editor>
	);
};

export default EditorPage;
