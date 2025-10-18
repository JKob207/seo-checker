import { getCleanPageText } from '@/tools/page-utils';
import { getAccessibilityAnalitics } from '@/tools/SEOanalitics/accessibilityAnalyze-utils';
import { getStructureAnalitics } from '@/tools/SEOanalitics/structureAnalyze-utils';
import { getTechAnalitics } from '@/tools/SEOanalitics/technicalAnalyze-utils';
import { getWordsAnalitics } from '@/tools/SEOanalitics/wordsAnalyze-utils';
import { analyzeResponse } from '@/types';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const POST = async (req: Request) => {
	try {
		const { url }: analyzeResponse = await req.json();
		const res = await axios.get(url);
		const websiteHTML = res.data;

		const page = cheerio.load(websiteHTML);
		page('script, style, noscript, svg, canvas, iframe, header, nav, footer, form').remove();
		page('[hidden], .visually-hidden, .sr-only, [role="navigation"]').remove();
		const pageText = getCleanPageText(page);

		const wordsAnalitics = getWordsAnalitics(pageText);
		const structureAnalitics = getStructureAnalitics(page, wordsAnalitics.topKeywords);
		const techAnalitics = await getTechAnalitics(page, url);
		const accessibilityAnalitics = getAccessibilityAnalitics(page);

		const raport = {
			wordsAnalitics,
			structureAnalitics,
			techAnalitics,
			accessibilityAnalitics
		};

		return new Response(JSON.stringify(raport), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Failed to analyze the page", { status: 500 });
	}
};