import {Editor, Element, Frame} from '@craftjs/core';
import {Box} from '@material-ui/core';
import React from 'react';
import RenderNode from '../components/user/RenderNode';
import {Text} from '../components/user/text/text';

const EditorPage = () => {
	const resolvers = {Text};

	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<Frame>
				<Box my={8}>
					<Element is={Text} id="test" />
				</Box>
			</Frame>
		</Editor>
	);
};

export default EditorPage;
