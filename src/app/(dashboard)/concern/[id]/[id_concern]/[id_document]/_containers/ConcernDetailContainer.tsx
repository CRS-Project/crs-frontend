"use client";

import { File } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import { formatDateForInput } from "@/lib/utils";
import type { AreaOfConcern } from "@/types/concern";

interface ConcernDetailModalProps {
	concern: AreaOfConcern | undefined;
}

export default function ConcernDetailModal({
	concern,
}: ConcernDetailModalProps) {
	const formattedConcern = concern
		? {
				...concern,
				document: concern.document
					? {
							...concern.document,
							due_date: formatDateForInput(concern.document.due_date),
						}
					: concern.document,
			}
		: concern;

	const methods = useForm<AreaOfConcern>({
		mode: "onTouched",
		defaultValues: formattedConcern,
	});

	const { watch } = methods;
	const currentDocumentUrl = watch("document.document_url");
	const consolidators = concern?.consolidators || [];

	return (
		<FormProvider {...methods}>
			<div className="my-[10px] space-y-2">
				<div className="space-y-2">
					<LabelText>Consolidators</LabelText>
					<div className="flex gap-[9px] justify-start items-center w-full flex-wrap">
						{consolidators.map((consolidator) => (
							<ConsolidatorChip
								key={consolidator.id}
								name={consolidator.name}
							/>
						))}
					</div>
				</div>
				<Input
					id="document.company_document_number"
					label="Company Document Number"
					placeholder="Input Company Document Number"
					readOnly
				/>
				<Input
					id="document.document_title"
					label="Document Title"
					placeholder="Input Document Title"
					readOnly
				/>
				<Input
					id="document.document_serial_number"
					label="Document Serial Number"
					placeholder="Input Document Serial Number"
					readOnly
				/>
				{currentDocumentUrl && (
					<div className="space-y-2">
						<h4 className="text-sm font-semibold text-gray-900">
							Document URL
						</h4>
						<Link
							href={`https://${currentDocumentUrl}`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
						>
							<File size={16} />
							<span>View Document</span>
						</Link>
					</div>
				)}
				<Input
					id="document.document_type"
					label="Document Type"
					placeholder="Input Document Type"
					readOnly
				/>
				<Input
					id="document.document_category"
					label="Document Category"
					placeholder="Input Document Category"
					readOnly
				/>
				<Input
					id="document.contractor_document_number"
					label="Contractor Document Number"
					placeholder="Input Contractor Document Number"
					readOnly
				/>
				<DateInput
					id="document.due_date"
					label="Due Date"
					placeholder="Input Due Date"
					readOnly
				/>
				<Input
					id="document.ctr_number"
					label="CTR Number"
					placeholder="Input CTR Number"
					readOnly
				/>
				<Input id="document.wbs" label="WBS" placeholder="Input WBS" readOnly />
				<Input
					id="document.discipline"
					label="Discipline"
					placeholder="Input Discipline"
					readOnly
				/>
				<Input
					id="document.sub_discipline"
					label="SubDiscipline"
					placeholder="Input SubDiscipline"
					readOnly
				/>
				<Input
					id="document.status"
					label="Status Document"
					placeholder="Input Status Document"
					readOnly
				/>
			</div>
		</FormProvider>
	);
}
