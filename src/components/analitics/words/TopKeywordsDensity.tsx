import InfoCard from "@/components/InfoCard";
import { wordsFrequencyRecord } from "@/types";
import { useEffect, useState } from "react";

const TopKeywordsDensity = ({ analitics }: TopKeywordsDensityProps) => {
	const [topKeywordsDensity, setTopKeywordsDensity] = useState('');

	useEffect(() => {
		const keywordsDensity = analitics.map((word: wordsFrequencyRecord) => `${word[0]}: ${word[1].toFixed(2)}%`).join(', ');

		setTopKeywordsDensity(keywordsDensity);
	}, [analitics]);

	if(!topKeywordsDensity) return null;

	return (
		<InfoCard title='Keywords density: ' type='info' message={topKeywordsDensity} />
	);
};

type TopKeywordsDensityProps = {
    analitics: wordsFrequencyRecord[],
}

export default TopKeywordsDensity;