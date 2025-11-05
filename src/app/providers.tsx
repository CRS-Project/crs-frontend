"use client";

import { HeroUIProvider } from "@heroui/system";
import {
	QueryClient,
	QueryClientProvider,
	type QueryOptions,
} from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "@/context/SidebarContext";
import api from "@/service/api";

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
	const { data } = await api.get(`${queryKey?.[0]}`);
	return data;
};
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn,
		},
	},
});

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-center" />
			<HeroUIProvider>
				<SidebarProvider>
					<NuqsAdapter>{children}</NuqsAdapter>
				</SidebarProvider>
			</HeroUIProvider>
		</QueryClientProvider>
	);
}
