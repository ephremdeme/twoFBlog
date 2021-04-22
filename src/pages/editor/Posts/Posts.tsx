import React from 'react';
import { IRoute } from 'router/config';
import Router from '../../../router/Router';

interface IProps {
	routes: IRoute[]
}

const Posts: React.FC<IProps> = ({ routes }) => {
	return (
		<div>
			<Router routes={routes} />
		</div>
	);
};

export default Posts;
