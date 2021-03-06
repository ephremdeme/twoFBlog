import React, {useEffect, useRef, useState} from 'react';
import PropTypes, {ReactComponentLike} from 'prop-types';
import {Button, makeStyles, Popper} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import sanitizeHtml from 'sanitize-html';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {TextSettings} from './textSetting';

const useStyles = makeStyles({
	root: {},
	text: {
		display: 'block',
		minHeight: '70px',
	},
	button: {
		backgroundColor: 'black',
	},
});

export const Text: UserComponent<TextProps> = ({text, textAlign, fontSize}) => {
	const classes = useStyles();
	const html = useRef(text || 'Edit Text');
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

	const handleBlur = () => {
		console.log(sanitizeHtml(html.current));

		html.current = sanitizeHtml(html.current);
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
				tagName={'Text'}
				className={classes.text}
				// style={{fontSize: `${fontSize}px`, textAlign}}
				title="Editable"
			/>
		</div>
	);
};

type TextProps = {
	text?: string;
	fontSize?: number;
	textAlign?: string;
};

Text.craft = {
	displayName: 'Text',
	related: {
		settings: TextSettings,
	},
};

export default Text;
