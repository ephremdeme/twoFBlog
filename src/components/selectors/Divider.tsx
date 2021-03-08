import React from 'react';

import {
	createStyles,
	Divider as MuiDivider,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import {UseScrollTriggerOptions} from '@material-ui/core/useScrollTrigger/useScrollTrigger';

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

	return (
		<div ref={(ref) => connect(drag(ref))}>
			<MuiDivider
				className={classes.divide}
				variant={variant}
				orientation={orientation}
				{...(orientation === 'vertical' ? 'flexItems' : null)}
			/>
		</div>
	);
};

export default Divider;

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
			margin: '8px',
			width: '20px',
		},
	})
);
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
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Variant</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={variant}
					onChange={(e) =>
						setProp((props) => (props.variant = e.target.value))
					}>
					<MenuItem value={'fullWidth'}>fullWidth</MenuItem>
					<MenuItem value={'inset'}>inset</MenuItem>
					<MenuItem value={'middle'}>middle</MenuItem>
				</Select>
			</FormControl>
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
	related: {
		settings: DividerSettings,
	},
};
