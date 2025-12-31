import { headingType, SEOValidationTypes } from "../../types";

export const getFleschLabel = (fleschScore: number): SEOValidationTypes => {
	if(fleschScore < 50) return {
		type: 'danger',
		message: 'Difficult'
	};
	if(fleschScore >= 50 && fleschScore < 70 ) return {
		type: 'warning',
		message: 'Standard'
	};
	if(fleschScore >= 70) return {
		type: 'info',
		message: 'Easy'
	};
	return {
		type: 'info',
		message: ''
	};
};

export const getContentDiversityLabels = (contentDiversity: number): SEOValidationTypes => {
	if(contentDiversity < 0.2) return {
		type: 'danger',
		message: 'All words are the same!'
	};
	if(contentDiversity >= 0.2 && contentDiversity < 0.4 ) return {
		type: 'danger',
		message: 'Low diversity'
	};
	if(contentDiversity >= 0.4 && contentDiversity < 0.6 ) return {
		type: 'warning',
		message: 'Moderate diversity'
	};
	if(contentDiversity >= 0.6 && contentDiversity < 0.8 ) return {
		type: 'info',
		message: 'High diversity',
	};
	if(contentDiversity >= 0.8 ) return {
		type: 'info',
		message: 'Very high diversity'
	};
	return {type: 'info', message: ''};
};

export const getHeadingsValidation = (headings: headingType[]) => {
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

export const getTitleLengthValidation = (length: number): SEOValidationTypes => {
	if(length < 50) return {
		type: 'warning',
		message: 'Title too short'
	};
	if(length >= 50 && length <= 60) return {
		type: 'success',
		message: 'Title correct length'
	};
	if(length > 60) return {
		type: 'warning',
		message: 'Title too long'
	};
	return {
		type: 'info',
		message: ''
	};
};

export const getDescriptionLengthValidation = (length: number): SEOValidationTypes => {
	if(length < 120) return {
		type: 'warning',
		message: 'Description too short'
	};
	if(length >= 120 && length <= 160) return {
		type: 'success',
		message: 'Description correct length'
	};
	if(length > 160) return {
		type: 'warning',
		message: 'Description too long'
	};
	return {
		type: 'info',
		message: ''
	};
};

export const getPageLoadTimeValidation = (loadTime: number): SEOValidationTypes => {
	if(loadTime < 1000) return {
		type: 'success',
		message: 'Lightning fast'
	};
	if(loadTime < 2500) return {
		type: 'info',
		message: 'Good performance'
	};
	if(length < 4000) return {
		type: 'warning',
		message: 'Needs improvment'
	};
	return {
		type: 'danger',
		message: 'Slow — optimize loading'
	};
};

export const getPageSizeValidation = (sizeKb: number): SEOValidationTypes => {
	if(sizeKb < 500) return {
		type: 'success',
		message: 'Very lightweight page'
	};
	if(sizeKb < 1500) return {
		type: 'info',
		message: 'Good page size'
	};
	if(sizeKb < 3000) return {
		type: 'warning',
		message: 'Consider optimizing assets'
	};
	return {
		type: 'danger',
		message: 'Too large — may impact SEO and UX'
	};
};

export const getInternalLinksValidation = (internalSize: number, totalLinks: number): SEOValidationTypes => {
	const ratio = (internalSize / totalLinks) * 100;

	if(ratio > 0.6) return {
		type: 'success',
		message: 'Good internal links ratio (> 60%)'
	};
	if(ratio <= 0.6 && ratio > 0.4) return {
		type: 'warning',
		message: 'Consider increase number of external links'
	};
	return {
		type: 'danger',
		message: 'To less internal links. Consider improvment to at least 40%'
	};
};

export const getExternalLinksValidation = (externalSize: number, totalLinks: number): SEOValidationTypes => {
	const ratio = (externalSize / totalLinks) * 100;

	if(ratio < 0.3) return {
		type: 'success',
		message: 'Good external links ratio (< 30%)'
	};
	if(ratio <= 0.3 && ratio >= 0.5) return {
		type: 'warning',
		message: 'Reduce number of external links'
	};
	return {
		type: 'danger',
		message: 'Too many external links. Reduce its number to at least 50%'
	};
};

export const getBrokenLinksValidation = (brokenSize: number): SEOValidationTypes => {
	if(brokenSize >= 1 && brokenSize <= 3) return {
		type: 'warning',
		message: 'Reduce number of broken links'
	};
	return {
		type: 'danger',
		message: 'Too many broken links. Fix them!'
	};
};