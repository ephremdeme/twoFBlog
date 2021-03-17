import {useNode} from '@craftjs/core';
import {ClickAwayListener, IconButton, makeStyles} from '@material-ui/core';
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
	FormatColorFill,
	Colorize,
	ColorLens,
} from '@material-ui/icons';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import React, {useState} from 'react';
import {ChromePicker, Color, ColorResult, RGBColor} from 'react-color';

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

		const [open, setOpen] = useState(true);
		const handleClose = (event: React.MouseEvent<EventTarget>) => {
			setOpen(false);
		};

		const handleChangeComplete = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
			setProp((props) => (props.color = foreColor), 500);
		};

		const handleChange = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		return (
			<>
				<div>
					<IconButton onClick={(e) => setOpen(true)}>
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

		const [open, setOpen] = useState(true);
		const handleClose = (event: React.MouseEvent<EventTarget>) => {
			setOpen(false);
		};

		const handleChangeComplete = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
			setProp((props) => (props.background = foreColor), 500);
		};

		const handleChange = (color: ColorResult) => {
			if (color.rgb.a) setForeColor(color.rgb);
			setForeColor(color.rgb);
		};

		return (
			<>
				<div>
					<IconButton onClick={(e) => setOpen(true)}>
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
				title="Fill Space"
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
		</React.Fragment>
	);
};
