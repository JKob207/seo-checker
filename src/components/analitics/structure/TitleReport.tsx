import InfoCard from "@/components/InfoCard";
import { getTitleLengthValidation } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const TitleReport = ({ analitics }: TitleReportProps) => {
	const [titleLengthValidation, setTitleLengthValidation] = useState<SEOValidationTypes | null>(null);

	useEffect(() => {
		const result = getTitleLengthValidation(analitics.titleLength);

		setTitleLengthValidation(result);
	}, [analitics.titleLength]);

	if(!titleLengthValidation) return null;

	if(!analitics.title) return <InfoCard type='danger' title='Title not found!' message='' />;

	return (
		<>
			<InfoCard type='info' title='Title: ' message={analitics.title} />
			<InfoCard type={titleLengthValidation.type} title='Title length: ' message={titleLengthValidation.message} />
			{
				analitics.includedTopKeywords.length > 0 ? (
					<InfoCard type='success' title='Top keywords included in title: ' message={analitics.includedTopKeywords.join(', ')} />
				) : (
					<InfoCard type='warning' title='Top keywords not included in title!' message='' />
				)
			}
		</>
	);
};

type TitleReportProps = {
    analitics: {
        includedTopKeywords: string[],
		title: string,
		titleLength: number,
    }
};

export default TitleReport;