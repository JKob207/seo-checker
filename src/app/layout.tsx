import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SEO Checker app",
	description: "Check you website SEO statistics!",
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${roboto.variable} antialiased`}
			>
				<section className='logo flex flex-col justify-center items-center'>
          			<h1 className='mt-5 text-4xl text-center font-medium text-neutral-900'>SEO Checker</h1>
					<p className='mt-3 text-pretty text-base text-neutral-600'>Check SEO quality of your website</p>
        		</section>

				<main>
					{children}
				</main>
			</body>
		</html>
	);
}
