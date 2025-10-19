import InfoCard from "@/components/InfoCard";

const MissingAltAttributes = ({ analitics }: MissingAltAttributesProps) => (
	analitics.length === 0 ? (
		<InfoCard type='success' title='No missing image tags with empty alternative text tags found' message='' />
	) : (
		<InfoCard type='warning' title='Broken links found!' message={analitics.join(', ')} />
	)
);

type MissingAltAttributesProps = {
    analitics: string[]
}

export default MissingAltAttributes;