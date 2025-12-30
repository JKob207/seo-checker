import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const HTTPSSecurity = ({ analitics }: HTTPSSecurityProps) => {
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
			title='Page is using safe HTTPS protocol'
			message=''
		/>
	) : (
		<InfoCard
			type='danger'
			title='Page is missing HTTPS protocol'
			message=''
		/>
	);
};

type HTTPSSecurityProps = {
    analitics: boolean
};

export default HTTPSSecurity;