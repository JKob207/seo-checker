import InfoCard from "@/components/InfoCard";
import { getPageLoadTimeValidation, getPageSizeValidation } from "@/tools/SEOanalitics/seo-rankings";
import { SEOValidationTypes } from "@/types";
import { useEffect, useState } from "react";

const PageLoadTime = ({ analitics }: PageLoadTimeProps) => {
	const [pageLoadTimeValidation, setPageLoadTimeValidation] = useState<SEOValidationTypes | null>(null);
	const [pageSizeValidation, setPageSizeValidation] = useState<SEOValidationTypes | null>(null);

	useEffect(() => {
		const result = getPageLoadTimeValidation(Number(analitics.loadTimeMs));
		setPageLoadTimeValidation(result);
	}, [analitics.loadTimeMs]);

	useEffect(() => {
		const result = getPageSizeValidation(Number(analitics.loadTimeMs));
		setPageSizeValidation(result);
	}, [analitics.loadTimeMs]);

	if(!pageLoadTimeValidation || !pageSizeValidation) return null;

	return (
		<>
			<InfoCard type={pageLoadTimeValidation.type} title='Page load time: ' message={pageLoadTimeValidation.message} />
			<InfoCard type={pageSizeValidation.type} title='Page size: ' message={pageSizeValidation.message} />
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