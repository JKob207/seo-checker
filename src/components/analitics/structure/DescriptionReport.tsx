import InfoCard from "@/components/InfoCard";
import { getDescriptionLengthValidation } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const DescriprionReport = ({ analitics }: DescriprionReportProps) => {
	const [descriptionLengthValidation, setDescriptionLengthValidation] = useState<SEOValidationTypes | null>(null);

	useEffect(() => {
		const result = getDescriptionLengthValidation(analitics.descriptionLength);

		setDescriptionLengthValidation(result);
	}, [analitics.descriptionLength]);

	if(!descriptionLengthValidation) return null;

	if(!analitics.description) return <InfoCard type='danger' title='Description not found!' message='' />;
};

type DescriprionReportProps = {
    analitics: {
        description: string,
		descriptionLength: number,
    }
};

export default DescriprionReport;