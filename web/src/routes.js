import React from 'react';
import { Router } from '@reach/router';


import InterfaceList from 'pages/interface/list';
import InterfaceDetail from 'pages/interface/detail';
import ErrorExceptionList from 'pages/error-exception/list';
import ErrorExceptionDetail from 'pages/error-exception/detail';

const AppRouter = () => (
	<Router>
		{/* <Route exact path="/" render={() => (<Redirect to="/interface" />)} /> */}
		<InterfaceList path="/interface" />
		<InterfaceDetail path="/interface/:id" />
		<ErrorExceptionList path="/error-exception" />
		<ErrorExceptionDetail path="/error-exception/:id" />
	</Router>
);

export default AppRouter;
