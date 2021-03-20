import React, {useCallback, useEffect, useState} from 'react';
import {
	Button,
	IconButton,
	makeStyles,
	MenuItem,
	Paper,
	Popper,
	Snackbar,
	SvgIconTypeMap,
	Typography,
	MenuList,
	TextField,
	ClickAwayListener,
	Grow,
	Theme,
	createStyles,
} from '@material-ui/core';
import {useSpring, animated as a} from 'react-spring';

import {
	ArrowForwardIos,
	ExpandLess,
	ExpandMore,
	FormatAlignCenter,
	FormatAlignJustify,
	FormatAlignLeft,
	FormatAlignRight,
	FormatBold,
	FormatItalic,
	FormatLineSpacing,
	FormatListBulleted,
	FormatListNumbered,
	FormatQuote,
	FormatUnderlined,
	InsertLink,
	TextFields,
} from '@material-ui/icons';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useNode} from '@craftjs/core';
import {Alert} from '@material-ui/lab';
import {ChromePicker, ColorResult} from 'react-color';
import FormatLetterSpacing from '@material-ui/icons/TextFormatSharp';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import {OverridableComponent} from '@material-ui/core/OverridableComponent';
import validUrl from 'valid-url';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		text: {
			display: 'block',
			minHeight: '70px',
		},
		button: {
			backgroundColor: theme.palette.text.secondary,
			color: theme.palette.text.primary,
		},
		letterSpacing: {
			marginTop: theme.spacing(2),
		},
		arrow: {
			justifyContent: 'center',
			display: 'flex',
			alignItems: 'center',
		},
	})
);

const EditButton: React.FC<{name?: string; cmd: string; value?: string}> = (
	props
) => {
	const classes = useStyles();

	const [active, setActive] = useState(false);
	return (
		<Button
			key={props.cmd}
			style={{margin: '3px'}}
			title={props.name}
			className={active ? classes.button : ''}
			onMouseDown={(evt) => {
				evt.preventDefault(); // Avoids loosing focus from the editable area
				console.log(document?.getSelection()?.toString());
				let resp = document.execCommand(props.cmd, false, props.value); // Send the command to the browser
				if (resp) setActive(!active);
			}}>
			{props.children || props.name}
		</Button>
	);
};

const Blockquote = () => {
	const classes = useStyles();

	const [active, setActive] = useState(false);

	return (
		<>
			<Button
				key={'formatblock'}
				style={{margin: '3px'}}
				title={'Blockquote'}
				className={active ? classes.button : ''}
				onMouseDown={(evt) => {
					evt.preventDefault(); // Avoids loosing focus from the editable area
					console.log(document?.getSelection()?.toString());
					if (!active) {
						let resp = document.execCommand('formatblock', false, 'blockquote'); // Send the command to the browser
						if (resp) setActive(true);
					} else {
						let resp = document.execCommand('formatblock', false, 'p'); // Send the command to the browser
						if (resp) setActive(false);
					}
				}}>
				<FormatQuote />
			</Button>
		</>
	);
};

interface AlignActiveProp {
	[index: string]: boolean;
	justifyleft: boolean;
	justifycenter: boolean;
	justifyright: boolean;
}
interface ListActiveProp {
	[index: string]: boolean;
	insertorderedlist: boolean;
	insertunorderedlist: boolean;
}

const EditButtonMultiple: React.FC<{
	name?: string;
	cmd: any;
	value?: string;
	active: ListActiveProp | AlignActiveProp;
	setActive: (active: any) => void;
}> = (props) => {
	const classes = useStyles();
	const active = props.active[props.cmd];
	return (
		<Button
			key={props.cmd}
			style={{margin: '3px'}}
			title={props.name}
			className={active ? classes.button : ''}
			onMouseDown={(evt) => {
				evt.preventDefault(); // Avoids loosing focus from the editable area

				let resp = document.execCommand(props.cmd, false, props.value); // Send the command to the browser
				if (resp) {
					Object.keys(props.active).forEach(
						(key) => (props.active[key] = false)
					);
					props.setActive({
						...props.active,
						[props.cmd]: true,
					});
				}
			}}>
			{props.children || props.name}
		</Button>
	);
};
export const GenericMenuList: React.FC<{
	CIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
	title?: string;
	blockKeydown?: boolean;
}> = ({children, CIcon, title, blockKeydown}) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const {
		actions: {setProp},
		textRef,
	} = useNode((node) => ({
		textRef: node.data.props.textRef,
	}));

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}
		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		console.log('Keydown');

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

	const ChildrenWithProps = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				open: open,
				handleClose: handleClose,
			});
		}
		return child;
	});

	return (
		<>
			<IconButton
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				title={title}
				onClick={handleToggle}>
				<CIcon />
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
									onKeyDown={blockKeydown ? undefined : handleListKeyDown}>
									{ChildrenWithProps}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

const AlignButtons = () => {
	const [active, setActive] = useState({
		justifyleft: true,
		justifycenter: false,
		justifyright: false,
		justifyfull: false,
	});

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		return (
			<>
				<MenuItem onClick={handleClose}>
					<EditButtonMultiple
						cmd="justifyfull"
						name={'Justify Full'}
						active={active}
						setActive={setActive}>
						<FormatAlignJustify />
					</EditButtonMultiple>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<EditButtonMultiple
						cmd="justifyleft"
						name={'Align Left'}
						active={active}
						setActive={setActive}>
						<FormatAlignLeft />
					</EditButtonMultiple>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<EditButtonMultiple
						cmd="justifycenter"
						name={'Align Center'}
						active={active}
						setActive={setActive}>
						<FormatAlignCenter />
					</EditButtonMultiple>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<EditButtonMultiple
						cmd="justifyright"
						name={'Align Right'}
						active={active}
						setActive={setActive}>
						<FormatAlignRight />
					</EditButtonMultiple>
				</MenuItem>
			</>
		);
	};

	return (
		<>
			<GenericMenuList
				CIcon={
					active.justifycenter
						? FormatAlignCenter
						: active.justifyfull
						? FormatAlignJustify
						: active.justifyleft
						? FormatAlignLeft
						: active.justifyright
						? FormatAlignRight
						: FormatAlignLeft
				}
				title="Align Text">
				<MenuOptions />
			</GenericMenuList>
		</>
	);
};

const LineSpacing = () => {
	const classes = useStyles();
	const [selected, setSelected] = useState(1.5);

	const {
		actions: {setProp},
	} = useNode((node) => ({
		lineSpacing: node.data.props.lineSpacing,
	}));

	const handleSubmit = (
		event: React.MouseEvent<EventTarget>,
		lineSpacing: number,
		handleClose?: (event: React.MouseEvent<EventTarget>) => void
	) => {
		if (lineSpacing) {
			setProp((props) => (props.lineSpacing = lineSpacing));
			setSelected(lineSpacing);
		}
		if (handleClose) handleClose(event);
	};

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		return (
			<>
				<MenuItem
					className={selected === 1 ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 1, handleClose)}>
					1
				</MenuItem>
				<MenuItem
					className={selected === 1.5 ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 1.5, handleClose)}>
					1.5
				</MenuItem>
				<MenuItem
					className={selected === 2 ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 2, handleClose)}>
					2
				</MenuItem>
				<MenuItem
					className={selected === 2.5 ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 2.5, handleClose)}>
					2.5
				</MenuItem>
				<MenuItem
					className={selected === 3 ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 3, handleClose)}>
					3
				</MenuItem>
			</>
		);
	};

	return (
		<>
			<GenericMenuList CIcon={FormatLineSpacing} title="Line Spacing">
				<MenuOptions />
			</GenericMenuList>
		</>
	);
};
const TextVariant = () => {
	const classes = useStyles();

	const {
		actions: {setProp},
		variant,
	} = useNode((node) => ({
		variant: node.data.props.variant,
	}));

	const [selected, setSelected] = useState(variant);

	const handleSubmit = (
		event: React.MouseEvent<EventTarget>,
		textVariant: string,
		handleClose?: (event: React.MouseEvent<EventTarget>) => void
	) => {
		if (textVariant) {
			setSelected(textVariant);
			setProp((props) => (props.variant = textVariant));
		}
		if (handleClose) handleClose(event);
	};

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		return (
			<>
				<MenuItem
					className={selected === 'MuiTypography-h1' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'MuiTypography-h1', handleClose)}>
					H1
				</MenuItem>
				<MenuItem
					className={selected === 'MuiTypography-h2' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'MuiTypography-h2', handleClose)}>
					H2
				</MenuItem>
				<MenuItem
					className={selected === 'MuiTypography-h3' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'MuiTypography-h3', handleClose)}>
					H3
				</MenuItem>
				<MenuItem
					className={selected === 'MuiTypography-h4' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'MuiTypography-h4', handleClose)}>
					H4
				</MenuItem>
				<MenuItem
					className={
						selected === 'MuiTypography-subtitle1' ? classes.button : ''
					}
					onClick={(e) =>
						handleSubmit(e, 'MuiTypography-subtitle1', handleClose)
					}>
					Subtitle
				</MenuItem>
				{/* <MenuItem
					className={selected === 'H6' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'H6', handleClose)}>
					H6
				</MenuItem> */}
				<MenuItem
					className={selected === 'MuiTypography-body1' ? classes.button : ''}
					onClick={(e) => handleSubmit(e, 'MuiTypography-body1', handleClose)}>
					Body
				</MenuItem>
			</>
		);
	};

	return (
		<>
			<GenericMenuList CIcon={TextFields} title="Change The Whole Text Variant">
				<MenuOptions />
			</GenericMenuList>
		</>
	);
};

const ListOrderButtons = () => {
	const classes = useStyles();
	const [active, setActive] = useState({
		insertorderedlist: false,
		insertunorderedlist: false,
	});

	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		return (
			<>
				<MenuItem
					className={active.insertorderedlist ? classes.button : ''}
					onClick={handleClose}>
					<EditButtonMultiple
						cmd="insertorderedlist"
						name={'Ordered List'}
						active={active}
						setActive={setActive}>
						<FormatListNumbered />
					</EditButtonMultiple>
				</MenuItem>
				<MenuItem
					className={active.insertunorderedlist ? classes.button : ''}
					onClick={handleClose}>
					<EditButtonMultiple
						cmd="insertunorderedlist"
						name={'UnOrdered List'}
						active={active}
						setActive={setActive}>
						<FormatListBulleted />
					</EditButtonMultiple>
				</MenuItem>
			</>
		);
	};

	return (
		<>
			<GenericMenuList CIcon={FormatListBulleted} title="Insert List">
				<MenuOptions />
			</GenericMenuList>
		</>
	);
};
export const TextColor = () => {
	const [foreColor, setForeColor] = useState('inhert');

	const handleChangeComplete = (color: ColorResult) => {
		setForeColor(color.hex);
		console.log(document.execCommand('forecolor', false, foreColor));
		console.log(color);
	};

	const IconWithColor = () => {
		return (
			<div style={{color: foreColor}}>
				<FormatColorTextIcon />
			</div>
		);
	};

	const MenuOption: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		return (
			<>
				<MenuItem onClick={handleClose}>
					{open && (
						<ChromePicker
							color={foreColor}
							onChangeComplete={handleChangeComplete}
						/>
					)}
				</MenuItem>
			</>
		);
	};
	return (
		<>
			<GenericMenuList CIcon={IconWithColor} title="Text Color Chooser">
				<MenuOption />
			</GenericMenuList>
		</>
	);
};

const TextStyleMenu = () => {
	const [text, setText] = useState('Paragraph');
	const [selected, setSelected] = useState(true);
	const TextType = () => {
		return (
			<>
				<Typography variant={'body1'}>{text}</Typography>
				{selected ? <ExpandLess /> : <ExpandMore />}
			</>
		);
	};
	const MenuOptions: React.FC<{
		handleClose?: (event: React.MouseEvent<EventTarget>) => void;
		open?: boolean;
	}> = ({open, handleClose}) => {
		if (open !== undefined) setSelected(open);
		console.log('Open', open, selected);

		const SingleMenu: React.FC<{
			name: string;
			cmd: string;
			value?: string;
		}> = ({name, cmd, value}) => {
			const handleClick = (event: React.MouseEvent) => {
				document.execCommand(cmd, false, value); // Send the command to the browser
				setText(name);

				if (handleClose) handleClose(event);
			};
			return (
				<React.Fragment>
					<MenuItem onClick={handleClick}>{name}</MenuItem>
				</React.Fragment>
			);
		};
		return (
			<>
				<SingleMenu name={'Paragraph'} cmd={'formatblock'} value={'p'} />
				<SingleMenu name={'H1'} cmd={'formatblock'} value={'h1'} />
				<SingleMenu name={'H2'} cmd={'formatblock'} value={'h2'} />
				<SingleMenu name={'H3'} cmd={'formatblock'} value={'h3'} />
				<SingleMenu name={'H4'} cmd={'formatblock'} value={'h4'} />
				<SingleMenu name={'H5'} cmd={'formatblock'} value={'h5'} />
				<SingleMenu name={'H6'} cmd={'formatblock'} value={'h6'} />
			</>
		);
	};
	return (
		<>
			<GenericMenuList title="Text Type" CIcon={TextType}>
				<MenuOptions />
			</GenericMenuList>
		</>
	);
};

export const TextSettings = () => {
	const classes = useStyles();
	const [active, setActive] = useState(false);
	const [flipped, set] = useState(false);
	const {transform, opacity} = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
		config: {mass: 5, tension: 500, friction: 80},
	});

	return (
		<div>
			<div>
				<TextStyleMenu />

				{!active && (
					<>
						<EditButton cmd="bold" name="Bold">
							<FormatBold />
						</EditButton>
						<EditButton cmd="italic" name={'Italic'}>
							<FormatItalic />
						</EditButton>
						<EditButton cmd="underline" name={'Underline'}>
							<FormatUnderlined />
						</EditButton>
						<Blockquote />

						<LinkButton cmd="createlink" name={'Link'}>
							<InsertLink />
						</LinkButton>
					</>
				)}
				{active && (
					<>
						<AlignButtons />

						<ListOrderButtons />
						<TextColor />
						<LineSpacing />
						<LetterSpacing />
						<TextVariant />
					</>
				)}

				<IconButton onClick={() => setActive(!active)}>
					{!active ? (
						// @ts-ignore
						<div
							onClick={() => set((state) => !state)}
							className={classes.arrow}>
							<a.div style={{transform}}>
								<ArrowBackIosIcon />
							</a.div>
							<a.div
								style={{
									transform: transform.interpolate(
										(t) => `${t} rotateX(180deg)`
									),
								}}>
								{/* < ArrowForwardIos /> */}
							</a.div>
						</div>
					) : (
						<div className={classes.arrow}>
							<a.div style={{transform}}>{/* < ArrowBackIosIcon /> */}</a.div>
							<a.div
								style={{
									transform: transform.interpolate(
										(t) => `${t} rotateX(180deg)`
									),
								}}>
								<ArrowForwardIos />
							</a.div>
						</div>
					)}
				</IconButton>
			</div>
		</div>
	);
};

const LinkButton: React.FC<{name?: string; cmd: string; value?: string}> = ({
	children,
	name,
	value,
	cmd,
}) => {
	const classes = useStyles();
	const [link, setLink] = React.useState<string>('');
	const [hasNoText, setHasNoText] = useState<boolean>(false);

	const [open, setOpen] = React.useState(false);

	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [range, setRange] = useState(document.createRange());
	const [message, setMessage] = useState('');

	const {
		actions: {setProp},
	} = useNode((node) => ({
		orientation: node.data.props.orientation,
		textRef: node.data.props.textRef,
	}));

	const [text, setText] = useState<string>();

	// saved = [selection?.focusNode, selection?.focusOffset];

	useEffect(() => {
		document.addEventListener('selectionchange', handleSelectionChange);
		return () =>
			document.removeEventListener('selectionchange', handleSelectionChange);
	}, []);

	const handleSelectionChange = useCallback((event) => {
		if (document.getSelection()?.toString() === '') return;
		// setProp((props) => (props.selection = document.getSelection()), 5000);
		setText(document?.getSelection()?.toString());
		setRange(document.getSelection()?.getRangeAt(0) as Range);
		console.log('Hello', document?.getSelection()?.toString(), range);
	}, []);

	// document.onselect = (event) => {
	// 	console.log('onselect');

	// 	if (document.getSelection()?.toString() === '') return;
	// 	setProp((props) => (props.selection = document.getSelection()), 5000);
	// 	setText(document?.getSelection()?.toString());
	// 	setRange(document.getSelection()?.getRangeAt(0) as Range);
	// 	console.log('Hello onselect', range);
	// };

	useEffect(() => {
		console.log('Running');
		if (document.getSelection()?.toString() === '') return;

		setText(document.getSelection()?.toString());
		setRange(document.getSelection()?.getRangeAt(0) as Range);
		console.log('Range is', range);
	}, []);

	// console.log(document.getSelection()?.getRangeAt(0));

	const handleChange = (e: any) => {
		setLink(e.target.value);
	};
	const handleToggle = (event: React.MouseEvent<EventTarget>) => {
		if (text === '' || text === undefined) {
			setMessage('Select Text First!');
			setHasNoText(true);
		} else setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	const handleSubmit = (event: React.MouseEvent<EventTarget>) => {
		event.preventDefault();
		console.log('Text', text);

		if (text === '') {
			setMessage('Select Text First!');
			setHasNoText(true);
		}
		if (text) {
			// textRef.current?.focus();
			// selection?.collapse(saved[0], saved[1]);
			document.getSelection()?.removeAllRanges();
			document.getSelection()?.addRange(range);
			if (!validUrl.isWebUri(link))
				console.log('Restored caret', document.getSelection()?.rangeCount);
			console.log(document.execCommand('createlink', false, link), 'Links');
		}

		handleClose(event);
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
				aria-controls={open ? 'menu-list-grow-link' : undefined}
				aria-haspopup="true"
				title="Create Link"
				onClick={handleToggle}>
				{children}
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
									id="menu-list-grow-link"
									onKeyDown={handleListKeyDown}>
									<MenuItem>
										<TextField
											onChange={handleChange}
											placeholder="www.example.com"
										/>
										<Button onClick={handleSubmit}>Submit</Button>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<AlertLink open={hasNoText} message={message} setOpen={setHasNoText} />
		</>
	);
};

const AlertLink: React.FC<{
	open: boolean;
	message: string;
	setOpen: (data: boolean) => void;
}> = ({open, setOpen, message, children}) => {
	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity="warning">
				{message}
			</Alert>
		</Snackbar>
	);
};

const LetterSpacing = () => {
	const classes = useStyles();

	const {
		actions: {setProp},
		letterSpacing,
	} = useNode((node) => ({
		letterSpacing: node.data.props.letterSpacing,
	}));

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProp(
			(props) =>
				(props.letterSpacing =
					parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value)),
			500
		);
	};

	return (
		<>
			<IconButton
				onClick={handleClick}
				aria-describedby={id}
				title="Insert Letter Spacing">
				<FormatLetterSpacing />
			</IconButton>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<ClickAwayListener onClickAway={handleClose}>
					<TextField
						type="number"
						className={classes.letterSpacing}
						value={letterSpacing}
						label="Letter Spacing"
						onChange={handleChange}
					/>
				</ClickAwayListener>
			</Popper>
		</>
	);
};
