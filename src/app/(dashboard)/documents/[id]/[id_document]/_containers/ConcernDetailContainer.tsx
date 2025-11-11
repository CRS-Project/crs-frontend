"use client";

import { FormProvider, useForm } from "react-hook-form";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import type { Concern } from "@/types/concern";

interface ConcernDetailModalProps {
	concern: Concern | undefined;
}

const defaultConcernValue: Concern = {
	id: "1",
	area_of_concern_id: "Marine-1219-2132",
	description: "01. Alignment of project execution strategy across Dual FEED",
	package: "FPSO ITS",
	consolidators: [],
};

export default function ConcernDetailModal({
	concern,
}: ConcernDetailModalProps) {
	const methods = useForm<Concern>({
		mode: "onTouched",
		defaultValues: concern || defaultConcernValue,
	});

	const consolidators =
		concern?.consolidators || defaultConcernValue.consolidators;

	return (
		<FormProvider {...methods}>
			<div className="my-[10px] space-y-2">
				<Input
					id="package"
					label="Package"
					placeholder="Input Discipline"
					readOnly
				/>
				<Input
					id="area_of_concern_id"
					label="Area of Concern ID"
					placeholder="Input Area of Concern ID"
					readOnly
				/>
				<Input
					id="description"
					label="Description"
					placeholder="Input Description"
					readOnly
				/>
				<LabelText>Consolidators</LabelText>
				<div className="flex gap-[9px] justify-start items-center w-full">
					{consolidators.map((consolidator) => (
						<ConsolidatorChip key={consolidator.id} name={consolidator.name} />
					))}
				</div>
			</div>
		</FormProvider>
	);
}
