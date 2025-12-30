import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const CanonicalTag = ({ analitics }: CanonicalTagProps) => {
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
			title='Canonical tag attached'
			message='Tag link matches hostname'
		/>
	) : (
		<InfoCard
			type='danger'
			title='Canonical tag missing'
			message=''
		/>
	);
};

type CanonicalTagProps = {
    analitics: string | null
};

export default CanonicalTag;