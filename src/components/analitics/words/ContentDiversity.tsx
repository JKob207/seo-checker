import InfoCard from "@/components/InfoCard";
import { getContentDiversityLabels } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const ContentDiversity = ({ analitics }: ContentDiversityProps) => {
	const [contentDiversityValidation, setContentDiversityValidation] = useState<SEOValidationTypes | null>(null);

	useEffect(() => {
		const ranking = getContentDiversityLabels(analitics);
		setContentDiversityValidation(ranking);
	}, [analitics]);

	if(!contentDiversityValidation) return null;

	return (
		<InfoCard title='Content diversity: ' type={contentDiversityValidation.type} message={contentDiversityValidation.message} />
	);
};

type ContentDiversityProps = {
    analitics: number,
}

export default ContentDiversity;