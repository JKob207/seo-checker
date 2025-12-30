import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { getPageLoadTimeValidation, getPageSizeValidation } from "@/tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "@/types";
import { useEffect, useRef, useState } from "react";

const PageLoadTime = ({ analitics }: PageLoadTimeProps) => {
	const { handleScore } = useAnaliticsScoreContext();

	const [pageLoadTimeValidation, setPageLoadTimeValidation] = useState<SEOValidationTypes | null>(null);
	const [pageSizeValidation, setPageSizeValidation] = useState<SEOValidationTypes | null>(null);

	const reportedRef = useRef<Set<string>>(new Set());

	const reportOnce = (key: string, type: ScoreType) => {
		if (!reportedRef.current.has(key)) {
			handleScore(type);
			reportedRef.current.add(key);
		}
	};

	useEffect(() => {
		const result = getPageLoadTimeValidation(Number(analitics.loadTimeMs));
		setPageLoadTimeValidation(result);
		reportOnce('load-time', result.type);
	}, [analitics.loadTimeMs]);

	useEffect(() => {
		const result = getPageSizeValidation(Number(analitics.loadTimeMs));
		setPageSizeValidation(result);
		reportOnce('page-size', result.type);
	}, [analitics.loadTimeMs]);

	if (!pageLoadTimeValidation || !pageSizeValidation) return null;

	return (
		<>
			<InfoCard
				type={pageLoadTimeValidation.type}
				title='Page load time'
				message={pageLoadTimeValidation.message}
			/>

			<InfoCard
				type={pageSizeValidation.type}
				title='Page size'
				message={pageSizeValidation.message}
			/>
		</>
	);
};

type PageLoadTimeProps = {
    analitics: {
        loadTimeMs: string,
		sizeKb: string,
    }
};

export default PageLoadTime;