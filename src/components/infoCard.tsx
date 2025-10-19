import { alertTypes } from "@/types";

const InfoCard = ({ type, title, message }: InfoCardProps) => {
	  const STYLE_MAP = {
		info: {
			text: 'text-blue-800 dark:text-blue-400',
			bg: 'bg-blue-50 dark:bg-gray-800',
		},
		warning: {
			text: 'text-yellow-800 dark:text-yellow-400',
			bg: 'bg-yellow-50 dark:bg-gray-800',
		},
		danger: {
			text: 'text-red-800 dark:text-red-400',
			bg: 'bg-red-100 dark:bg-gray-800',
		},
		success: {
			text: 'text-green-800 dark:text-green-400',
			bg: 'bg-green-100 dark:bg-gray-800',
		}
	};

	const styles = STYLE_MAP[type];

	return (
		<div className={`p-4 text-sm rounded-lg ${styles.text} ${styles.bg}`} role='alert'>
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