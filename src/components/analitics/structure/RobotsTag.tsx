import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const RobotsTag = ({ analitics }: RobotsTagProps) => {
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
			title='Robots tag attached'
			message='Site appears in Google Search'
		/>
	) : (
		<InfoCard
			type='danger'
			title='Robots tag missing'
			message='Page will not be indexed in Google Search'
		/>
	);
};

type RobotsTagProps = {
    analitics: string | null
};

export default RobotsTag;