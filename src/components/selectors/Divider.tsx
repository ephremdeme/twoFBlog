import React from 'react';

import {
	createStyles,
	Divider as MuiDivider,
	FormControl,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import {ReactComponent as DividerLgIcon} from '../../public/icons/large-divider.svg';
import {ReactComponent as DividerMdIcon} from '../../public/icons/medium-divider.svg';
import {ReactComponent as DividerSmIcon} from '../../public/icons/small-divider.svg';
import {UseScrollTriggerOptions} from '@material-ui/core/useScrollTrigger/useScrollTrigger';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
		divide: {
			margin: '5px',
		},
	})
);

export const Divider: UserComponent<{
	variant?: 'inset' | 'middle' | 'fullWidth' | undefined;
	orientation?: 'vertical' | 'horizontal' | undefined;
}> = ({variant, orientation}) => {
	const {
		connectors: {connect, drag},
		selected,
		actions: {setProp},
	} = useNode((state) => ({
		selected: state.events.selected,
		dragged: state.events.dragged,
	}));
	const classes = useStyles();
	console.log(variant, orientation);

	return (
		<div
			ref={(ref) => connect(drag(ref))}
			style={{
				padding: '20px',
				height: orientation === 'vertical' ? '100%' : 'auto',
				width: orientation === 'horizontal' ? '100%' : 'auto',
			}}>
			<div
				className={classes.divide}
				style={{
					height: orientation === 'vertical' ? '100%' : 'auto',
					width: orientation === 'horizontal' ? '100%' : 'auto',
				}}>
				<MuiDivider
					variant={variant}
					orientation={orientation}
					{...(orientation === 'vertical' ? 'flexItem' : null)}
				/>
			</div>
		</div>
	);
};

export default Divider;

const DividerSettings = () => {
	const {
		actions: {setProp},
		orientation,
		variant,
	} = useNode((node) => ({
		orientation: node.data.props.orientation,
		variant: node.data.props.variant,
	}));

	const classes = useStyles();

	return (
		<div>
			<IconButton
				onClick={(e) => setProp((props) => (props.variant = 'fullWidth'))}>
				<DividerLgIcon />
			</IconButton>
			<IconButton
				onClick={(e) => setProp((props) => (props.variant = 'middle'))}>
				<DividerMdIcon />
			</IconButton>
			<IconButton
				onClick={(e) => setProp((props) => (props.variant = 'inset'))}>
				<DividerSmIcon />
			</IconButton>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Orientation</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={orientation}
					onChange={(e) =>
						setProp((props) => (props.orientation = e.target.value))
					}>
					<MenuItem value={'vertical'}>Vertical</MenuItem>
					<MenuItem value={'horizontal'}>Horizontal</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

Divider.craft = {
	displayName: 'Divider',
	props: {
		variant: 'fullWidth',
		orientation: 'horizontal',
	},
	related: {
		settings: DividerSettings,
	},
};
