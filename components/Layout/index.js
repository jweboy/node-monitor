import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import './index.css';

const MenuItem = Menu.Item;

const menu = [{
	key: 'api-report',
	name: '接口报警'
}];

export class Layout extends Component {
	render() {
		return (
			<div className="app">
				<Menu mode="inline" theme="dark" className="menu">
					{
						menu.map((item) => (
							<MenuItem key={item.key}>
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

Layout.defaultProps = {
	children: <div />,
};

Layout.propTypes = {
	children: PropTypes.element
};

export default Layout;
