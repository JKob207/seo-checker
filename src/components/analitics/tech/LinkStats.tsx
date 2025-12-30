import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { getBrokenLinksValidation, getExternalLinksValidation, getInternalLinksValidation } from "@/tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "@/types";
import { useEffect, useRef, useState } from "react";

const LinkStats = ({ analitics }: LinkStatsProps) => {
	const { handleScore } = useAnaliticsScoreContext();

	const [internalLinksValidation, setInternalLinksValidation] = useState<SEOValidationTypes | null>(null);
	const [externalLinksValidation, setExternalLinksValidation] = useState<SEOValidationTypes | null>(null);
	const [brokenLinksValidation, setBrokenLinksValidation] = useState<SEOValidationTypes | null>(null);

	const reportedRef = useRef<Set<string>>(new Set());

	const reportOnce = (key: string, type: ScoreType) => {
		if (!reportedRef.current.has(key)) {
			handleScore(type);
			reportedRef.current.add(key);
		}
	};

	useEffect(() => {
		const result = getInternalLinksValidation(
			analitics.internal.length,
			analitics.total
		);

		setInternalLinksValidation(result);
		reportOnce('internal', result.type);
	}, [analitics.internal.length, analitics.total]);

	useEffect(() => {
		const result = getExternalLinksValidation(
			analitics.external.length,
			analitics.total
		);

		setExternalLinksValidation(result);
		reportOnce('external', result.type);
	}, [analitics.external.length, analitics.total]);

	useEffect(() => {
		if (!analitics.brokenCandidates.length) {
			reportOnce('broken-none', 'success');
			return;
		}

		const result = getBrokenLinksValidation(
			analitics.brokenCandidates.length
		);

		setBrokenLinksValidation(result);
		reportOnce('broken', result.type);
	}, [analitics.brokenCandidates.length]);

	if (!internalLinksValidation || !externalLinksValidation) return null;

	return (
		<>
			<InfoCard
				type={internalLinksValidation.type}
				title='Internal links'
				message={internalLinksValidation.message}
			/>

			<InfoCard
				type={externalLinksValidation.type}
				title='External links'
				message={externalLinksValidation.message}
			/>

			{analitics.brokenCandidates.length === 0 ? (
				<InfoCard
					type='success'
					title='No broken links found'
					message=''
				/>
			) : (
				<InfoCard
					type='warning'
					title='Broken links found!'
					message={analitics.brokenCandidates.join(', ')}
				/>
			)}

			{brokenLinksValidation && (
				<InfoCard
					type={brokenLinksValidation.type}
					title='Broken links'
					message={brokenLinksValidation.message}
				/>
			)}
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