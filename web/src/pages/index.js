import React, { Component } from 'react';
import { Redirect } from '@reach/router';

class Home extends Component {
	render () {
		return <Redirect to="/monitor/interface" noThrow />;
	}
}

export default Home;
