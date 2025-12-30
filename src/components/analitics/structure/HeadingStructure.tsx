import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { getHeadingsValidation } from "@/tools/SEOanalitics/seo-rankings";
import { headingType } from "@/types";
import { useEffect, useRef, useState } from "react";

const HeadingStructure = ({ analitics }: HeadingStructureProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [headingValidation, setHeadingValidation] = useState<string[]>([]);
	const reportedRef = useRef(false);

	useEffect(() => {
		const result = getHeadingsValidation(analitics);
		setHeadingValidation(result);

		if (result.length > 0 && !reportedRef.current) {
			handleScore('danger');
			reportedRef.current = true;
		}
	}, [analitics, handleScore]);

	return (
		<>
			{headingValidation.map((issue) => (
				<InfoCard
					key={issue}
					type='danger'
					title='Heading issue:'
					message={issue}
				/>
			))}
		</>
	);
};

type HeadingStructureProps = {
    analitics: headingType[]
};

export default HeadingStructure;