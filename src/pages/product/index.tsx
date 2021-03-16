import React from 'react';
import {Switch} from 'react-router-dom';
import {IRoute} from 'router/config';
import Router from '../../router/Router';

interface IProps {
	routes: IRoute[]
}

const Product: React.FC<IProps> = ({ routes }) => {
	return (
		<div>
			<Switch>
				<Router routes={routes} />
			</Switch>
		</div>
	);
};

export default Product;
