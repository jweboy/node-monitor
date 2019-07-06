import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Menu } from 'antd';
// import PropTypes from 'prop-types';
import './index.less';

const MenuItem = Menu.Item;

const menu = [
	{
	    key: 'interface',
		name: '接口分析',
		url: '/interface',
	},
	{
		key: 'error-exception',
		name: '代码异常',
		url: '/error-exception',
	}
];

@withRouter
class Layout extends Component {
    state = {
    	active: 'interface'
    }
    componentDidMount() {
    	console.warn(this.props.router);
    	const { router } = this.props;

    	this.setState({
    		active: router.asPath.split('/')[1]
    	});
    }

    handleItemClick = (item) => () => {
    	const { router } = this.props;

    	router.replace(item.url);
    }
    render() {
    	const { active } = this.state;
    	console.warn(active);

    	return (
    		<div className="app">
    			<Menu mode="inline" theme="dark" className="menu" selectedKeys={[active]}>
    				{
    					menu.map((item) => (
    						<MenuItem key={item.key} onClick={this.handleItemClick(item)}>
    							<span>{item.name}</span>
    						</MenuItem>
    					))
    				}
    			</Menu>
    			<div className="main">
				    {this.props.children}
    			</div>
    		</div>
    	);
    }
}

export default Layout;
