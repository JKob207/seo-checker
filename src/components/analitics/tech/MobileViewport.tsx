import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const MobileViewport = ({ analitics }: MobileViewportProps) => {
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
			title='Viewport meta tag is included'
			message=''
		/>
	) : (
		<InfoCard
			type='danger'
			title='Viewport meta tag is not included'
			message='Page might not scale properly for mobile devices!'
		/>
	);
};

type MobileViewportProps = {
    analitics: string | null
};

export default MobileViewport;