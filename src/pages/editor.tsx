import {Editor, Element, Frame} from '@craftjs/core';
import {Box} from '@material-ui/core';
import {Container} from 'components/selectors/Container';
import React from 'react';
import Blockqoute from '../components/user/blockqoute';
import RenderNode from '../components/user/RenderNode';

const EditorPage = () => {
	const resolvers = {Blockqoute, Container};

	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<Frame>
				<Box my={8}>
					<Element is={Container} background={{r: 255, g: 55, b: 55, a: 1}} padding={['10', '10', '10', '10']} >
						<Element is={Blockqoute} id="test" />
					</Element>
				</Box>
			</Frame>
		</Editor>
	);
};

export default EditorPage;