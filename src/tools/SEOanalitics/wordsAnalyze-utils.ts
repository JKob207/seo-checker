import { wordsFrequencyRecord } from "@/types";

const MIN_WORD_LETTERS = 3;
const TOP_KEYWORDS = 10;
const FLEASCH_BASELINE = 206.835;
const LONG_SENTENCES_FLEASCH_PENALTY = 1.015;
const COMPLEX_WORDS_FLEASCH_PENALTY = 84.6;

export const getWordsAnalitics = (pageText: string) => {
	const words = pageText.toLowerCase().split(/\s+/);

	const wordsCounts = words.length;
	const wordsFrequency = getWordsFrequency(words);
	const topKeywords = getTopKeyworlds(wordsFrequency);
	const fleschScore = calculateFleschReadingEase(pageText);
	const topKeywordsDensity = getKeywordsDensity(wordsFrequency, wordsCounts);
	const contentDiversity = getContentDiversity(words);

	return {
		wordsCounts,
		fleschScore,
		topKeywords,
		topKeywordsDensity,
		contentDiversity
	};
};

const getWordsFrequency = (words: string[]) => {
	const wordsFrequency: wordsFrequencyRecord = {};
	words.forEach((word: string) => {
		if(word.length > MIN_WORD_LETTERS) wordsFrequency[word] = ((wordsFrequency[word] || 0) + 1);
	});
	return wordsFrequency;
};

const getTopKeyworlds = (wordsFrequency: wordsFrequencyRecord) => Object.entries(wordsFrequency)
	.sort((a, b) => b[1] - a[1])
	.slice(0, TOP_KEYWORDS);

const getKeywordsDensity = (wordsFrequency: wordsFrequencyRecord, total: number) => {
	const keywordsDensity: wordsFrequencyRecord = {};
	Object.keys(wordsFrequency)
		.forEach((word) => {
			keywordsDensity[word] = (wordsFrequency[word] / total) * 100;
		});

	return getTopKeyworlds(keywordsDensity);
};

const getContentDiversity = (words: string[]) => new Set(words).size / words.length;

const estimateSyllables = (word: string) => {
	word = word.toLowerCase();
	if (word.length <= 3) return 1;
	const cleaned = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
	const matches = cleaned.match(/[aeiouy]{1,2}/g);
	return matches ? matches.length : 1;
};

const calculateFleschReadingEase = (text: string) => {
	const sentences = text.split(/[.!?]+/).filter(Boolean);
	const words = text.split(/\s+/).filter(Boolean);

	if (sentences.length === 0 || words.length === 0) return null;

	const syllables = words.reduce((sum, w) => sum + estimateSyllables(w), 0);

	const wordsPerSentence = words.length / sentences.length;
	const syllablesPerWord = syllables / words.length;

	const flesch = FLEASCH_BASELINE - LONG_SENTENCES_FLEASCH_PENALTY * wordsPerSentence - COMPLEX_WORDS_FLEASCH_PENALTY * syllablesPerWord;

	return Number(flesch.toFixed(2));
};


// Remove to another util

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