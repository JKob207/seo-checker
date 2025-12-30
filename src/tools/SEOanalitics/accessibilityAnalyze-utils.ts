import { CheerioAPI } from "cheerio";

export const getAccessibilityAnalitics = (page: CheerioAPI) => {
	const missingAltAttr = isMissingAltAttr(page);

	return {
		missingAltAttr
	};
};

const isMissingAltAttr = (page: CheerioAPI) => {
	const missingAlt: string[] = [];

	const imgTags = page('body img');
	imgTags.each((_, el) => {
		const alt = el.attribs['alt'];
		if(!alt && el.attribs['src'] !== '' ) {
			missingAlt.push(el.attribs['src']);
		}
	});

	return missingAlt;
};