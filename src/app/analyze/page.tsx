'use client';

import AccessibilityManager from "@components/analitics/accessibility/AccessibilityManager";
import StructureManager from "@components/analitics/structure/StructureManager";
import Summary from "@components/analitics/Summary";
import TechManager from "@components/analitics/tech/TechManager";
import WordsManager from "@components/analitics/words/WordsManager";
import { AnaliticsProvider } from "@components/AnaliticsContext";
import ErrorAlert from "@components/ErrorAlert";
import Loading from "@components/Loading";
import { analiticsReportType } from "../../types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Analyze = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pageUrl = searchParams.get('url');
	const [analiticsReport, setAnaliticsReport] = useState<analiticsReportType | null>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getSEOReport = async () => {
			try {
				setIsLoading(true);
				const result = await axios.post('/api/analyze', {
					url: pageUrl
				});
				if (result.status === 200) {
					setAnaliticsReport(result.data);
					setIsLoading(false);
				} else {
					throw Error('Couldn\'t fetch the SEO raport');
				}
			} catch (error) {
				setIsLoading(false);
				setError((error as Error).message);
			}

		};

		getSEOReport();
	}, [pageUrl]);


	const handleRetry = () => {
		setError('');
		router.refresh();
	};

	return  (
		<section>
			<h2>SEO analitics report for: {pageUrl}</h2>
			{
				error && (
					<ErrorAlert errorTitle='SEO report fails!' errorDescription={error} onRetry={handleRetry} />
				)
			}
			{
				isLoading && <Loading />
			}
			{
				analiticsReport && (
					<div className='py-4'>
						<AnaliticsProvider>
							<Summary />
							<StructureManager analitics={analiticsReport.structureAnalitics} />
							<WordsManager analitics={analiticsReport.wordsAnalitics} />
							<TechManager analitics={analiticsReport.techAnalitics} />
							<AccessibilityManager analitics={analiticsReport.accessibilityAnalitics} />
						</AnaliticsProvider>
					</div>
				)
			}
		</section>

	);
};

export default Analyze;