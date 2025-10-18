import { CheerioAPI } from "cheerio";

export const getCleanPageText = (page: CheerioAPI) => {
	const pageText = page('main, article, section, p, h1, h2, h3, h4, h5, h6').text().replace(/\s+/g, ' ').trim();
	return pageText
		.replace(/https?:\/\/\S+|www\.\S+/g, ' ')
		.replace(/[a-z]*\d+[a-z\d]*/gi, ' ')
		.replace(/\b\w+\.\w+\b/g, ' ')
		.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s.!?]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
};