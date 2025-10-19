import InfoCard from "@/components/InfoCard";

const LangTag = ({ analitics }: LangTagProps) => (
	Boolean(analitics) ? (
		<InfoCard type='success' title='Lang attribute available' message={`Site language: ${analitics}`} />
	) : (
		<InfoCard type='danger' title='Lang attribute available missing' message='' />
	)
);;

type LangTagProps = {
    analitics: string | null
};

export default LangTag;