import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import dynamic from 'next/dynamic';
import './index.less';

const Layout = dynamic(() => import('../../../components/Layout'));

const BreadcrumbItem = Breadcrumb.Item;

class ErrorExceptionDetail extends Component {
	static async getInitialProps(props) {
		const { query } = props;

    	return {
    		data: query,
    	};
	}
	render() {
		const { data } = this.props;

		return (
			<Layout>
				<Breadcrumb className="breadcrumb">
    				<BreadcrumbItem href="/error-exception">
    					<Icon type="home" />
    				</BreadcrumbItem>
    				<BreadcrumbItem>
    					<span>代码异常详情</span>
    				</BreadcrumbItem>
    			</Breadcrumb>
				<div>
					<h3>{data.source}</h3>
					<h4>{data.url}</h4>
					{data.sourceContent.split('\n').map((text, index) => (
						<div key={index}>
							<pre className={data.lineNo === index + 1 ? 'error' : ''}>
								<span>{index + 1}.</span>
								<span>{text}</span>
							</pre>
						</div>
					))}
				</div>
			</Layout>
		);
	}
}

export default ErrorExceptionDetail;
