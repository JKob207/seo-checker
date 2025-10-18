import { CheerioAPI } from "cheerio";
import { performance } from 'node:perf_hooks';

export const getTechAnalitics = async (page: CheerioAPI, baseURL: string) => {
	const linksStats = getLinksStats(page, baseURL);
	const pageLoadTime = await getPageLoadTime(baseURL);
	const mobileViewportTag = getMobileViewportTag(page);
	const httpsSecurity = isHttps(baseURL);

	return {
		linksStats,
		pageLoadTime,
		mobileViewportTag,
		httpsSecurity
	};
};

const getLinksStats = (page: CheerioAPI, baseURL: string) => {
	const links: string[] = [];
	page("a[href]").each((_, el) => {
		const href = el.attribs['href'];
		if (!href) return;
		links.push(href);
	});
	return analyzeLinks(links, baseURL);
};

const analyzeLinks = (links: string[], baseURL: string) => {
	const { hostname } = new URL(baseURL);

	const stats = {
		total: links.length,
		internal: [] as string[],
		external: [] as string[],
		brokenCandidates: [] as string[],
	};

	for (const href of links) {
		try {
			const url = new URL(href, baseURL);

			if (url.hostname === hostname) {
				stats.internal.push(href);
			} else {
				stats.external.push(href);
			}
		} catch {
			stats.brokenCandidates.push(href);
		}
	}

	return stats;
};

const getPageLoadTime = async (url: string) => {
	const start = performance.now();
	const response = await fetch(url);
	const html = await response.text();
	const end = performance.now();

	const loadTimeMs = (end - start).toFixed(2);
	const sizeKb = (Buffer.byteLength(html) / 1024).toFixed(2);

	return {
		loadTimeMs,
		sizeKb
	};
};

const getMobileViewportTag = (page: CheerioAPI) => {
	const viewportTag = page('meta[name="viewport"]').attr('content');

	return viewportTag || null;
};

const isHttps = (url: string) => {
	try {
		const { protocol } = new URL(url);
		return protocol === "https:";
	} catch {
		return false;
	}
};

