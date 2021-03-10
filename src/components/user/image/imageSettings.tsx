import {useNode} from '@craftjs/core';
import {Button, IconButton} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import {ReactComponent as SmallFit} from '../../../public/icons/svgexport-20.svg';
import React from 'react';
import {ReactComponent as BestFit} from '../../../public/icons/svgexport-21.svg';
import {ReactComponent as FullWidth} from '../../../public/icons/svgexport-22.svg';
import {CloudUpload} from '@material-ui/icons';

export const ImageSettings = () => {
	const {
		actions: {setProp},
		fullWidth,
		bestFit,
		small,
	} = useNode((node) => ({
		bestFit: node.data.props.flexDirection,
		small: node.data.props.alignItems,
		fullWidth: node.data.props.justifyContent,
	}));

	return (
		<React.Fragment>
			<IconButton
				title="Small Image"
				onClick={() => {
					setProp((props) => (props.small = true));
					setProp((props) => (props.bestFit = false));
					setProp((props) => (props.fullWidth = false));
				}}>
				<SmallFit />
			</IconButton>
			<IconButton
				title="Best Fit"
				onClick={() => {
					setProp((props) => (props.small = false));
					setProp((props) => (props.bestFit = true));
					setProp((props) => (props.fullWidth = false));
				}}>
				<BestFit />
			</IconButton>
			<IconButton
				title="Full Width"
				onClick={() => {
					setProp((props) => (props.small = false));
					setProp((props) => (props.bestFit = false));
					setProp((props) => (props.fullWidth = true));
				}}>
				<FullWidth />
			</IconButton>
			{/* <Button startIcon={<CloudUpload />}>Upload</Button> */}
		</React.Fragment>
	);
};
