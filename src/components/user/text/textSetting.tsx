import React, {MouseEvent, useState} from 'react';
import {
	Button,
	DialogActions,
	DialogContent,
	FormControl,
	FormLabel,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';
import {
	Backspace,
	Colorize,
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
	FormatPaintSharp,
	FormatQuote,
	FormatUnderlined,
	InsertLink,
	MoreHoriz,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {Grow} from '@material-ui/core';
import {ClickAwayListener} from '@material-ui/core';
import {MenuList} from '@material-ui/core';
import {DialogTitle} from '@material-ui/core';
import {Dialog} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {useNode} from '@craftjs/core';

const useStyles = makeStyles({
	root: {},
	text: {
		display: 'block',
		minHeight: '70px',
	},
	button: {
		backgroundColor: 'black',
		color: 'white',
	},
});

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
				setActive(!active);
				console.log(document?.getSelection()?.toString());
				document.execCommand(props.cmd, false, props.value); // Send the command to the browser
			}}>
			{props.children || props.name}
		</Button>
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

				Object.keys(props.active).forEach((key) => (props.active[key] = false));
				props.setActive({
					...props.active,
					[props.cmd]: true,
				});
				document.execCommand(props.cmd, false, props.value); // Send the command to the browser
			}}>
			{props.children || props.name}
		</Button>
	);
};

const AlignButtons = () => {
	const [active, setActive] = useState({
		justifyleft: true,
		justifycenter: false,
		justifyright: false,
		justifyfull: false,
	});

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [selected, setSelected] = useState('');

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
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
				{active.justifycenter ? (
					<FormatAlignCenter />
				) : active.justifyfull ? (
					<FormatAlignJustify />
				) : active.justifyleft ? (
					<FormatAlignLeft />
				) : active.justifyright ? (
					<FormatAlignRight />
				) : (
					<FormatAlignLeft />
				)}
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
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};
const LineSpacing = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [selected, setSelected] = useState(1.5);

	const {
		actions: {setProp},
	} = useNode((node) => ({
		lineSpacing: node.data.props.lineSpacing,
	}));

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (
		event: React.MouseEvent<EventTarget>,
		lineSpacing?: number
	) => {
		if (lineSpacing) {
			setProp((props) => (props.lineSpacing = lineSpacing));
			setSelected(lineSpacing);
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
				<FormatLineSpacing />
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
										className={selected === 1 ? classes.button : ''}
										onClick={(e) => handleClose(e, 1)}>
										1
									</MenuItem>
									<MenuItem
										className={selected === 1.5 ? classes.button : ''}
										onClick={(e) => handleClose(e, 1.5)}>
										1.5
									</MenuItem>
									<MenuItem
										className={selected === 2 ? classes.button : ''}
										onClick={(e) => handleClose(e, 2)}>
										2
									</MenuItem>
									<MenuItem
										className={selected === 2.5 ? classes.button : ''}
										onClick={(e) => handleClose(e, 2.5)}>
										2.5
									</MenuItem>
									<MenuItem
										className={selected === 3 ? classes.button : ''}
										onClick={(e) => handleClose(e, 3)}>
										3
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

const ListButtons = () => {
	const [] = useState({
		insertorderedlist: false,
		insertunorderedlist: false,
	});

	return (
		<>
			<EditButton cmd="insertorderedlist" name={'Ordered List'}>
				<FormatListNumbered />
			</EditButton>
			<EditButton cmd="insertunorderedlist" name={'UnOrdered List'}>
				<FormatListBulleted />
			</EditButton>
		</>
	);
};

const MoreMenu: React.FC<{text?: string; Choose: typeof TextStyleMenu}> = ({
	text,
	Choose,
}) => {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [selected, setSelected] = useState(text);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
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
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				innerRef={anchorRef}
				onClick={handleToggle}
				color="inherit">
				<Typography variant={'body1'}>{selected}</Typography>
				{open ? <ExpandLess /> : <ExpandMore />}
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
							<div>
								<ClickAwayListener onClickAway={handleClose}>
									<Choose
										handleClose={handleClose}
										open={open}
										setText={setSelected}
										handleListKeyDown={handleListKeyDown}
									/>
								</ClickAwayListener>
							</div>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
};

const SingleMenu: React.FC<{
	name: string;
	cmd: string;
	value?: string;
	setText: (text: string) => void;
	handleClose: (event: React.MouseEvent) => void;
}> = ({name, cmd, value, handleClose, setText}) => {
	const handleClick = (event: React.MouseEvent) => {
		document.execCommand(cmd, false, value); // Send the command to the browser
		setText(name);

		handleClose(event);
	};
	return (
		<React.Fragment>
			<MenuItem onClick={handleClick}>{name}</MenuItem>
		</React.Fragment>
	);
};

const TextStyleMenu: React.FC<{
	open: boolean;
	handleClose: (event: React.MouseEvent) => void;
	setText: (text: string) => void;
	handleListKeyDown: (event: React.KeyboardEvent) => void;
}> = ({open, handleClose, handleListKeyDown, setText}) => {
	return (
		<>
			<MenuList
				autoFocusItem={open}
				id="menu-list-grow"
				onKeyDown={handleListKeyDown}>
				<SingleMenu
					name={'Paragraph'}
					cmd={'formatblock'}
					value={'p'}
					setText={setText}
					handleClose={handleClose}
				/>
				<SingleMenu
					name={'H1'}
					cmd={'formatblock'}
					value={'h1'}
					setText={setText}
					handleClose={handleClose}
				/>
				<SingleMenu
					name={'H2'}
					cmd={'formatblock'}
					value={'h2'}
					setText={setText}
					handleClose={handleClose}
				/>
				<SingleMenu
					name={'H3'}
					cmd={'formatblock'}
					value={'h3'}
					setText={setText}
					handleClose={handleClose}
				/>
			</MenuList>
		</>
	);
};

export const TextSettings = () => {
	const [active, setActive] = useState(false);

	return (
		<div>
			<div>
				<MoreMenu Choose={TextStyleMenu} text="Paragraph" />
				<EditButton cmd="bold" name="Bold">
					<FormatBold />
				</EditButton>
				<EditButton cmd="italic" name={'Italic'}>
					<FormatItalic />
				</EditButton>
				<EditButton cmd="underline" name={'Underline'}>
					<FormatUnderlined />
				</EditButton>
				<EditButton cmd="formatblock" value="blockquote" name={'Blockquote'}>
					<FormatQuote />
				</EditButton>
				<AlignButtons />

				<ListButtons />
				<LineSpacing />
				<LinkButton cmd="createlink" name={'Link'}>
					<InsertLink />
				</LinkButton>
				<IconButton onClick={() => setActive(!active)}>
					{active ? <ExpandLess /> : <ExpandMore />}
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

	const [open, setOpen] = React.useState(false);
	const [link, setLink] = React.useState<string>('');

	const handleChange = (event: React.ChangeEvent<{value: string}>) => {
		// setAge(Number(event.target.value) || '');
		setLink(event.target.value);
	};

	const handleClickOpen = (evt: MouseEvent) => {
		evt.preventDefault(); // Avoids loosing focus from the editable area

		if (document.getSelection()?.toString() === '') {
			alert('Select text first!');
			return;
		}
		console.log(document.getSelection()?.toString());
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		console.log(link);

		document.execCommand(cmd, false, link); // Send the command to the browser

		handleClose();
	};
	return (
		<>
			<Button
				key={cmd}
				style={{margin: '3px'}}
				title={name}
				className={open ? classes.button : ''}
				onMouseDown={handleClickOpen}>
				{children || name}
			</Button>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={open}
				onClose={handleClose}>
				<DialogTitle>Fill the form</DialogTitle>
				<DialogContent>
					<TextField
						id="filled-link"
						label="Link"
						value={link}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
