"use client";

import { FormProvider, useForm } from "react-hook-form";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
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
				<Input
					id="discipline_initial"
					label="Initial"
					placeholder="Initial"
					readOnly
				/>
				<TextArea
					id="review_focus"
					label="Review Focus"
					placeholder="Review Focus"
					readOnly
					rows={6}
				/>

				<div className="space-y-2">
					<LabelText>Consolidator</LabelText>
					<div className="flex flex-wrap gap-2">
						{concern?.consolidators && concern.consolidators.length > 0 ? (
							concern.consolidators.map((consolidator) => (
								<ConsolidatorChip
									key={consolidator.id}
									name={consolidator.name || "Unknown"}
								/>
							))
						) : (
							<p className="text-sm text-gray-500">No consolidators assigned</p>
						)}
					</div>
				</div>
			</div>
		</FormProvider>
	);
}
