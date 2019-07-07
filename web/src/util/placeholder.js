import placeholder from 'placeholder.js';

const options = {
	size: '512x256',
	bgcolor: '#ccc',
	color: '#969696',
	text: 'loading...',
	fstyle: 'normal',
	fweight: 'normal',
	fsize: '35',
	ffamily: 'consolas',
};

const baseImg = placeholder.getData(options);

export default baseImg;
