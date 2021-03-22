import {useNode} from '@craftjs/core';
import {
	ClickAwayListener,
	IconButton,
	List,
	ListItem,
	makeStyles,
	MenuItem,
	Popper,
	Slider,
	SvgIcon,
	SvgIconTypeMap,
	TextField,
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
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import AllOutIcon from '@material-ui/icons/AllOut';

import {ReactComponent as AlignBottomVertical} from '../../../public/icons/editor/Align_Bottom_Vertically.svg';
import {ReactComponent as AlignMiddleVertical} from '../../../public/icons/editor/Align_Middle_Vertically.svg';
import {ReactComponent as AlignTopVertical} from '../../../public/icons/editor/Align_Top_Vertically.svg';
import {ReactComponent as AlignLeftHorizontal} from '../../../public/icons/editor/Align_Left_Horizontally.svg';
import {ReactComponent as AlignRightHorizontal} from '../../../public/icons/editor/Align_Right_Horizontally.svg';
import {ReactComponent as AlignCenterHorizontal} from '../../../public/icons/editor/Align_Center_Horizontally.svg';

import {ReactComponent as PaddingIcon} from '../../../public/icons/editor/Padding.svg';
import {ReactComponent as RadiusIcon} from '../../../public/icons/editor/Radius.svg';
import {ReactComponent as ShadowIcon} from '../../../public/icons/editor/Shadow_1.svg';

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
	letterSpacing: {
		marginTop: '16px',
	},
});

export const ContainerSettings = () => {
	const classes = useStyles();
	const {
		actions: {setProp},
		flexDirection,
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
		const handleClose = () => {
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
					<IconButton onClick={() => setOpen(true)} title="Insert Color">
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
		const handleClose = () => {
			setProp((props) => (props.background = foreColor), 500);

			setOpen(false);
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
					<IconButton
						onClick={() => setOpen(true)}
						title="Insert Background Color">
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
						{/* <FormatAlignLeft /> */}
						<AlignLeftHorizontal className="MuiSvgIcon-root" />
					</IconButton>
					<IconButton
						title="Horizontal Align Items Center"
						onClick={() =>
							setProp((props) => (props.justifyContent = 'center'))
						}>
						{/* <FormatAlignCenter /> */}
						<AlignCenterHorizontal className="MuiSvgIcon-root" />
					</IconButton>
					<IconButton
						title="Horizontal Align Items Right"
						onClick={() =>
							setProp((props) => (props.justifyContent = 'flex-end'))
						}>
						{/* <FormatAlignRight /> */}
						<AlignRightHorizontal className="MuiSvgIcon-root" />
					</IconButton>
				</React.Fragment>
			) : (
				<React.Fragment>
					<IconButton
						title="Vertical Align Top"
						onClick={() => {
							setProp((props) => (props.alignItems = 'flex-start'));
						}}>
						<AlignTopVertical className="MuiSvgIcon-root" />
						{/* <VerticalAlignTopIcon /> */}
					</IconButton>
					<IconButton
						title="Vertical Align Center"
						onClick={() => {
							setProp((props) => (props.alignItems = 'center'));
						}}>
						<AlignMiddleVertical className="MuiSvgIcon-root" />
						{/* <VerticalAlignCenter /> */}
					</IconButton>
					<IconButton
						title="Vertical Align Bottom"
						onClick={() => {
							setProp((props) => (props.alignItems = 'flex-end'));
						}}>
						{/* <VerticalAlignBottom /> */}
						<AlignBottomVertical className="MuiSvgIcon-root" />
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

			{/* <ForeColor /> */}
			<BackColor />
			<Radius />
			<Shadow />
			<Margin />
			<Padding />
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
	}> = () => {
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

	const RadiusICon2 = () => (
		<>
			<RadiusIcon className="MuiSvgIcon-root" />
		</>
	);

	return (
		<GenericMenuList title="Radius" CIcon={RadiusICon2}>
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
	}> = () => {
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
		<GenericMenuList title="Shadow" CIcon={ShadowIcon}>
			<MenuOptions />
		</GenericMenuList>
	);
};

const Margin = () => {
	const {
		actions: {setProp},
		margin,
	} = useNode((node) => ({
		margin: node.data.props.margin,
	}));
	const [marginValues, setMargin] = useState({
		'0': parseInt(margin[0]),
		'1': parseInt(margin[1]),
		'2': parseInt(margin[2]),
		'3': parseInt(margin[3]),
	});
	useEffect(() => {
		let tempMargin = Object.values(marginValues);
		setProp((props) => (props.margin = tempMargin), 500);
	}, [marginValues, setProp]);

	const MarginICon = () => (
		<>
			<PaddingIcon className="MuiSvgIcon-root" />
		</>
	);

	return (
		<>
			<GenericMargin
				CIcon={MarginICon}
				marginValues={marginValues}
				setMargin={setMargin}
				type="Margin"
			/>
		</>
	);
};
const Padding = () => {
	const {
		actions: {setProp},
		padding,
	} = useNode((node) => ({
		padding: node.data.props.padding,
	}));
	const [paddingValues, setPadding] = useState({
		'0': parseInt(padding[0]),
		'1': parseInt(padding[1]),
		'2': parseInt(padding[2]),
		'3': parseInt(padding[3]),
	});
	useEffect(() => {
		let temppadding = Object.values(paddingValues);
		setProp((props) => (props.padding = temppadding), 500);
	}, [paddingValues, setProp]);

	return (
		<>
			<GenericMargin
				CIcon={SettingsOverscanIcon}
				marginValues={paddingValues}
				setMargin={setPadding}
				type="Padding"
			/>
		</>
	);
};

const GenericMargin: React.FC<{
	type: string;
	marginValues: {
		'0': number;
		'1': number;
		'2': number;
		'3': number;
	};
	setMargin: React.Dispatch<
		React.SetStateAction<{
			'0': number;
			'1': number;
			'2': number;
			'3': number;
		}>
	>;
	CIcon:
		| OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
		| React.FunctionComponent<
				React.SVGProps<SVGSVGElement> & {
					title?: string | undefined;
				}
		  >;
}> = ({marginValues, setMargin, type, CIcon}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'margin-setting' : undefined;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMargin({
			...marginValues,
			[e.target.name]: isNaN(parseInt(e.target.value))
				? 0
				: parseInt(e.target.value),
		});
	};

	return (
		<>
			<IconButton
				onClick={handleClick}
				aria-describedby={id}
				title={'Insert ' + type}>
				<CIcon className="MuiSvgIcon-root" />
			</IconButton>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<ClickAwayListener onClickAway={handleClose}>
					<List>
						<ListItem>
							<TextField
								type="number"
								// className={classes.letterSpacing}
								value={marginValues[0]}
								name="0"
								label={type + ' Top'}
								onChange={handleChange}
							/>
						</ListItem>
						<ListItem>
							<TextField
								type="number"
								// className={classes.letterSpacing}
								value={marginValues[1]}
								name="1"
								label={type + ' Right'}
								onChange={handleChange}
							/>
						</ListItem>
						<ListItem>
							<TextField
								type="number"
								// className={classes.letterSpacing}
								value={marginValues[2]}
								name="2"
								label={type + ' Bottom'}
								onChange={handleChange}
							/>
						</ListItem>
						<ListItem>
							<TextField
								type="number"
								// className={classes.letterSpacing}
								value={marginValues[3]}
								name="3"
								label={type + ' Left'}
								onChange={handleChange}
							/>
						</ListItem>
					</List>
				</ClickAwayListener>
			</Popper>
		</>
	);
};
