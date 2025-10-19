import { wordsAnaliticsType } from "@/types";
import ContentDiversity from "./ContentDiversity";
import FleschScore from "./FleschScore";
import TopKeywords from "./TopKeywords";
import TopKeywordsDensity from "./TopKeywordsDensity";

const WordsManager = ({ analitics }: WordsManagerProps) => {
	return (
		<div>
			<h3 className='text-center font-bold text-xl p-2'>Words analitics</h3>
			<div className='grid grid-cols-2 gap-2'>
				<ContentDiversity analitics={analitics.contentDiversity} />
				<FleschScore analitics={analitics.fleschScore} />
				<TopKeywords analitics={analitics.topKeywords} />
				<TopKeywordsDensity analitics={analitics.topKeywordsDensity} />
			</div>
		</div>
	);
};

type WordsManagerProps = {
    analitics: wordsAnaliticsType
}

export default WordsManager;