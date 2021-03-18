import {useNode} from '@craftjs/core';
import {
	IconButton,
	makeStyles,
	MenuItem,
	Slider,
	Typography,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import {
	FormatAlignCenter,
	FormatAlignLeft,
	FormatAlignRight,
	VerticalAlignBottom,
	VerticalAlignCenter,
	ColorLens,
	FormatColorFill,
} from '@material-ui/icons';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import React, {useEffect, useState} from 'react';
import {ChromePicker, Color, ColorResult} from 'react-color';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import {GenericMenuList} from 'components/user/text/textSetting';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';

const useStyles = makeStyles({
	cover: {
		position: 'fixed',
		top: '0px',
		right: '0px',
		bottom: '0px',
		left: '0px',
	},
	popover: {
		position: 'absolute',
		zIndex: 2,
	},
	radius: {
		width: 200,
	},
});

export const ContainerSettings = () => {
	const classes = useStyles();
	const {
		actions: {setProp},
		flexDirection,
		alignItems,
		justifyContent,
		background,
		color,
	} = useNode((node) => ({
		flexDirection: node.data.props.flexDirection,
		alignItems: node.data.props.alignItems,
		justifyContent: node.data.props.justifyContent,
		fillSpace: node.data.props.fillSpace,
		background: node.data.props.background,
		color: node.data.props.color,
	}));

	const ForeColor = () => {
		const [foreColor, setForeColor] = useState<Color>(color);

		const [open, setOpen] = useState(false);
		const handleClose = (event: React.MouseEvent<EventTarget>) => {
			setOpen(false);
			setProp((props) => (props.color = foreColor), 500);
		};

		const handleChangeComplete = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		const handleChange = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		return (
			<>
				<div>
					<IconButton onClick={(e) => setOpen(true)} title="Insert Color">
						<ColorLens />
					</IconButton>
					{open && (
						<div className={classes.popover}>
							<div className={classes.cover} onClick={handleClose} />

							<ChromePicker
								color={foreColor}
								onChange={handleChange}
								onChangeComplete={handleChangeComplete}
							/>
						</div>
					)}
				</div>
			</>
		);
	};
	const BackColor = () => {
		const [foreColor, setForeColor] = useState<Color>(background);

		const [open, setOpen] = useState(false);
		const handleClose = (event: React.MouseEvent<EventTarget>) => {
			setProp((props) => (props.background = foreColor), 500);

			setOpen(false);
		};

		useEffect(() => {
			console.log('users', open);
		});

		const handleChangeComplete = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		const handleChange = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		return (
			<>
				<div>
					<IconButton
						onClick={(e) => setOpen(true)}
						title="Insert Background Color">
						<FormatColorFill />
					</IconButton>
					{open && (
						<div className={classes.popover}>
							<div className={classes.cover} onClick={handleClose} />

							<ChromePicker
								color={foreColor}
								onChange={handleChange}
								onChangeComplete={handleChangeComplete}
							/>
						</div>
					)}
				</div>
			</>
		);
	};

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
						<VerticalAlignTopIcon />
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
						<VerticalAlignBottom />
					</IconButton>
				</React.Fragment>
			)}

			<IconButton
				title="Fill Available Space"
				onClick={() =>
					setProp(
						(props) =>
							(props.fillSpace = props.fillSpace === 'yes' ? 'unset' : 'yes')
					)
				}>
				<SettingsEthernetIcon />
			</IconButton>

			<ForeColor />
			<BackColor />
			<Radius />
			<Shadow />
		</React.Fragment>
	);
};

export const Radius = () => {
	const classes = useStyles();
	const {
		actions: {setProp},
		radius,
	} = useNode((node) => ({
		radius: node.data.props.radius,
	}));

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		const [value, setValue] = useState(radius);

		const handleChange = (
			event: React.ChangeEvent<{}>,
			value: number | number[]
		) => {
			setValue(value as number);
		};

		const handleSubmit = (
			event: React.ChangeEvent<{}>,
			value: number | number[]
		) => {
			setProp((props) => (props.radius = value), 500);
		};
		return (
			<MenuItem>
				<div className={classes.radius}>
					<Typography id="discrete-slider" gutterBottom>
						Radius
					</Typography>
					<Slider
						defaultValue={radius}
						getAriaValueText={(v) => v.toString()}
						aria-labelledby="continuous-slider"
						valueLabelDisplay="auto"
						onChange={handleChange}
						onChangeCommitted={handleSubmit}
						min={0}
						max={100}
					/>
				</div>
			</MenuItem>
		);
	};

	return (
		<GenericMenuList title="Radius" CIcon={CheckBoxOutlineBlankRoundedIcon}>
			<MenuOptions />
		</GenericMenuList>
	);
};
export const Shadow = () => {
	const classes = useStyles();
	const {
		actions: {setProp},
		shadow,
	} = useNode((node) => ({
		shadow: node.data.props.shadow,
	}));

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		const [value, setValue] = useState(shadow);

		const handleChange = (
			event: React.ChangeEvent<{}>,
			value: number | number[]
		) => {
			setValue(value as number);
		};

		const handleSubmit = (
			event: React.ChangeEvent<{}>,
			value: number | number[]
		) => {
			setProp((props) => (props.shadow = value), 500);
		};
		return (
			<MenuItem>
				<div className={classes.radius}>
					<Typography id="discrete-slider" gutterBottom>
						Shadow
					</Typography>
					<Slider
						defaultValue={shadow}
						getAriaValueText={(v) => v.toString()}
						aria-labelledby="continuous-slider"
						valueLabelDisplay="auto"
						onChange={handleChange}
						onChangeCommitted={handleSubmit}
						min={0}
						max={25}
					/>
				</div>
			</MenuItem>
		);
	};

	return (
		<GenericMenuList title="Radius" CIcon={ShopTwoIcon}>
			<MenuOptions />
		</GenericMenuList>
	);
};
