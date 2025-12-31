import { accessibilityAnaliticsType } from "../../../types";
import MissingAltAttributes from "./MissingAltAttributes";

const AccessibilityManager = ({ analitics }: AccessibilityManagerProps) => {
	return (
		<section>
			<h3 className='text-center font-bold text-xl p-2 mt-4'>Accessibility analitics</h3>
			<div className='grid grid-cols-2 gap-2'>
				<MissingAltAttributes analitics={analitics.missingAltAttr} />
			</div>
		</section>
	);
};

type AccessibilityManagerProps = {
    analitics: accessibilityAnaliticsType
}

export default AccessibilityManager;