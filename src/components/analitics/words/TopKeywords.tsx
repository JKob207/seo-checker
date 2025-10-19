import InfoCard from "@/components/InfoCard";
import { wordsFrequencyRecord } from "@/types";
import { useEffect, useState } from "react";

const TopKeywords = ({ analitics }: TopKeywordsProps) => {
	const [topKeywords, setTopKeywords] = useState('');

	useEffect(() => {
		const keywords = analitics.map((word: wordsFrequencyRecord) => word[0]).join(', ');

		setTopKeywords(keywords);
	}, [analitics]);

	if(!topKeywords) return null;

	return (
		<InfoCard title='Top 10 keywords: ' type='info' message={topKeywords} />
	);
};

type TopKeywordsProps = {
    analitics: wordsFrequencyRecord[],
}

export default TopKeywords;