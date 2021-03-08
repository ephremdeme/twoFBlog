import {useNode} from '@craftjs/core';
import {FormControl, TextField} from '@material-ui/core';
import React from 'react';

function VideoSetting() {
	const {
		actions: {setProp},
		videoId,
	} = useNode((node) => ({
		videoId: node.data.props.videoId,
	}));

	return (
		<>
			<FormControl size="small" component="fieldset">
				<TextField
					label="Video ID"
					value={videoId}
					onChange={(e) =>
						setProp((props) => (props.videoId = e.target.value))
					}></TextField>
			</FormControl>
		</>
	);
}

export default VideoSetting;
