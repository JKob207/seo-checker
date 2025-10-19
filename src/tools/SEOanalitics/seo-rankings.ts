import { headingType, SEOValidationTypes } from "@/types";

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