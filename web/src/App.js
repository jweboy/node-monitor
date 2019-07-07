import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Layout, Breadcrumb, Icon } from 'antd';
import { Route, Router } from 'react-router';
import AppRouter from './routes';
import Leftbar from './components/Leftbar';
import styles from './App.less';

class App extends Component {
	render() {
		console.log('render！~~');
		return (
			<Layout  style={{ minHeight: '100vh' }}>
				<Leftbar />
				<Layout className={styles.main}>
					{/* <Breadcrumb className={styles.breadcrumb}>
                        <Breadcrumb.Item href="/interface">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>请求详情</span>
                        </Breadcrumb.Item>
                    </Breadcrumb> */}
				    <AppRouter />
				</Layout>
			</Layout>
		);
	}
}

export default hot(module)(App);
