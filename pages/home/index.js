import React from 'react';
import Link from 'next/Link';
import Router from 'next/router';
import { Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import Layout from '../../components/layout';

class App extends React.Component {
	componentDidMount() {
		Router.push('/dashboard/interface');
	}
	render() {
		return (
			<Layout>
				<Breadcrumb>
					<Breadcrumb.Item>home</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Link href="/dashboard/interface">api</Link>
					</Breadcrumb.Item>
				</Breadcrumb>
			</Layout>
		);
	}
}


export default App;
