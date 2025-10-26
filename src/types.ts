export type analyzeResponse = {
	url: string,
};

export type wordsFrequencyRecord = Record<string, number>;

export type headingType = { level: number, text: string };

export type analiticsReportType = {
	wordsAnalitics: wordsAnaliticsType,
	structureAnalitics: structureAnaliticsType,
	techAnalitics: techAnaliticsType,
	accessibilityAnalitics: accessibilityAnaliticsType
};

export type wordsAnaliticsType = {
	contentDiversity: number,
	fleschScore: number,
	topKeywords: wordsFrequencyRecord[],
	topKeywordsDensity: wordsFrequencyRecord[],
};

export type structureAnaliticsType = {
	canonicalTag: string | null,
	descriptionReport: {
		description: string,
		descriptionLength: number,
	},
	headingsStructure: headingType[],
	langTag: string | null,
	robotsTag: string | null,
	titleReport: {
		includedTopKeywords: string[],
		title: string,
		titleLength: number,
	}
};

export type techAnaliticsType = {
	httpsSecurity: boolean,
	linksStats: {
		internal: string[],
		external: string[],
		brokenCandidates: string[],
		total: number,
	},
	mobileViewportTag: string | null,
	pageLoadTime: {
		loadTimeMs: string,
		sizeKb: string,
	}
};

export type accessibilityAnaliticsType = {
	missingAltAttr: string[]
};

export type alertTypes = 'info' | 'warning' | 'danger' | 'success';

export type SEOValidationTypes = {
	type: alertTypes,
	message: string
};

export type ScoreType = "info" | "warning" | "danger" | "success";

