import {Element, useEditor, useNode} from '@craftjs/core';
import {FormControl, makeStyles, TextField} from '@material-ui/core';
import React, {useEffect} from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import Container from '../container/container';
import VideoSetting from './videoSetting';

const YoutubeDiv = styled.div<any>`
	width: 100%;
	height: 100%;
	> div {
		height: 100%;
	}
	iframe {
		pointer-events: ${(props) => (props.enabled ? 'none' : 'auto')};
		// width:100%!important;
		// height:100%!important;
	}
`;

export const Video = (props: any) => {
	const {enabled} = useEditor((state) => ({
		enabled: state.options.enabled,
	}));
	const {
		connectors: {connect},
	} = useNode((node) => ({
		selected: node.events.selected,
	}));

	const {videoId} = props;

	return (
		<YoutubeDiv ref={connect} enabled={enabled}>
			<YouTube
				videoId={videoId}
				opts={{
					width: '100%',
					height: '100%',
				}}
			/>
		</YoutubeDiv>
	);
};

Video.craft = {
	displayName: 'Video',
	props: {
		videoId: 'IwzUs1IMdyQ',
	},
	related: {
		settings: VideoSetting,
	},
};
