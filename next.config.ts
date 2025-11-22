import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.maselacrsapps.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
