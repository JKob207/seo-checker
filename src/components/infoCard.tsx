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
	};

	const styles = STYLE_MAP[type];

	return (
		<div className={`w-1/2 p-4 mb-4 text-sm rounded-lg ${styles.text} ${styles.bg}`} role='alert'>
			<span className='font-medium'>{title}</span> {message}
		</div>
	);
};

type InfoCardProps = {
    type: 'info' | 'warning' | 'danger',
    title: string,
    message: string,
};

export default InfoCard;