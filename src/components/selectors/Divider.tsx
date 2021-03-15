import React, {useState} from 'react';

import {
	ClickAwayListener,
	createStyles,
	Divider as MuiDivider,
	FormControl,
	Grow,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Select,
	Theme,
} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import {ReactComponent as DividerLgIcon} from '../../public/icons/large-divider.svg';
import {ReactComponent as DividerMdIcon} from '../../public/icons/medium-divider.svg';
import {ReactComponent as DividerSmIcon} from '../../public/icons/small-divider.svg';
import {UseScrollTriggerOptions} from '@material-ui/core/useScrollTrigger/useScrollTrigger';
import {Height, Maximize, Remove} from '@material-ui/icons';

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
		button: {
			backgroundColor: '#F5F5F5',
			color: '#F5F5F5',
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
			<SelectOrientation />
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
		</div>
	);
};

const SelectOrientation = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [selected, setSelected] = useState('horizontal');

	const {
		actions: {setProp},
	} = useNode((node) => ({
		orientation: node.data.props.orientation,
	}));

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (
		event: React.MouseEvent<EventTarget>,
		orientation?: string
	) => {
		if (orientation) {
			setProp((props) => (props.orientation = orientation));
			setSelected(orientation);
		}
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<>
			<IconButton
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				title="Align Text"
				onClick={handleToggle}>
				<Remove />
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal>
				{({TransitionProps, placement}) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="menu-list-grow"
									onKeyDown={handleListKeyDown}>
									<MenuItem
										className={selected === 'horizontal' ? classes.button : ''}
										onClick={(e) => handleClose(e, 'horizontal')}>
										<IconButton title="Horizontal Divider">
											<Remove />
										</IconButton>
									</MenuItem>
									<MenuItem
										className={selected === 'vertical' ? classes.button : ''}
										onClick={(e) => handleClose(e, 'vertical')}>
										<IconButton title="Vertical Divider">
											<Height />
										</IconButton>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
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
