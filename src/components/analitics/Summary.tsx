import { useAnaliticsScoreContext } from "../AnaliticsContext";

const Summary = () => {
	const { score } = useAnaliticsScoreContext();
	return <div>Test</div>;
};

export default Summary;