import { useAnaliticsScoreContext } from "@/components/AnaliticsContext";
import InfoCard from "@/components/InfoCard";
import { useEffect, useRef } from "react";

const MissingAltAttributes = ({ analitics }: MissingAltAttributesProps) => {
	const { handleScore } = useAnaliticsScoreContext();
	const reportedRef = useRef<null | 'success' | 'warning'>(null);

	useEffect(() => {
		const result = analitics.length === 0 ? 'success' : 'warning';

		if (reportedRef.current !== result) {
			handleScore(result);
			reportedRef.current = result;
		}
	}, [analitics.length, handleScore]);

	return analitics.length === 0 ? (
		<InfoCard
			type='success'
			title='No missing image tags with empty alternative text tags found'
			message=''
		/>
	) : (
		<InfoCard
			type='warning'
			title='Broken links found!'
			message={analitics.join(', ')}
		/>
	);
};


type MissingAltAttributesProps = {
    analitics: string[]
}

export default MissingAltAttributes;