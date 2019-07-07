import React, { Component } from 'react';
import styles from './index.less';

class TestLess extends Component {
	render() {
		return [
			<span className={styles.text} key={1}>TestLess</span>,
			<span key={2} className={styles.atText}>TestLess1</span>
		];
	}
}

export default TestLess;