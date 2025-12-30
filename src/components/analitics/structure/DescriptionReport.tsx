import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { getDescriptionLengthValidation } from "@/tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "@/types";
import { useEffect, useRef, useState } from "react";

const DescriprionReport = ({ analitics }: DescriprionReportProps) => {
	const { handleScore } = useAnaliticsScoreContext();

	const [descriptionLengthValidation, setDescriptionLengthValidation] = useState<SEOValidationTypes | null>(null);

	const reportedRef = useRef<null | ScoreType>(null);

	useEffect(() => {
		if (!analitics.description) {
			if (reportedRef.current !== 'danger') {
				handleScore('danger');
				reportedRef.current = 'danger';
			}
			return;
		}

		const result = getDescriptionLengthValidation(
			analitics.descriptionLength
		);

		setDescriptionLengthValidation(result);

		if (reportedRef.current !== result.type) {
			handleScore(result.type);
			reportedRef.current = result.type;
		}
	}, [analitics.description, analitics.descriptionLength, handleScore]);

	if (!analitics.description) {
		return (
			<InfoCard
				type='danger'
				title='Description not found!'
				message=''
			/>
		);
	}

	if (!descriptionLengthValidation) return null;

	return (
		<InfoCard
			type={descriptionLengthValidation.type}
			title='Description length'
			message={descriptionLengthValidation.message}
		/>
	);
};

type DescriprionReportProps = {
    analitics: {
        description: string,
		descriptionLength: number,
    }
};

export default DescriprionReport;