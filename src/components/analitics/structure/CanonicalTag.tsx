import InfoCard from "@/components/InfoCard";

const CanonicalTag = ({ analitics }: CanonicalTagProps) => (
	Boolean(analitics) ? (
		<InfoCard type='success' title='Canonical tag attached' message='Tag link matches hostname' />
	) : (
		<InfoCard type='danger' title='Canonical tag missing' message='' />
	)
);

type CanonicalTagProps = {
    analitics: string | null
};

export default CanonicalTag;