import React from 'react';
import Router from 'next/router';
// import getConfig from 'next/config'
// const { publicRuntimeConfig } = getConfig()

export default class App extends React.Component {
	componentDidMount() {
		Router.push('/interface');
	}

	render () {
		return null;
	}
}
