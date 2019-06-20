import React from 'react';
// import getConfig from 'next/config'
import Link from 'next/link';
// const { publicRuntimeConfig } = getConfig()

export default class extends React.Component {
	static async getInitialProps () {
		// fetch(`${API_URL}/some-path`)
		return {};
	}

	render () {
		return <div>
			<Link href="/about"><a>click</a></Link>
		</div>;
	}
}
