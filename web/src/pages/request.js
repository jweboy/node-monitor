const request = async (url) => {
	// const env = process.env;
	// const baseURL = `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`;

	const resp = await fetch(url);
	const data = await resp.json();
	return data;
};

export default request;
