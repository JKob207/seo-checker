import { headingType } from "@/types";
import { CheerioAPI } from "cheerio";

export const getStructureAnalitics = (page: CheerioAPI, topKeywords:  [string, number][]) => {
	const titleReport = getTitleReport(page, topKeywords);
	const descriptionReport = getDescriptionReport(page);
	const canonicalTag = getCanonicalTag(page);
	const robotsTag = getRobotsTag(page);
	const langTag = getLangTag(page);
	const headingStructure = checkHeadingsStructure(page);

	return {
		titleReport,
		descriptionReport,
		canonicalTag,
		robotsTag,
		langTag,
		headingStructure
	};
};

const getTitleReport = (page: CheerioAPI, topKeywords:  [string, number][]) => {
	const title = page('head title').text();
	const includedTopKeywords: string[] = [];
	for(const [word] of topKeywords) {
		if(title.toLowerCase().includes(word)) includedTopKeywords.push(word);
	}

	return {
		title: title,
		titleLength: title.length,
		includedTopKeywords: includedTopKeywords
	};
};

const getDescriptionReport = (page: CheerioAPI) => {
	const description = page('head meta[name="description"]').text();

	return {
		description: description,
		descriptionLength: description.length,
	};
};

const getCanonicalTag = (page: CheerioAPI) => {
	const canonicalTag = page('link[rel="canonical"]').attr("href");

	return canonicalTag || null;
};

const getRobotsTag = (page: CheerioAPI) => {
	const robots = page('meta[name="robots"]').attr("content") ||
    page('meta[name="googlebot"]').attr("content");

	return robots || null;
};

const getLangTag = (page: CheerioAPI) => {
	const langTag = page('html').attr('lang');
	return langTag || null;
};

const checkHeadingsStructure = (page: CheerioAPI) => {
	const headings = getHeadings(page);
	const headingsValidation = getHeadingsValidation(headings);

	return {
		headings,
		validation: headingsValidation
	};
};

const getHeadings = (page: CheerioAPI) => {
	const headings: headingType[] = [];
	page("h1, h2, h3, h4, h5, h6").each((_, el) => {
		const tag = el.tagName.toLowerCase();
		const text = page(el).text().trim().replace(/\s+/g, " ");
		headings.push({ level: parseInt(tag[1]), text });
	});
	return headings;
};

const getHeadingsValidation = (headings: headingType[]) => {
	const issues = [];
	if(!headings.length) {
		issues.push('No headings found');
		return issues;
	}

	let lastLevel = 0;

	headings.forEach((heading) => {
		if (lastLevel && heading.level > lastLevel + 1) {
			issues.push(`Skipped from H${lastLevel} to H${heading.level}: "${heading.text}"`);
		}
		lastLevel = heading.level;
	});

	const h1Count = headings.filter(h => h.level === 1).length;
	if (h1Count === 0) issues.push("Missing H1 heading");
	if (h1Count > 1) issues.push("Multiple H1 headings");

	return issues;
};