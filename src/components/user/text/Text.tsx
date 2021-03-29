import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import {useNode, UserComponent} from '@craftjs/core';
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import {TextSettings} from './textSetting';

import WebFontLoader from 'webfontloader';

const useStyles = makeStyles({
	root: {
		maxWidth: '100%',
	},
	text: {
		display: 'block',
		minHeight: 'auto',
		minWidth: '120px',
		padding: '10px',
		margin: '5px',
		maxWidth: '100%',
		overflowWrap: 'break-word',
	},
	button: {
		backgroundColor: 'black',
	},
});

export const TextEditAble: UserComponent<TextProps> = ({
	text,
	lineSpacing,
	letterSpacing,
	variant,
	fontFamily,
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
		// console.log(sanitizeHtml(html.current), 'Blur');
		// html.current = sanitizeHtml(html.current);
		// setProp((props) => (props.text = html.current), 500);
	};
	if (fontFamily)
		WebFontLoader.load({
			google: {
				families: [fontFamily as string],
			},
		});
	return (
		<div
			className={classes.root}
			onClick={() => selected && setEditable(true)}
			ref={(ref) => connect(drag(ref))}>
			<ContentEditable
				innerRef={inputRef}
				html={html.current}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={!editable}
				tagName={'div'}
				style={{
					lineHeight: lineSpacing,
					letterSpacing: `${letterSpacing}px`,
					overflowWrap: 'linebreak',
					fontFamily: fontFamily,
				}}
				className={classes.text + ' ' + variant + ' apply-font'}
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
	textRef?: React.RefObject<HTMLLinkElement>;
	letterSpacing?: number;
	variant?: string;
	fontFamily?: string;
};

TextEditAble.craft = {
	displayName: 'Text',
	props: {
		text: 'edit',
		fontSize: '12',
		textAlign: '',
		variant: 'MuiTypography-body1',
	},
	related: {
		settings: TextSettings,
	},
};

export default TextEditAble;
