"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import type { Concern } from "@/types/concern";

interface ConcernDetailContainerProps {
	concern: Concern | undefined;
}

const defaultConcernValue: Concern = {
	id: "1",
	user_discipline: "Marine Engineering",
	review_focus:
		"Review and analysis of project execution strategy alignment across dual FEED phases, ensuring consistency and coordination.",
	package: "FPSO ITS",
};

export default function ConcernDetailContainer({
	concern,
}: ConcernDetailContainerProps) {
	const methods = useForm<Concern>({
		mode: "onTouched",
		defaultValues: concern || defaultConcernValue,
	});

	return (
		<FormProvider {...methods}>
			<div className="my-[10px] space-y-4">
				<Input
					id="user_discipline"
					label="Discipline"
					placeholder="Discipline"
					readOnly
				/>
				<TextArea
					id="review_focus"
					label="Review Focus"
					placeholder="Review Focus"
					readOnly
					rows={6}
				/>
			</div>
		</FormProvider>
	);
}
