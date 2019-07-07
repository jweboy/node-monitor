import React, { Component } from 'react';
import styles from './index.less';

class TestDir extends Component {
	render() {
		return [
			<span className={styles.font} key={1}>TestDir</span>,
			<span key={2} className={styles.atText}>TestDir2</span>
		];
	}
}

export default TestDir;
