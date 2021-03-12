import React, {useEffect, useRef, useState} from 'react';
import PropTypes, {ReactComponentLike} from 'prop-types';
import {Button, makeStyles, Popper} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import sanitizeHtml from 'sanitize-html';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {TextSettings} from './textSetting';

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: '100%',
	},
	text: {
		display: 'block',
		minHeight: '70px',
		padding: '10px',
		margin: '5px',
	},
	button: {
		backgroundColor: 'black',
	},
});

export const Text: UserComponent<TextProps> = ({
	text,
	textAlign,
	fontSize,
	lineSpacing,
}) => {
	const classes = useStyles();
	const html = useRef<string>(text);
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
		setProp((props) => (props.text = html.current), 500);
	};

	const handleBlur = () => {
		console.log(sanitizeHtml(html.current), 'Blur');
		html.current = sanitizeHtml(html.current);
		setProp((props) => (props.text = html.current), 500);
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
				onBlur={handleBlur}
				disabled={!editable}
				tagName={'p'}
				style={{lineHeight: lineSpacing}}
				className={classes.text}
				// style={{fontSize: `${fontSize}px`, textAlign}}
				title="Editable"
			/>
		</div>
	);
};

type TextProps = {
	text: string;
	fontSize?: string;
	textAlign?: string;
	lineSpacing?: number;
};

Text.craft = {
	displayName: 'Text',
	props: {
		text: 'edit',
		fontSize: '12',
		textAlign: '',
		lineSpacing: 1.5,
	},
	related: {
		settings: TextSettings,
	},
};

export default Text;
