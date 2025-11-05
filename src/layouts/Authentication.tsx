"use client";

import Image from "next/image";

interface AuthenticationProps {
	children: React.ReactNode;
}

export default function Authentication({ children }: AuthenticationProps) {
	return (
		<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
			<div className="relative hidden lg:block">
				<div
					className="h-full w-full bg-cover bg-center"
					style={{
						backgroundImage: "url('/Auth/rektorat.png')",
					}}
				>
					<div className="flex h-full items-center justify-center bg-black/80">
						<div className="text-center text-white">
							<div className="w-40 h-40 bg-white flex justify-center items-center rounded-2xl border-4 border-slate-400">
								<Image
									src={"/CRS-Logo-V1.png"}
									alt={"Logo CRS"}
									width={200}
									height={100}
								></Image>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center p-8">
				<div className="w-full max-w-md">{children}</div>
			</div>
		</div>
	);
}
