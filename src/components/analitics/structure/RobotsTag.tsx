import InfoCard from "@/components/InfoCard";

const RobotsTag = ({ analitics }: RobotsTagProps) => (
	Boolean(analitics) ? (
		<InfoCard type='success' title='Robots tag attached' message='Site appears in Google Search' />
	) : (
		<InfoCard type='danger' title='Robots tag missing' message='Page will not be indexed in Google Search' />
	)
);

type RobotsTagProps = {
    analitics: string | null
};

export default RobotsTag;