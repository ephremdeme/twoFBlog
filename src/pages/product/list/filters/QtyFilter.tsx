import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {setFilterableProductsByField} from 'features/product';
import {IFieldQuery} from 'features/product/mutations';
import {useDispatch} from 'react-redux';
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paperBg: {
			background: theme.palette.background.default,
			zIndex: 400,
		},
	})
);

const options = [
	'< 2 peaces',
	'< 5 peaces',
	'< 10 peaces',
	'< 20 peaces',
	'< 50 peaces',
	'< 100 peaces',
	'< 200 peaces',
	'< 500 peaces',
];

const QtyFilter = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`);
	};

	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLLIElement, MouseEvent>,
		index: number
	) => {
		setSelectedIndex(index);
		setOpen(false);
		const value = options[index].split(' ');

		const query$: IFieldQuery = {
			compare: value[0],
			field: 'qty',
			intValue: +value[1],
		};

		dispatch(setFilterableProductsByField(query$));
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<Grid container direction="column" alignItems="center">
			<Grid item xs={12}>
				<ButtonGroup
					variant="outlined"
					ref={anchorRef}
					style={{
						width: '100%',
					}}
					aria-label="split button">
					<Button
						size="small"
						style={{fontSize: '.6rem', width: '100%'}}
						onClick={handleClick}>
						{options ? options[selectedIndex] : 'None'}
					</Button>
					<Button
						variant="outlined"
						size="small"
						aria-controls={open ? 'split-button-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-label="select merge strategy"
						aria-haspopup="menu"
						onClick={handleToggle}>
						<ArrowDropDownIcon />
					</Button>
				</ButtonGroup>

				<Popper
					className={classes.paperBg}
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
							<Paper elevation={0}>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu">
										{options.map((option, index) => (
											<MenuItem
												key={option}
												selected={index === selectedIndex}
												onClick={(event) => handleMenuItemClick(event, index)}>
												{option}
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Grid>
		</Grid>
	);
};

export default QtyFilter;
