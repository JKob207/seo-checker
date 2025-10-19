import { techAnaliticsType } from "@/types";
import HTTPSSecurity from "./HTTPSSecurity";
import MobileViewport from "./MobileViewport";
import PageLoadTime from "./PageLoadTime";
import LinkStats from "./LinkStats";

const TechManager = ({ analitics }: TechManagerProps) => {
	return (
		<section>
			<h3 className='text-center font-bold text-xl p-2 mt-4'>Technical analitics</h3>
			<div className='grid grid-cols-2 gap-2'>
				<PageLoadTime analitics={analitics.pageLoadTime} />
				<LinkStats analitics={analitics.linksStats} />
				<HTTPSSecurity analitics={analitics.httpsSecurity} />
				<MobileViewport analitics={analitics.mobileViewportTag} />
			</div>
		</section>
	);
};

type TechManagerProps = {
    analitics: techAnaliticsType
}

export default TechManager;