import React, { Component } from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
// import PropTypes from 'prop-types';
import styles from'./index.less';

const MenuItem = Menu.Item;
const { Sider } = Layout;

const menu = [
	{
	    key: 'interface',
		name: '接口分析',
		url: '/monitor/interface',
	},
	{
		key: 'error-exception',
		name: '代码异常',
		url: '/monitor/error-exception',
	}
];

@connect(
	(state) => ({
		selectedKeys: state.leftbar.selectedKeys,
	}),
	({ leftbar }) => ({
		toggleActiveKeys: leftbar.toggleActiveKeys,
	})
)
class Leftbar extends Component {
    handleMenuClick = ({ keyPath }) => {
    	const { toggleActiveKeys } = this.props;

    	toggleActiveKeys(keyPath);
    }
    render() {
    	const { selectedKeys } = this.props;

    	return (
    		<Sider  className={styles.menu} >
    			<Menu mode="inline" theme="dark" className={styles.menu} selectedKeys={selectedKeys} onClick={this.handleMenuClick}>
    				{
    					menu.map((item) => (
    						<MenuItem key={item.key}>
    							<Link to={item.url}>{item.name}</Link>
    						</MenuItem>
    					))
    				}
    			</Menu>
    		</Sider>
    	);
    }
}

export default Leftbar;
