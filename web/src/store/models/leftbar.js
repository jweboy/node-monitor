export default {
	state: {
		selectedKeys: ['interface'],
	}, // initial state
	reducers: {
		toggleActiveKeys(state, payload) {
			return {
				...state,
				selectedKeys: [...payload],
			};
		}
	},
	// effects: {
	//   // handle state changes with impure functions.
	//   // use async/await for async actions
	//   async incrementAsync(payload, rootState) {
	//     await new Promise(resolve => setTimeout(resolve, 1000))
	//     this.increment(payload)
	//   }
	// }
};
