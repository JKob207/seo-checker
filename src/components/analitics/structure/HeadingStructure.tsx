import InfoCard from "@/components/InfoCard";
import { getHeadingsValidation } from "@/tools/SEOanalitics/seo-rankings";
import { headingType } from "@/types";
import { useEffect, useState } from "react";

const HeadingStructure = ({ analitics }: HeadingStructureProps) => {
	const [headingValidation, setHeadingValidation] = useState<string[]>([]);

	useEffect(() => {
		const result = getHeadingsValidation(analitics);

		setHeadingValidation(result);
	}, [analitics]);

	const headingIssues = headingValidation.map((issue) => <InfoCard key={issue} type='danger' title='Heading issue: ' message={issue} />);

	return (
		<>{headingIssues}</>
	);
};

type HeadingStructureProps = {
    analitics: headingType[]
};

export default HeadingStructure;