import { ScoreType } from "../../types";
import { useAnaliticsScoreContext } from "../AnaliticsContext";
import ScoreCard from "../ScoreCard";

const Summary = () => {
	const { score } = useAnaliticsScoreContext();

	const scoreArray = (Object.keys(score) as ScoreType[]).map((type) => (
		<ScoreCard key={type} type={type} score={score[type]} />
	));

	return (
		<div className='flex justify-around'>
			{scoreArray}
		</div>
	);
};

export default Summary;