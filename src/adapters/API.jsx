const endpoint = 'https://api.carbonintensity.org.uk/generation';

const fetchData = () => {
	return fetch(endpoint).then((response) => response.json());
};

export default {
	fetchData
};
