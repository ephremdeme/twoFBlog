import {useEditor, useNode, UserComponent} from '@craftjs/core';
import {Button, makeStyles, Container as MuiContainer} from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {ImageSettings} from './imageSettings';
import Firebase from '../../../firebase/firebase';
import {CloudUpload, TapAndPlayOutlined} from '@material-ui/icons';
import {Container} from '../../selectors/Container';
import {useDispatch, useSelector} from 'react-redux';
import {selectBlog, setEditBlog} from 'features/editor';
import {useImageUpload} from 'hooks/useStorage';

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
	imageUrl?: string;
	imageName?: string;
};

export const Image: UserComponent<ImageProp> = ({
	bestFit,
	small,
	fullWidth,
	imageUrl,
	imageName,
}) => {
	const {
		connectors: {connect, drag},
		actions: {setProp},
	} = useNode();
	const classes = useStyles();

	const path = 'images/' + useSelector(selectBlog).id + '/';

	const {url, handleUpload, error} = useImageUpload(path);

	const [{alt, src}, setImg] = useState<any>({
		src: imageUrl || 'null',
		alt: '',
	});

	const {enabled} = useEditor((state, query) => ({
		enabled: state.options.enabled,
	}));
	const [imageId, setImageId] = useState(Date.now());

	useEffect(() => setImageId(Date.now()), []);

	useEffect(() => {
		if (url) setProp((props) => (props.imageUrl = url), 500);
	}, [url, setProp]);

	const handleChange = (e: any) => {
		let image = e.target.files[0];
		let name = Date.now() + image.name.replace(/\s+/g, '');

		if (image) {
			setImg({
				src: URL.createObjectURL(image),
				alt: name,
				file: image,
			});
			handleUpload(image, name, imageName);
			setProp((props) => (props.imageUrl = URL.createObjectURL(image)), 500);
			setProp((props) => (props.imageName = name), 500);
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
					<img src={imageUrl} alt={alt} className={classes.img} />
				</div>
			</Container>

			{enabled && (
				<>
					<input
						accept="image/*"
						className={classes.input}
						id={' ' + imageId}
						type="file"
						onChange={handleChange}
					/>
					<label htmlFor={' ' + imageId}>
						<Button
							variant="text"
							size="medium"
							aria-label="upload picture"
							component="span"
							startIcon={<InsertPhotoIcon />}>
							{src === 'null' ? ' Add Image' : 'Change Image'}
						</Button>
					</label>
				</>
			)}
		</div>
	);
};

Image.craft = {
	displayName: 'ImageUploadDragable',
	props: {
		small: false,
		bestFit: false,
		fullWidth: false,
		imageUrl: undefined,
		imageName: undefined,
	},
	related: {
		settings: ImageSettings,
	},
};

interface ICoverImage {
	handleChange: (key: string, value: string) => void;
	imageUrl: string | undefined;
	bestFit?: boolean;
	small?: boolean;
	fullWidth?: boolean;
	imageName?: string;
}
export const CoverImage: UserComponent<ICoverImage> = ({
	handleChange,
	imageUrl,
	small,
	bestFit,
	fullWidth,
	imageName,
}) => {
	const {
		connectors: {connect, drag},
		actions: {setProp},
	} = useNode();

	const {enabled} = useEditor((state, query) => ({
		enabled: state.options.enabled,
	}));

	const path = 'images/' + useSelector(selectBlog).id + '/';

	const {url, handleUpload, error} = useImageUpload(path);

	const classes = useStyles();
	const [{alt, src}, setImg] = useState<any>({
		src: imageUrl || null,
		alt: '',
	});

	const dispatch = useDispatch();

	const coverImageUrl = useSelector(selectBlog).coverImageUrl;
	console.log('Image URL', coverImageUrl);
	useEffect(() => {
		if (url)
			dispatch(
				setEditBlog({
					key: 'coverImageUrl',
					value: url,
				})
			);
	}, [url, dispatch]);

	const handleFileChange = (e: any) => {
		let image = e.target.files[0];
		let name = Date.now() + image.name.replace(/\s+/g, '');

		if (image) {
			setImg({
				src: URL.createObjectURL(image),
				alt: name,
				file: image,
			});
			handleUpload(image, name, imageName);
			dispatch(
				setEditBlog({
					key: 'coverImageUrl',
					value: URL.createObjectURL(e.target.files[0]),
				})
			);
			// setProp((props) => (props.imageUrl = URL.createObjectURL(image)), 500);
			setProp((props) => (props.imageName = name), 500);
		}
	};

	// console.log(small, bestFit, fullWidth);

	return (
		<div ref={(ref) => connect(drag(ref))}>
			<MuiContainer
				maxWidth={'xl'}
				className={
					classes.fill +
					' ' +
					(small
						? classes.small
						: bestFit
						? classes.bestFit
						: fullWidth
						? classes.fullWidth
						: undefined)
				}>
				<img
					src={coverImageUrl}
					alt={alt}
					className={classes.img}
					style={{maxWidth: '100%', height: 'auto', width: 'auto'}}
				/>
			</MuiContainer>
			{!imageUrl && enabled && (
				<div style={{margin: '20px'}}>
					<input
						accept="image/*"
						className={classes.input + ' z-depth-2'}
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
							{!src ? ' Add Cover Image' : 'Change Image'}
						</Button>
					</label>
				</div>
			)}
		</div>
	);
};

CoverImage.craft = {
	displayName: 'CoverImage',

	props: {
		small: false,
		bestFit: false,
		fullWidth: false,
		imageName: undefined,
	},
	related: {
		settings: ImageSettings,
	},
};
