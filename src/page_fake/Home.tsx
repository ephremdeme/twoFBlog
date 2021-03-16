import React from 'react';
import {Link} from 'react-router-dom';
import routes, { IRoute } from 'router/config';
import Router from '../router/Router';

interface IProps {
	routes: IRoute[]
}

const Home: React.FC<IProps> = ({ routes }) => {
	console.log('home');
	return (
		<div>
			<h1> Home Component </h1>
			<Link to="/home/signup">dash</Link>
			<Router routes={routes} />
		</div>
	);
};

export default Home;
