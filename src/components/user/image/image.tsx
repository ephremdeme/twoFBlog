import {useNode, UserComponent} from '@craftjs/core';
import {Button, makeStyles, Container as MuiContainer} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {Container} from 'components/selectors/Container';
import {ImageSettings} from './imageSettings';

const useStyles = makeStyles({
	root: {
		'& > *': {
			margin: 0,
		},
	},
	input: {
		display: 'none',
	},

	bestFit: {
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: '100%',
	},
	small: {
		marginLeft: 'auto',
		marginRight: 'auto',
		maxWidth: '100%',
		width: '360px',
		minWidth: '360px',
	},

	fullWidth: {
		maxWidth: '940px',
		width: `calc(100vw - 40px)`,
	},

	fill: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		position: 'relative',
		margin: 0,
		padding: 0,
	},
	img: {
		minWidth: '10%',
		maxWidth: '100%',
		display: 'block',
		position: 'relative',
		overflow: 'hidden',
	},
});

type ImageProp = {
	bestFit?: boolean;
	small?: boolean;
	fullWidth?: boolean;
};

export const Image: UserComponent<ImageProp> = ({
	bestFit,
	small,
	fullWidth,
}) => {
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
				<div
					className={
						small
							? classes.small
							: bestFit
							? classes.bestFit
							: fullWidth
							? classes.fullWidth
							: undefined
					}>
					<img
						src={src === 'null' ? undefined : src}
						alt={alt}
						className={classes.img}
					/>
				</div>
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
	props: {
		small: false,
		bestFit: false,
		fullWidth: false,
	},
	related: {
		settings: ImageSettings,
	},
};

export const CoverImage: React.FC<{
	handleChange: (key: string, value: string) => void;
}> = ({handleChange}) => {
	const classes = useStyles();
	const [{alt, src}, setImg] = useState({
		src: '',
		alt: '',
	});

	const handleFileChange = (e: any) => {
		if (e.target.files[0]) {
			handleChange('coverImage', e.target.files[0]);
			setImg({
				src: URL.createObjectURL(e.target.files[0]),
				alt: e.target.files[0].name,
			});
		}
	};

	return (
		<div className={classes.root}>
			<MuiContainer className={classes.fill}>
				<img
					src={src}
					alt={alt}
					className={classes.img}
					style={{maxWidth: '100%', height: 'auto', width: 'auto'}}
				/>
			</MuiContainer>

			<input
				accept="image/*"
				className={classes.input}
				id="icon-button-file"
				type="file"
				onChange={handleFileChange}
			/>
			<label htmlFor="icon-button-file">
				<Button
					variant="outlined"
					size="medium"
					aria-label="upload picture"
					component="span"
					startIcon={<InsertPhotoIcon />}>
					Add Cover Image
				</Button>
			</label>
		</div>
	);
};
