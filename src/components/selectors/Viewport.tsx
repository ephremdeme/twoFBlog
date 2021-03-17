import {useEditor} from '@craftjs/core';
import {ClickAwayListener} from '@material-ui/core';
import React from 'react';

const Viewport: React.FC = ({children}) => {
	const {
		connectors,
		actions: {selectNode},
	} = useEditor((state) => {});

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		selectNode(undefined);
	};
	return (
		<ClickAwayListener onClickAway={handleClose}>
			<div ref={(ref) => connectors.select(connectors.hover(ref, null), null)}>
				{children}
			</div>
		</ClickAwayListener>
	);
};

export default Viewport;
