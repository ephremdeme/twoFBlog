import {useNode} from '@craftjs/core';
import {FormControl, TextField} from '@material-ui/core';
import React from 'react';

import getYoutubeId from 'get-youtube-id';

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
					label="Youtube Video Url/Link"
					value={videoId}
					onChange={(e) =>
						setProp(
							(props) =>
								(props.videoId = getYoutubeId(e.target.value, {fuzzy: false}))
						)
					}></TextField>
			</FormControl>
		</>
	);
}

export default VideoSetting;
