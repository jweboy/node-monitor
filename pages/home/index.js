import React from 'react';
// import Link from 'next/link';
import Router from 'next/router';
// import { Breadcrumb } from 'antd';

class App extends React.Component {
	componentDidMount() {
		Router.push('/interface/report');
	}
	render() {
		return null;
	}
}


export default App;
