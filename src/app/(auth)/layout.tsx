import type { Metadata } from "next";
import Image from "next/image";

interface AuthenticationLayoutProps {
	children: React.ReactNode;
}

const siteConfig = {
	title: "CRS - Comment Resolution Sheet",
	description: "Comment Resolution Sheet Apps - Inpex Abadi OLNG Development",
	url: process.env.SITE_URL || "https://example.com",
};

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.title}`,
	},
	description: siteConfig.description,
	twitter: {
		card: "summary_large_image",
	},
	robots: { index: true, follow: true },
	icons: {
		icon: "/icon.png",
	},
	authors: [
		{
			name: siteConfig.title,
			url: siteConfig.url,
		},
	],
};

export default function AuthenticationLayout({
	children,
}: AuthenticationLayoutProps) {
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
