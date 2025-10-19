import InfoCard from "@/components/InfoCard";
import { getBrokenLinksValidation, getExternalLinksValidation, getInternalLinksValidation } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const LinkStats = ({ analitics }: LinkStatsProps) => {
	const [internalLinksValidation, setInternalLinksValidation] = useState<SEOValidationTypes | null>();
	const [externalLinksValidation, setExternalLinksValidation] = useState<SEOValidationTypes | null>();
	const [brokenLinksValidation, setBrokenLinksValidation] = useState<SEOValidationTypes | null>();

	useEffect(() => {
		const result = getInternalLinksValidation(analitics.internal.length, analitics.total);
		setInternalLinksValidation(result);
	}, [analitics.internal.length, analitics.total]);

	useEffect(() => {
		const result = getExternalLinksValidation(analitics.external.length, analitics.total);
		setExternalLinksValidation(result);
	}, [analitics.external.length, analitics.total]);

	useEffect(() => {
		if(!analitics.brokenCandidates.length) return;

		const result = getBrokenLinksValidation(analitics.brokenCandidates.length);
		setBrokenLinksValidation(result);
	}, [analitics.brokenCandidates.length, analitics.total]);

	if(!internalLinksValidation || !externalLinksValidation) return null;

	return (
		<>
        	<InfoCard type={internalLinksValidation.type} title='Internal links' message={internalLinksValidation.message} />
			<InfoCard type={externalLinksValidation.type} title='External links' message={externalLinksValidation.message} />
			{
				analitics.brokenCandidates.length === 0 ? (
					<InfoCard type='success' title='No broken links found' message='' />
				) : (
					<InfoCard type='warning' title='Broken links found!' message={analitics.brokenCandidates.join(', ')} />
				)
			}
			{
				brokenLinksValidation && <InfoCard type={brokenLinksValidation.type} title='Broken links: ' message={brokenLinksValidation.message} />
			}
		</>
	);


};

type LinkStatsProps = {
    analitics: {
        internal: string[],
		external: string[],
		brokenCandidates: string[],
		total: number,
    }
}

export default LinkStats;