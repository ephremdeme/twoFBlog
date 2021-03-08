import {makeStyles, TextField} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	placeholder: {
		'& textarea': {
			fontWeight: '700',
			fontSize: '1.85rem',
			lineHeight: '1.375',
		},
	},
}));

const TitleInput: React.FC<{
	handleChange: (title: string, value: string) => void;
	value: string;
}> = ({handleChange, value}) => {
	const classes = useStyles();

	return (
		<>
			<TextField
				className={classes.placeholder}
				multiline
				fullWidth
				defaultValue={value}
				onChange={(e) => handleChange('title', e.target.value)}
				placeholder="Title..."
			/>
		</>
	);
};

export default TitleInput;
