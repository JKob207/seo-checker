import { headingType } from "@/types";

export const getFleschLabel = (fleschScore: number) => {
	if(fleschScore < 50) return 'Difficult';
	if(fleschScore >= 50 && fleschScore < 70 ) return 'Standard';
	if(fleschScore >= 70) return 'Easy';
	return '';
};

export const getContentDiversityLabels = (contentDiversity: number) => {
	if(contentDiversity < 0.2) return 'All words are the same!';
	if(contentDiversity >= 0.2 && contentDiversity < 0.4 ) return 'Low diversity';
	if(contentDiversity >= 0.4 && contentDiversity < 0.6 ) return 'Moderate diversity';
	if(contentDiversity >= 0.6 && contentDiversity < 0.8 ) return 'High diversity';
	if(contentDiversity >= 0.8 ) return 'Very high diversity';
	return '';
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