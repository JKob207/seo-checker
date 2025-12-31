import { STYLE_MAP } from "../constants";
import { alertTypes } from "../types";

const InfoCard = ({ type, title, message }: InfoCardProps) => {
	const styles = STYLE_MAP[type];

	return (
		<div className={`p-4 text-sm rounded-lg ${styles.text} ${styles.bg} overflow-auto`} role='alert'>
			<span className='font-medium'>{title}</span> {message}
		</div>
	);
};

type InfoCardProps = {
    type: alertTypes,
    title: string,
    message: string,
};

export default InfoCard;