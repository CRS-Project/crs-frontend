import Image from "next/image";

export default function NotFound() {
	return (
		<div className="h-screen w-full bg-[url('/not-found.png')] bg-center bg-cover relative">
			<div className="absolute flex w-full h-full bg-black/80 z-10 items-center justify-center">
				<div className="max-w-150 flex flex-col items-center text-center gap-3 p-4">
					<h1 className="text-white text-8xl md:text-9xl font-bold mb-5">
						404
					</h1>
					<span className="text-white text-3xl md:text-4xl font-bold">
						Something went wrong
					</span>
					<span className="text-white text-xl md:text-2xl">
						Please wait a moment, or you can reach out to the admin if needed.
					</span>
				</div>
			</div>
		</div>
	);
}
