import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { wordsFrequencyRecord } from "@/types";
import { useEffect, useRef, useState } from "react";

const TopKeywords = ({ analitics }: TopKeywordsProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [topKeywords, setTopKeywords] = useState('');
	const reportedRef = useRef(false);

	useEffect(() => {
		const keywords = analitics.map((word: wordsFrequencyRecord) => word[0]).join(', ');
		setTopKeywords(keywords);

		if (!reportedRef.current) {
			handleScore('info');
			reportedRef.current = true;
		}
	}, [analitics, handleScore]);

	if (!topKeywords) return null;

	return (
		<InfoCard
			title='Top 10 keywords:'
			type='info'
			message={topKeywords}
		/>
	);
};

type TopKeywordsProps = {
    analitics: wordsFrequencyRecord[],
}

export default TopKeywords;