import React, {useEffect, useRef, useState} from 'react';
import PropTypes, {ReactComponentLike} from 'prop-types';
import {Button, makeStyles, Popper} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {ReactComponent as Bold} from '../../public/svg/bold.svg';
import {ReactComponent as Italic} from '../../public/svg/italic.svg';
import {ReactComponent as Link} from '../../public/svg/link.svg';
import {ReactComponent as Quote} from '../../public/svg/quote.svg';
import {ReactComponent as OrderedList} from '../../public/svg/number.svg';
import {ReactComponent as UnorderedList} from '../../public/svg/bulletlist.svg';
import {ReactComponent as Underline} from '../../public/svg/underline.svg';

const useStyles = makeStyles({
	root: {},
	blockqoute: {
		display: 'block',
		borderLeftStyle: 'solid',
		borderLeftColor: '#1279BE',
		minHeight: '70px',
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
	return (
		<Button
			key={props.cmd}
			style={{margin: '3px'}}
			onMouseDown={(evt) => {
				evt.preventDefault(); // Avoids loosing focus from the editable area
				document.execCommand(props.cmd, false, props.value); // Send the command to the browser
			}}>
			{props.children || props.name}
		</Button>
	);
};

const BlockquoteSettings = () => {
	return (
		<div style={{display: 'inline-block'}}>
			<EditButton cmd="bold">
				<Bold />
			</EditButton>
			<EditButton cmd="italic" name={'I'}>
				<Italic />
			</EditButton>
			<EditButton cmd="underline" name={'U'}>
				<Underline />
			</EditButton>
			<EditButton cmd="justifyleft" name={'AL'}></EditButton>
			<EditButton cmd="justifycenter" name={'AC'}></EditButton>
			<EditButton cmd="justifyright" name={'AR'}></EditButton>
			<EditButton cmd="insertorderedlist" name={'Ol'}>
				<OrderedList />
			</EditButton>
			<EditButton cmd="insertunorderedlist" name={'UL'}>
				<UnorderedList />
			</EditButton>
			<EditButton cmd="formatblock" value="blockquote" name={'BQ'}>
				<Quote />
			</EditButton>
			<EditButton cmd="createlink" name={'Link'}>
				<Link />
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
