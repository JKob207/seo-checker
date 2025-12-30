import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { getTitleLengthValidation } from "@/tools/SEOanalitics/seo-rankings";
import { ScoreType, SEOValidationTypes } from "@/types";
import { useEffect, useRef, useState } from "react";

const TitleReport = ({ analitics }: TitleReportProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const [titleLengthValidation, setTitleLengthValidation] =
    useState<SEOValidationTypes | null>(null);

	const reportedRef = useRef<Set<string>>(new Set());

	const reportOnce = (key: string, type: ScoreType) => {
		if (!reportedRef.current.has(key)) {
			handleScore(type);
			reportedRef.current.add(key);
		}
	};

	useEffect(() => {
		if (!analitics.title) {
			reportOnce('title-missing', 'danger');
			return;
		}

		const result = getTitleLengthValidation(analitics.titleLength);
		setTitleLengthValidation(result);
		reportOnce('title-name', 'info');
		reportOnce('title-length', result.type);

		if (analitics.includedTopKeywords.length > 0) {
			reportOnce('title-keywords', 'success');
		} else {
			reportOnce('title-keywords', 'warning');
		}
	}, [
		analitics.title,
		analitics.titleLength,
		analitics.includedTopKeywords,
		handleScore,
	]);

	if (!analitics.title) {
		return <InfoCard type='danger' title='Title not found!' message='' />;
	}

	if (!titleLengthValidation) return null;

	return (
		<>
			<InfoCard type='info' title='Title:' message={analitics.title} />

			<InfoCard
				type={titleLengthValidation.type}
				title='Title length:'
				message={titleLengthValidation.message}
			/>

			{analitics.includedTopKeywords.length > 0 ? (
				<InfoCard
					type='success'
					title='Top keywords included in title:'
					message={analitics.includedTopKeywords.join(', ')}
				/>
			) : (
				<InfoCard
					type='warning'
					title='Top keywords not included in title!'
					message=''
				/>
			)}
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