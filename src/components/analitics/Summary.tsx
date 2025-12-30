import { useAnaliticsScoreContext } from "../AnaliticsContext";

const Summary = () => {
	const { score } = useAnaliticsScoreContext();
	console.log(score);
	return <div>Test</div>;
};

export default Summary;