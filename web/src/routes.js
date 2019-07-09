import React from 'react';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';


const Home = Loadable({
	loader: () => import(/* webpackChunkName: home */ 'pages'),
	loading() {
		return (
			<span>loading</span>
		);
	}
});

const InterfaceList = Loadable({
	loader: () => import(/* webpackChunkName: 'interfaceList' */ 'pages/interface/list'),
	loading() {
		return (
			<span>loading</span>
		);
	}
});

const InterfaceDetail = Loadable({
	loader: () => import(/* webpackChunkName: 'interfaceDetail' */ 'pages/interface/detail'),
	loading() {
		return (
			<span>loading</span>
		);
	}
});
const ErrorExceptionList = Loadable({
	loader: () => import(/* webpackChunkName: 'errorExceptionList' */ 'pages/error-exception/list'),
	loading() {
		return (
			<span>loading</span>
		);
	}
});
const ErrorExceptionDetail = Loadable({
	loader: () => import(/* webpackChunkName: 'errorExceptionList' */ 'pages/error-exception/detail'),
	loading() {
		return (
			<span>loading</span>
		);
	}
});

// import InterfaceList from 'pages/interface/list';
// import InterfaceDetail from 'pages/interface/detail';
// import ErrorExceptionList from 'pages/error-exception/list';
// import ErrorExceptionDetail from 'pages/error-exception/detail';

const AppRouter = () => (
	<Router basepath="monitor">
		{/* <Route exact path="/" render={() => (<Redirect to="/interface" />)} /> */}
		<Home path="/" />
		<InterfaceList path="interface" />
		<InterfaceDetail path="interface/:id" />
		<ErrorExceptionList path="error-exception" />
		<ErrorExceptionDetail path="error-exception/:id" />
	</Router>
);

export default AppRouter;
