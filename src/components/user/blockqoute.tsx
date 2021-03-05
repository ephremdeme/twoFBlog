import React, {useEffect, useRef, useState} from 'react';
import PropTypes, {ReactComponentLike} from 'prop-types';
import {Button, makeStyles, Popper} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {
	FormatAlignJustify,
	FormatAlignLeft,
	FormatAlignRight,
	FormatBold,
	FormatItalic,
	FormatListBulleted,
	FormatListNumbered,
	FormatQuote,
	FormatUnderlined,
	InsertLink,
} from '@material-ui/icons';
import {AnyMxRecord} from 'dns';

const useStyles = makeStyles({
	root: {},
	blockqoute: {
		display: 'block',
		borderLeftStyle: 'solid',
		borderLeftColor: '#1279BE',
		minHeight: '70px',
	},
	button: {
		backgroundColor: 'black',
	},
});

export const Blockqoute: UserComponent<BlockqouteProps> = ({
	text,
	textAlign,
	fontSize,
}) => {
	const classes = useStyles();
	const html = useRef(text || 'Edit Blockqoute');
	const inputRef = useRef<HTMLLinkElement>(null);

	const {
		connectors: {connect, drag},
		selected,
		actions: {setProp},
	} = useNode((state) => ({
		selected: state.events.selected,
		dragged: state.events.dragged,
	}));

	const [editable, setEditable] = useState(false);

	useEffect(() => {
		if (selected) {
			return;
		}

		setEditable(false);
	}, [selected]);

	const handleChange = (e: ContentEditableEvent) => {
		html.current = e.target.value;
	};
	return (
		<div
			className={classes.root}
			onClick={(e) => selected && setEditable(true)}
			ref={(ref) => connect(drag(ref))}>
			<ContentEditable
				innerRef={inputRef}
				html={html.current}
				onChange={handleChange}
				disabled={!editable}
				tagName={'blockquote'}
				className={classes.blockqoute}
				// style={{fontSize: `${fontSize}px`, textAlign}}
				title="Editable"
			/>
		</div>
	);
};

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
					[props.cmd]: !active,
				});
				document.execCommand(props.cmd, false, props.value); // Send the command to the browser
			}}>
			{props.children || props.name}
		</Button>
	);
};

const AlignButtons = () => {
	const [active, setActive] = useState({
		justifyleft: false,
		justifycenter: false,
		justifyright: false,
	});

	return (
		<>
			<EditButtonMultiple
				cmd="justifyleft"
				name={'Align Left'}
				active={active}
				setActive={setActive}>
				<FormatAlignLeft />
			</EditButtonMultiple>
			<EditButtonMultiple
				cmd="justifycenter"
				name={'Align Center'}
				active={active}
				setActive={setActive}>
				<FormatAlignJustify />
			</EditButtonMultiple>
			<EditButtonMultiple
				cmd="justifyright"
				name={'Align Right'}
				active={active}
				setActive={setActive}>
				<FormatAlignRight />
			</EditButtonMultiple>
		</>
	);
};

const ListButtons = () => {
	const [active, setActive] = useState({
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

const BlockquoteSettings = () => {
	return (
		<div style={{display: 'inline-block'}}>
			<EditButton cmd="bold" name="Bold">
				<FormatBold />
			</EditButton>
			<EditButton cmd="italic" name={'Italic'}>
				<FormatItalic />
			</EditButton>
			<EditButton cmd="underline" name={'Underline'}>
				<FormatUnderlined />
			</EditButton>
			<AlignButtons />

			<ListButtons />
			<EditButton cmd="formatblock" value="blockquote" name={'Blockqoute'}>
				<FormatQuote />
			</EditButton>
			<EditButton cmd="createlink" name={'Link'}>
				<InsertLink />
			</EditButton>
		</div>
	);
};

type BlockqouteProps = {
	text?: string;
	fontSize?: number;
	textAlign?: string;
};

Blockqoute.craft = {
	displayName: 'Blockquote',
	related: {
		settings: BlockquoteSettings,
	},
};

export default Blockqoute;
