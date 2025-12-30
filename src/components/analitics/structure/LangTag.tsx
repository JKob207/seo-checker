import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const LangTag = ({ analitics }: LangTagProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const reportedRef = useRef<null | 'success' | 'danger'>(null);

	useEffect(() => {
		const result = analitics ? 'success' : 'danger';

		if (reportedRef.current !== result) {
			handleScore(result);
			reportedRef.current = result;
		}
	}, [analitics, handleScore]);

	return analitics ? (
		<InfoCard
			type='success'
			title='Lang attribute available'
			message={`Site language: ${analitics}`}
		/>
	) : (
		<InfoCard
			type='danger'
			title='Lang attribute missing'
			message=''
		/>
	);
};

type LangTagProps = {
    analitics: string | null
};

export default LangTag;