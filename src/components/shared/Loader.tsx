import React, {useEffect, useRef} from 'react';
import LoadingBar from 'react-top-loading-bar';

const Loader = () => {
	const ref = useRef<any>(null);

	useEffect(() => {
		ref.current.continuousStart();
	}, []);

	return <LoadingBar color="#f11946" ref={ref} shadow={true} />;
};

export default Loader;
