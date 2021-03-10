import {Editor, Element, Frame} from '@craftjs/core';
import {
	Container as MuiContainer,
	Typography,
	makeStyles,
} from '@material-ui/core';
import {Container} from '../../components/selectors/Container';
import Divider from '../../components/selectors/Divider';
import {CoverImage, Image} from '../../components/user/image/image';
import TitleInput from '../../components/user/text/TitleInput';
import {Video} from '../../components/user/video/video';
import NavBar from '../../layouts/editor/appbar';
import MiniDrawer from '../../layouts/editor/drawer';
import React, {useState} from 'react';
import RenderNode from '../../components/user/RenderNode';
import {Text} from '../../components/user/text/Text';
import lz from 'lzutf8';
import {IBlog} from '../../features/editor';

const useStyles = makeStyles({
	main: {
		boxShadow:
			'0 8px 60px 0 rgb(103 151 255 / 11%), 0 12px 90px 0 rgb(103 151 255 / 11%)',
		marginBottom: '40vh',
	},
	title: {
		marginTop: '50px',
		marginBottom: '70px',
		paddingTop: '10px',
		paddingBottom: '10px',
	},
	author: {
		fontSize: '1.1em',
		maxWidth: '850px',
		color: '#6d7c90',
		marginTop: '40px',
	},
	coverImage: {
		marginTop: '20px',
	},
});

const EditorPage: React.FC<{edit: boolean; blog?: IBlog}> = ({edit, blog}) => {
	const resolvers = {Text, Image, Video, Divider, Container};
	const classes = useStyles();

	const hashed = `eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWZsZXhEaXJlY3Rpb24iOiJjb2x1bW4iLCJhbGlnbkl0ZW1zIjrFJi1zdGFydCIsImp1c3RpZnnEYGVudNAeZmlsbFNwYWPkAINubyIsInBhZGRpbmciOlsiMzAiLM4FXSwibWFyZ2luxB/EFMoEXSwiYmFja2dyb3VuZOUA4CI6MjU1LCJnxwhixwhhIjoxfSzkALpvcscoMMUmMMUkMMkic2hhZG93xRJyYWRpdXPFC3dpZHRoIjoiMTAwJSIsImhlaWdo5ADWODc4cHgiLCJjbGFzc+cBVGNvbnRyb2xlZC3GNn0sImRpc3BsYXnxAXUsImN1c3RvbSI6e30sImhpZGRlbiI6ZmFsc2UsIm5vZGVz5ADzNVU4dFVDcFFBV8R7NER1OGd1djjkAPxsaW5rZWROxil7fX0szCz/Afb/AfbyAfZyb3f/AfP/AfPpAfN5ZXP/AfT2AfQ0/wH1/wH1/wH1+QH1YXV05AKk6QH1xxD/AfT/AfT/AfQ4SmcxZzRjNy0tIiwiNnQyRXFLaGEwY/MB9eQBSXLmAXHlA+19LMw9/wIF/wIF8gIF/wIC/wIC+QP15AHZMugB5zL/A/P/Af7/Af7/Af7xAf407gPy5wQC/wH9/wH9/wH9X0I5aGwzLUlVTP4B8OsD7X0szDb6AfZUZXh07gHxx33pAfJ0xCI6IkNyYWZ0LmpzIGlzIGEgUmVhY3QgZnJhbWV3b3JrIGZvciBidWls5AHAIHBvd2VyZnVsICZhbXA7IGZlYXR1cmUtcmljaCBkcmFnLW4tZHJvcCBwYWdlIGVkaXRvcnMuPGRpdj48Yj5CbG9nxGRXb3JrxE1pbiBCb2xkIGFuZCA8aT48dT5pdGFsaWM8L3U+PC9pPjwvYj48L8U9x0LGJjxicj7YJG9sPjxsacosdGVzdCAxzi7EIMkkxSEy0h1pIHN0eWxlPVwiXCLGJTPGJcQdL8RnxXbkAu1vbnRTaXrkAXMyMyIs5QFWQeQDOeQDRPECIeUBlv8CHOYCHP0CEOsD+H3tBDb/BAb/BAb/BAb/BAb/BAb/BAb/BAb/BAb/BAb/BAbsBAY2/wQG/wQG/wQG9QQGVVEtWUdoNXRzSf8EBu0EBss2/wQG/wQG5QQGPHA+RXZlcnl0aOQDnHlvdSBzZWUgaGVyZSwgaW5jbHXlBAF0aOgD2CwgaXRzZWxm5APSbWFkZSBvZucEPGNvbXBvbmVudHMuICDpBF1jb21lcyBvbmx5IHdpdGjFSukEWGJsb2Nrc+UEbGHsBD07IGl0IHByb3ZpZGXkBJ3sBGRzeXN0ZW3lBD5oYW5kbGVzxVR3YXkgdXNlciDrAIggc2hvdWxkIGJlIHJlbmRlcmVkLCB1cGRhdGXmBH9tb3bEE2Ftb25nIG90aGVyIOUBCOQAwuQEbyBZb3Ug5wH3yWZ5b3Vy5wCoIGxvb2tzxUtiZWhhdmUuPC9wPjzlANdxdW90ZT5IZXJl5AErQsUTb3V0ZTwvyx/MK+gExUFu5gCKb25l6QSYbGlzdCB0d2/sBIjLOyDuBJAxNP8EkP8EkP8EkOsCmusEgsRC6Qq6/wSP/wSP/wSP/wSP/wqX8QSQygT/BI7/BI7/BI7/BI7wDIczOTLlDHjpBJE0MzX/DIn/BJL/AezlBJJibm9yMDVJbf8Il+gKh8ov/wHx/wHx/wHx/wHx/wHx/wHx/wHx/wHx/wHx/wHx6wHxODkw7gHwMzDGEf8B8P8B8P8B8FZaT3FJaVlsYyIsIk5sdF9VSHprM/4B/OoD5X0sy0D/AgH/AgH/AgH/AgH/AgH/AgH/AgH/AgH/AgH/AgHrAgHoAfD/AgH/AgH/AgHxAgF6TkIzaTZkdWX+AfXqA+l97AIp/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH1/wH15QH1UFBBNURtUTU3/wH17AH16gIp+gH1SW1hZ2X+CnZzbWFsbMkXYmVzdEZpdMkQZnVsbFfmARvHEmnEU1VybOQEeXR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYuQJHGct5gmkLWQ2ZDQ1LmFwcHNwb3TFI28vxVdzJTJGMTYxNTM1ODE4NTczMFNjcmVlbnNob3QlMjBmcm9tJTIwMjAyMS0wMi0yMsQNMS0zNC0xNC5wbmc/YWx0PW1lZGlhJnRva2VuPTBhMTExNGQ3LTliZGItNGU4Yi1hMWExLTg0NTlkNjdiN2JiMPIBvOUBNFVwbG9hZERyYWdhYmxl/wHG/wmY5QG76gWYfSzrAe//Abv/Abv/Abv/Abv/Abv/Abv7Abs5NDM2M/oBuzMtMOQBuzE1LTM5LTEx9gG7NjE3ZTZlZi0xNDExLTQ4ZTAtOWY4Yy0yNDZmNjM4MmJmN2H/Abv/Abv/AbvrAbvqBV59fQ==
`;
	console.log(blog?.blogHash === hashed);

	const json = lz.decompress(lz.decodeBase64(blog?.blogHash as string));

	const [values, setValues] = useState<IBlog>({
		id: blog?.id ? blog.id : '',
		title: blog?.title as string,
		coverImageUrl: blog?.coverImageUrl as string,
		blogHash: blog?.blogHash as string,
		authorId: 'jhjhejkhejwehewkhewe',
		date:
			new Date(blog?.date as string).toDateString() ||
			new Date().toDateString(),
	});

	const handleChange = (key: string, value: string) => {
		setValues({
			...values,
			[key]: value,
		});
	};

	console.log('Editor', blog, edit);

	const [enabled, setEnabled] = useState(edit === undefined ? true : edit);
	return (
		<Editor resolver={resolvers} onRender={RenderNode}>
			<NavBar
				enabled={enabled}
				setEnable={setEnabled}
				handleChange={handleChange}
				values={values}
			/>
			<MiniDrawer />
			<MuiContainer maxWidth={'lg'}>
				<div className={classes.title}>
					<Typography variant="h2" style={{fontWeight: 'bolder'}} align="left">
						{enabled && (
							<TitleInput value={values.title} handleChange={handleChange} />
						)}
					</Typography>
					{!enabled && (
						<>
							<Typography variant="h2">{values.title}</Typography>
							<Typography
								variant="body1"
								align="center"
								className={classes.author}>
								Posted on Posted on {values.date} by B.J. Keeton
							</Typography>
						</>
					)}
				</div>
			</MuiContainer>

			<MuiContainer maxWidth={'lg'} className={classes.main} disableGutters>
				<div className={classes.coverImage}>
					<CoverImage
						handleChange={handleChange}
						imageUrl={blog?.coverImageUrl}
					/>
				</div>

				<Frame data={json}>
					<Element
						canvas
						is={Container}
						width="100%"
						height="auto"
						flexDirection="column"
						padding={['30', '30', '30', '30']}></Element>
				</Frame>

				{/* <Grid container spacing={5}>
					<Grid item xs={12} md={12}>
						</Grid>
					<Grid item xs={12} md={2}>
						<Layers expandRootOnLoad={true} />
					</Grid>
				</Grid> */}
			</MuiContainer>
		</Editor>
	);
};

export default EditorPage;
