import React from 'react';
import PropTypes from 'prop-types';
import {UserComponent} from '@craftjs/core';
import {Container as MuiContainer} from '@material-ui/core';

export const Container: UserComponent = ({children}) => {
	return <MuiContainer>{children}</MuiContainer>;
};

export default Container;
