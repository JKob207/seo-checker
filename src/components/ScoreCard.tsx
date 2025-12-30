import { STYLE_MAP } from "@/constants";
import { alertTypes } from "@/types";

const ScoreCard = ({ type, score }: ScoreCardProps) => {
	const styles = STYLE_MAP[type];

	return (
		<div className='flex flex-col items-center'>
			<div className={`flex justify-center items-center rounded-full ${styles.bg} border-4 ${styles.border} p-4 w-12 h-12`}>{score}</div>
			<div className={`${styles.text} font-bold`}>{type[0].toUpperCase() + type.slice(1)}</div>
		</div>
	);
};

type ScoreCardProps = {
    type: alertTypes,
    score: number
};

export default ScoreCard;