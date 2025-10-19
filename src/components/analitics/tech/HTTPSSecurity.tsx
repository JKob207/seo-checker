import InfoCard from "@/components/InfoCard";

const HTTPSSecurity = ({ analitics }: HTTPSSecurityProps) => (
	Boolean(analitics) ? (
		<InfoCard type='success' title='Page is using safe HTTPS protocol' message='' />
	) : (
		<InfoCard type='danger' title='Page is missing HTTPS protocol' message='' />
	)
);

type HTTPSSecurityProps = {
    analitics: boolean
};

export default HTTPSSecurity;