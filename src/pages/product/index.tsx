import React from 'react';
import {Switch} from 'react-router-dom';
import {IRoute} from 'router/config';
import Router from '../../router/Router';
import ProductList from './ProductList';

interface IProps {
	routes: IRoute[]
}

const Product: React.FC<IProps> = ({ routes }) => {
	return (
		<div style={{margin: '10rem'}}>
			<Router routes={routes} />
		</div>
	);
};

export default Product;
