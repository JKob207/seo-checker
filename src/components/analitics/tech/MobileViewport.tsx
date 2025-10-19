import InfoCard from "@/components/InfoCard";

const MobileViewport = ({ analitics }: MobileViewportProps) => (
	Boolean(analitics) ? (
		<InfoCard type='success' title='Viewport meta tag is included' message='' />
	) : (
		<InfoCard type='danger' title='Viewport meta tag is not included' message='Page might not scale properly for mobile devices!' />
	)
);

type MobileViewportProps = {
    analitics: string | null
};

export default MobileViewport;