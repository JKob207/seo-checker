'use client';

import { isValidUrl } from "../tools/validators";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const Home = () => {
	const [urlAddress, setUrlAddress] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setError('');
		setUrlAddress(evt.target.value);
	};

	const handleSubmit = (evt: SyntheticEvent<HTMLButtonElement>) => {
		evt.preventDefault();

		const isUrlValid = isValidUrl(urlAddress);

		if(!isUrlValid) setError('URL address is not valid!');

		router.push(`/analyze?url=${urlAddress}`);

		setUrlAddress('');
	};

	return (
		<section className='flex flex-col justify-center items-center mt-5'>
    		<form className='w-1/2'>
				<label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
				<div className='relative'>
					<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
						<Image src='/magnifier.svg' width={18} height={18} alt='maginifier glass' />
					</div>
					<input
						type='search'
						id='search'
						onChange={handleChange}
						pattern='^(https?:\/\/|www\.)[^\s]+$'
						className={`block w-full p-4 ps-10 text-sm text-gray-900 border border-${error ? 'red-500' : 'gray-300'} rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
						placeholder='Search'
						required
					/>
					<button
						onClick={handleSubmit}
						type='submit'
						className='text-white absolute end-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer'
					>
						Search
					</button>
				</div>
				<p className='mt-2 text-sm text-red-600 dark:text-gray-400'>{error}</p>
			</form>
		</section>
	);
};

export default Home;