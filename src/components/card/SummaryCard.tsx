import { Card, CardBody, CardHeader } from "@heroui/card";
import type { LucideIcon } from "lucide-react";
import clsxm from "@/lib/clsxm";

const CardVariant = ["primary", "white"] as const;

interface SummaryCardProps {
	title: string;
	value: string;
	variant: (typeof CardVariant)[number];
	icon?: LucideIcon;
}

export default function SummaryCard({
	title,
	value,
	variant = "primary",
	icon: Icon,
}: SummaryCardProps) {
	return (
		<Card
			className={clsxm("w-[280px] px-6 py-4 rounded-lg lg:gap-2", [
				variant === "primary" && ["bg-primary-1000 text-white"],
				variant === "white" && ["bg-white text-primary-1000"],
			])}
		>
			<CardHeader className="flex justify-between">
				<span className="text-base font-semibold">{title}</span>
				{Icon && <Icon size={20} />}
			</CardHeader>
			<CardBody className="text-2xl sm:text-4xl lg:text-5xl font-semibold overflow-visible">
				{value}
			</CardBody>
		</Card>
	);
}
