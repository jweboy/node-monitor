import { spring } from 'react-motion';

const fadeTransitionConfig = {
	stiffness: 20,
	damping: 50,
};
const popTransitionConfig = {
	stiffness: 360,
	damping: 25,
};
const slideTransitionConfig = {
	stiffness: 330,
	damping: 30,
};

const noTransition = {
	atEnter: {
		opacity: 1,
		scale: 1,
		offset: 0,
	},
	atLeave: {
		opacity: spring(1, fadeTransitionConfig),
		scale: spring(1, popTransitionConfig),
		offset: spring(0, slideTransitionConfig),
	},
	atActive: {
		opacity: spring(1, fadeTransitionConfig),
		scale: spring(1, popTransitionConfig),
		offset: spring(0, slideTransitionConfig),
	},
	mapStyles(styles) {
		return {
			transform: `translateX(${styles.offset}%) scale(${styles.scale})`,
		};
	},
};

const fade = {
	atEnter: Object.assign({}, noTransition.atEnter, {
		opacity: 0,
	}),
	atLeave: Object.assign({}, noTransition.atLeave, {
		opacity: spring(0, fadeTransitionConfig),
	}),
	atActive: Object.assign({}, noTransition.atLeave, {
		opacity: spring(1, fadeTransitionConfig),
	}),
	mapStyles: noTransition.mapStyles,
};

const pop = {
	atEnter: Object.assign({}, noTransition.atEnter, {
		scale: 0.8,
	}),
	atLeave: Object.assign({}, noTransition.atLeave, {
		scale: spring(0.8, popTransitionConfig),
	}),
	atActive: Object.assign({}, noTransition.atLeave, {
		scale: spring(1, popTransitionConfig),
	}),
	mapStyles: noTransition.mapStyles,
};

const slideLeft = {
	atEnter: Object.assign({}, noTransition.atEnter, {
		offset: 100,
	}),
	atLeave: Object.assign({}, noTransition.atLeave, {
		offset: spring(-100, slideTransitionConfig),
	}),
	atActive: Object.assign({}, noTransition.atLeave, {
		offset: spring(0, slideTransitionConfig),
	}),
	mapStyles: noTransition.mapStyles,
};

const slideRight = {
	atEnter: Object.assign({}, noTransition.atEnter, {
		offset: -100,
	}),
	atLeave: Object.assign({}, noTransition.atLeave, {
		offset: spring(100, slideTransitionConfig),
	}),
	atActive: Object.assign({}, noTransition.atLeave, {
		offset: spring(0, slideTransitionConfig),
	}),
	mapStyles: noTransition.mapStyles,
};

export default {
	fade,
	pop,
	slideLeft,
	slideRight,
};
