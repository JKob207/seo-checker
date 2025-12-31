import { useAnaliticsScoreContext } from "@components/AnaliticsContext";
import InfoCard from "@components/InfoCard";
import { getFleschLabel } from "../../../tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "../../../types";
import { useEffect, useRef, useState } from "react";

const FleschScore = ({ analitics }: FleschScoreProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [fleschScoreValidation, setFleschScoreValidation] = useState<SEOValidationTypes | null>(null);
	const reportedRef = useRef<null | ScoreType>(null);

	useEffect(() => {
		const fleschScore = getFleschLabel(analitics);
		setFleschScoreValidation(fleschScore);

		if (reportedRef.current !== fleschScore.type) {
			handleScore(fleschScore.type);
			reportedRef.current = fleschScore.type;
		}
	}, [analitics, handleScore]);

	if (!fleschScoreValidation) return null;

	return (
		<InfoCard
			title='Flesch score:'
			type={fleschScoreValidation.type}
			message={fleschScoreValidation.message}
		/>
	);
};

type FleschScoreProps = {
    analitics: number,
}

export default FleschScore;