import { structureAnaliticsType } from "@/types";
import HeadingStructure from "./HeadingStructure";
import CanonicalTag from "./CanonicalTag";
import RobotsTag from "./RobotsTag";
import LangTag from "./LangTag";
import TitleReport from "./TitleReport";
import DescriprionReport from "./DescriptionReport";

const StructureManager = ({ analitics }: StructureManagerProps) => {
	return (
		<section>
			<h3 className='text-center font-bold text-xl p-2 mt-4'>Structure analitics</h3>
			<div className='grid grid-cols-2 gap-2'>
				<TitleReport analitics={analitics.titleReport} />
				<DescriprionReport analitics={analitics.descriptionReport} />
				<HeadingStructure analitics={analitics.headingsStructure} />
				<CanonicalTag analitics={analitics.canonicalTag} />
				<RobotsTag analitics={analitics.robotsTag} />
				<LangTag analitics={analitics.langTag} />
			</div>
		</section>
	);
};

type StructureManagerProps = {
    analitics: structureAnaliticsType
}

export default StructureManager;