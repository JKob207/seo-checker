export const isValidUrl = (url: string) => {
	if(!url) return false;

	const pattern = /^(https?:\/\/|www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;

	return pattern.test(url.trim());
};