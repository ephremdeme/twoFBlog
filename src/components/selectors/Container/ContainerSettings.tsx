import {useNode} from '@craftjs/core';
import {IconButton} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import {
	FormatAlignCenter,
	FormatAlignLeft,
	FormatAlignRight,
	KeyboardArrowLeft,
	VerticalAlignBottom,
	VerticalAlignCenter,
} from '@material-ui/icons';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import React from 'react';

export const ContainerSettings = () => {
	const {
		actions: {setProp},
		flexDirection,
		alignItems,
		justifyContent,
	} = useNode((node) => ({
		flexDirection: node.data.props.flexDirection,
		alignItems: node.data.props.alignItems,
		justifyContent: node.data.props.justifyContent,
		fillSpace: node.data.props.fillSpace,
	}));

	return (
		<React.Fragment>
			<IconButton
				title="Direction Column"
				onClick={() => {
					setProp((props) => (props.flexDirection = 'column'));
				}}>
				<ArrowDownwardIcon />
			</IconButton>
			<IconButton
				title="Direction Row"
				onClick={() => setProp((props) => (props.flexDirection = 'row'))}>
				<ArrowRightAltIcon />
			</IconButton>
			{flexDirection === 'row' ? (
				<React.Fragment>
					<IconButton
						title="Horizontal Align Items Left"
						onClick={() => {
							setProp((props) => (props.justifyContent = 'flex-start'));
						}}>
						<FormatAlignLeft />
					</IconButton>
					<IconButton
						title="Horizontal Align Items Center"
						onClick={() =>
							setProp((props) => (props.justifyContent = 'center'))
						}>
						<FormatAlignCenter />
					</IconButton>
					<IconButton
						title="Horizontal Align Items Right"
						onClick={() =>
							setProp((props) => (props.justifyContent = 'flex-end'))
						}>
						<FormatAlignRight />
					</IconButton>
				</React.Fragment>
			) : (
				<React.Fragment>
					<IconButton
						title="Vertical Align Left"
						onClick={() => {
							setProp((props) => (props.alignItems = 'flex-start'));
						}}>
						{/* <VerticalAlignTopIcon /> */}
						<KeyboardArrowLeft />
					</IconButton>
					<IconButton
						title="Vertical Align Center"
						onClick={() => {
							setProp((props) => (props.alignItems = 'center'));
						}}>
						<VerticalAlignCenter />
					</IconButton>
					<IconButton
						title="Vertical Align Right"
						onClick={() => {
							setProp((props) => (props.alignItems = 'flex-end'));
						}}>
						<KeyboardArrowRightIcon />
					</IconButton>
				</React.Fragment>
			)}

			<IconButton
				title="Fill Space"
				onClick={() =>
					setProp(
						(props) =>
							(props.fillSpace = props.fillSpace === 'yes' ? 'unset' : 'yes')
					)
				}>
				<SettingsEthernetIcon />
			</IconButton>
		</React.Fragment>
	);
};
