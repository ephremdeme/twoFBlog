import {useEditor, useNode, UserComponent} from '@craftjs/core';
import {Box, makeStyles, TextField, Typography} from '@material-ui/core';
import React from 'react';
import {TextVariant} from './textSetting';
import {FontChooser} from './textSetting';

import WebFontLoader from 'webfontloader';
import {useDispatch} from 'react-redux';
import {setEditBlog} from 'features/editor';

const useStyles = makeStyles((theme) => ({
	placeholder: {
		'& textarea': {
			fontWeight: '700',
			fontSize: '1.85rem',
			lineHeight: '1.375',
		},
		[theme.breakpoints.down('lg')]: {
			// marginLeft: '95px',
			maxWidth: '100%',
			// margin: '20px',
		},
		[theme.breakpoints.up('xl')]: {
			// marginLeft: '95px',
			maxWidth: '80%',
			// margin: '20px',
		},
	},
	author: {
		fontSize: '1.1em',
		maxWidth: '850px',
		color: '#6d7c90',
		marginTop: '40px',
	},
	title: {
		paddingTop: '10px',
		paddingBottom: '10px',
		maxWidth: '100%',
		width: '90%',
	},
	fontPicker: {
		color: theme.palette.text.secondary + ' !important',
		backgroundColor: theme.palette.background.default + ' !important',
		'& div': {
			color: theme.palette.text.secondary + ' !important',
			backgroundColor: theme.palette.background.default + ' !important',
			'& ul': {
				color: theme.palette.text.secondary + ' !important',
				backgroundColor: theme.palette.background.default + ' !important',
			},
			'& button': {
				color: theme.palette.text.secondary + ' !important',
				backgroundColor: theme.palette.background.default + ' !important',
			},
		},
	},
}));

const TitleInput: UserComponent<{
	handleChange: (title: string, value: string) => void;
	value: string;
	placeholder: string;
	author?: string;
	date?: string;
	variant?: string;
	fontFamily?: string;
}> = ({
	handleChange,
	placeholder,
	value,
	date,
	author,
	variant,
	fontFamily,
}) => {
	const classes = useStyles();
	const props = {fontFamily: fontFamily};

	const dispatch = useDispatch();

	const {
		connectors: {connect, drag},
		actions: {setProp},
	} = useNode();

	const {enabled} = useEditor((state, query) => ({
		enabled: state.options.enabled,
	}));

	console.log('Font', fontFamily, 'variant', variant, value);

	const handleChangeTitle = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setProp((props) => (props.value = event?.target.value), 500);
		handleChange('title', event.target.value);
		dispatch(setEditBlog({key: 'title', value: event.target.value}));
	};

	if (fontFamily)
		WebFontLoader.load({
			google: {
				families: [fontFamily as string],
			},
		});

	return (
		<div ref={(ref) => connect(drag(ref))} className={classes.title}>
			{enabled && (
				<TextField
					className={classes.placeholder}
					multiline
					fullWidth
					defaultValue={value}
					onChange={handleChangeTitle}
					placeholder={placeholder}
				/>
			)}
			{!enabled && (
				<>
					<Typography variant="h2" align="center">
						{value}
					</Typography>
					<Typography variant="body1" align="center" className={classes.author}>
						Posted on Posted on {date} by {author}
					</Typography>
				</>
			)}
		</div>
	);
};

const TitleInputSetting = () => {
	return (
		<>
			<div>
				<FontChooser />
			</div>
		</>
	);
};

TitleInput.craft = {
	displayName: 'TitleInput',
	props: {
		fontFamily: 'Poppins',
		variant: 'MuiTypography-h1',
	},
	// related: {
	// 	settings: TitleInputSetting,
	// },
};

export default TitleInput;
