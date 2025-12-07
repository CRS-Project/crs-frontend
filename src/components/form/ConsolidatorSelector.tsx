"use client";

import Button from "@/components/button/Button";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import type { ConsolidatorUser } from "@/types/consolidator";

interface ConsolidatorSelectorProps {
	existingConsolidators?: ConsolidatorUser[];
	selectedConsolidators: ConsolidatorUser[];
	consolidatorOptions: any;
	selectedUserId: string;
	onAddConsolidator: () => void;
	onRemoveConsolidator: (userId: string) => void;
	onRemoveExistingConsolidator?: (userId: string) => void;
	required?: boolean;
	selectId?: string;
}

export default function ConsolidatorSelector({
	existingConsolidators = [],
	selectedConsolidators,
	consolidatorOptions,
	onAddConsolidator,
	onRemoveConsolidator,
	onRemoveExistingConsolidator,
	required = false,
	selectId = "consolidator_select",
}: ConsolidatorSelectorProps) {
	return (
		<div className="space-y-2">
			<LabelText required={required}>Consolidator</LabelText>
			<div className="flex gap-2">
				<div className="flex-1">
					<SelectInput
						id={selectId}
						label={null}
						placeholder="Add Consolidator"
						options={consolidatorOptions?.user || []}
						isClearable={false}
						isSearchable={true}
					/>
				</div>
				<Button
					type="button"
					variant="blue"
					onClick={onAddConsolidator}
					className="whitespace-nowrap"
				>
					Add
				</Button>
			</div>
			<div className="flex flex-wrap gap-2 mt-2">
				{/* Existing consolidators - can now be removed */}
				{existingConsolidators.map((consolidator) => (
					<div key={consolidator.user_id} className="relative group">
						<ConsolidatorChip
							name={consolidator.name || consolidator.user_id || "Unknown"}
						/>
						<button
							type="button"
							onClick={() =>
								(onRemoveExistingConsolidator || onRemoveConsolidator)(
									consolidator.user_id || "",
								)
							}
							className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
						>
							×
						</button>
					</div>
				))}
				{/* Newly added consolidators - can be removed */}
				{selectedConsolidators.map((consolidator) => (
					<div key={consolidator.user_id} className="relative group">
						<ConsolidatorChip
							name={consolidator.name || consolidator.user_id || "Unknown"}
						/>
						<button
							type="button"
							onClick={() => onRemoveConsolidator(consolidator.user_id || "")}
							className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
