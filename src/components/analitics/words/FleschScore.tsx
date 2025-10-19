import InfoCard from "@/components/InfoCard";
import { getFleschLabel } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const FleschScore = ({ analitics }: FleschScoreProps) => {
	const [fleschScoreValidation, setFleschScoreValidation] = useState<SEOValidationTypes | null>(null);

	useEffect(() => {
		const fleschScore = getFleschLabel(analitics);
		setFleschScoreValidation(fleschScore);
	}, [analitics]);

	if(!fleschScoreValidation) return null;

	return (
		<InfoCard title='Flesch score: ' type={fleschScoreValidation.type} message={fleschScoreValidation.message} />
	);
};

type FleschScoreProps = {
    analitics: number,
}

export default FleschScore;