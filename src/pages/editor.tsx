import {Editor, Element, Frame} from '@craftjs/core';
import {Box} from '@material-ui/core';
import React from 'react';
import Blockqoute from '../components/user/blockqoute';
import RenderNode from '../components/user/RenderNode';

const EditorPage = () => {
	const resolvers = {Blockqoute};

	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<Frame>
				<Box my={8}>
					<Element is={Blockqoute} id="test" />
				</Box>
			</Frame>
		</Editor>
	);
};

export default EditorPage;
