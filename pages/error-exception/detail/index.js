import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import './index.less';

const Layout = dynamic(() => import('../../../components/Layout'));

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
