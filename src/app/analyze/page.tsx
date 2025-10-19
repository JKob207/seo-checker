'use client';

import AccessibilityManager from "@/components/analitics/accessibilityManager";
import StructureManager from "@/components/analitics/structureManager";
import TechManager from "@/components/analitics/techManager";
import WordsManager from "@/components/analitics/wordsManager";
import { analiticsReportType } from "@/types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Analyze = () => {
	const searchParams = useSearchParams();
	const pageUrl = searchParams.get('url');
	const [analiticsReport, setAnaliticsReport] = useState<analiticsReportType | null>(null);

	useEffect(() => {
		const getSEOReport = async () => {
			try {
				const result = await axios.post('/api/analyze', {
					url: pageUrl
				});
				setAnaliticsReport(result.data);
			} catch (error) {
				console.log(error);
			}

		};

		getSEOReport();
	}, [pageUrl]);

	return  (
		<section>
			<h2>SEO analitics report for: {pageUrl}</h2>
			{
				analiticsReport && (
					<>
						<WordsManager analitics={analiticsReport.wordsAnalitics} />
						<StructureManager analitics={analiticsReport.structureAnalitics} />
						<TechManager analitics={analiticsReport.techAnalitics} />
						<AccessibilityManager analitics={analiticsReport.accessibilityAnalitics} />
					</>
				)
			}
		</section>

	);
};

export default Analyze;