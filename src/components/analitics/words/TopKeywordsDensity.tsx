import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { wordsFrequencyRecord } from "@/types";
import { useEffect, useRef, useState } from "react";

const TopKeywordsDensity = ({ analitics }: TopKeywordsDensityProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [topKeywordsDensity, setTopKeywordsDensity] = useState('');
	const reportedRef = useRef(false);

	useEffect(() => {
		const keywordsDensity = analitics.map((word: wordsFrequencyRecord) => `${word[0]}: ${word[1].toFixed(2)}%`).join(', ');

		setTopKeywordsDensity(keywordsDensity);

		if (!reportedRef.current) {
			handleScore('info');
			reportedRef.current = true;
		}
	}, [analitics, handleScore]);

	if(!topKeywordsDensity) return null;

	return (
		<InfoCard title='Keywords density: ' type='info' message={topKeywordsDensity} />
	);
};

type TopKeywordsDensityProps = {
    analitics: wordsFrequencyRecord[],
}

export default TopKeywordsDensity;