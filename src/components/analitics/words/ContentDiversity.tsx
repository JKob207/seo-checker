import { useAnaliticsScoreContext } from "@components/AnaliticsContext";
import InfoCard from "@components/InfoCard";
import { getContentDiversityLabels } from "../../../tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "../../../types";
import { useEffect, useRef, useState } from "react";

const ContentDiversity = ({ analitics }: ContentDiversityProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [contentDiversityValidation, setContentDiversityValidation] = useState<SEOValidationTypes | null>(null);

	const reportedRef = useRef<null | ScoreType>(null);

	useEffect(() => {
		const ranking = getContentDiversityLabels(analitics);
		setContentDiversityValidation(ranking);

		if (reportedRef.current !== ranking.type) {
			handleScore(ranking.type);
			reportedRef.current = ranking.type;
		}
	}, [analitics, handleScore]);

	if (!contentDiversityValidation) return null;

	return (
		<InfoCard
			title='Content diversity:'
			type={contentDiversityValidation.type}
			message={contentDiversityValidation.message}
		/>
	);
};

type ContentDiversityProps = {
    analitics: number,
}

export default ContentDiversity;