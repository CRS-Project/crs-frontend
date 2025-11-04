import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "700", "800"],
});

export default function NotFound() {
	return (
		<div className="h-screen w-full bg-[url('/Auth/rektorat.png')] bg-center bg-cover relative">
			<div className="absolute flex w-full h-full bg-black/80 z-10 items-center justify-center">
				<div
					className={`max-w-[810px] flex flex-col items-center text-center gap-3 p-4 ${montserrat.className}`}
				>
					<h1 className="text-white text-8xl md:text-[214px] font-extrabold mb-5">
						404
					</h1>
					<span className="text-white text-3xl md:text-[60px] font-extrabold">
						Something went wrong
					</span>
					<span className="text-white text-xl md:text-[36px] font-medium">
						Please wait a moment, or you can reach out to the admin if needed.
					</span>
				</div>
			</div>
		</div>
	);
}
