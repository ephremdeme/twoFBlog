import {useNode, UserComponent} from '@craftjs/core';
import {Button, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {Container} from 'components/selectors/Container';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: 0,
		},
	},
	input: {
		display: 'none',
	},

	fill: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		position: 'relative',
		margin: 0,
		padding: 0,
		'& img': {
			flexShrink: 0,
			minWidth: '10%',
			minHeight: '100%',
			verticalAlign: 'middle',
			maxWidth: '100%',
			height: 'auto',
		},
	},
}));

export const Image: UserComponent = () => {
	const {
		connectors: {connect, drag},
	} = useNode();
	const classes = useStyles();
	const [{alt, src}, setImg] = useState({
		src: 'null',
		alt: '',
	});

	let time = Date.now();

	useEffect(() => {
		time = Date.now();
	});

	const handleChange = (e: any) => {
		if (e.target.files[0]) {
			setImg({
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
			});
		}
	};
	return (
		<div ref={(ref) => connect(drag(ref))}>
			<Container className={classes.fill + ' rounded z-depth-2'}>
				<img src={src === 'null' ? undefined : src} alt={alt} />
			</Container>

			<input
				accept="image/*"
				className={classes.input}
				id={' ' + time}
				type="file"
				onChange={handleChange}
			/>
			<label htmlFor={' ' + time}>
				<Button
					variant="text"
					size="medium"
					aria-label="upload picture"
					component="span"
					startIcon={<InsertPhotoIcon />}>
					{!src ? ' Add Image' : 'Change Image'}
				</Button>
			</label>
		</div>
	);
};

Image.craft = {
	displayName: 'ImageUploadDragable',
};
