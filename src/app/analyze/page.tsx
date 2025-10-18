'use client';

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Analyze = () => {
	const searchParams = useSearchParams();
	const pageUrl = searchParams.get('url');

	useEffect(() => {
		const getSEOReport = async () => {
			try {
				const result = await axios.post('/api/analyze', {
					url: pageUrl
				});
				console.log(result);
			} catch (error) {
				console.log(error);
			}

		};

		getSEOReport();
	}, [pageUrl]);

	return  (
		<div>Analyze</div>
	);
};

export default Analyze;