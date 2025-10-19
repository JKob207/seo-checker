import InfoCard from "./InfoCard";

const ErrorAlert = ({ errorTitle, errorDescription, onRetry }: ErrorAlertProps) => (
	<div className='flex flex-col items-center w-full p-4'>
		<InfoCard type='danger' title={errorTitle} message={errorDescription} />
		<button
			onClick={onRetry}
			type='submit'
			className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'
		>
			Retry
		</button>
	</div>
);

type ErrorAlertProps = {
    errorTitle: string,
    errorDescription: string,
	onRetry: () => void,
}

export default ErrorAlert;