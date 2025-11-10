interface ConsolidatorChipProps {
	name: string;
}

export default function ConsolidatorChip({ name }: ConsolidatorChipProps) {
	return (
		<div className="px-[24px] py-[4px] bg-primary-500 text-white rounded-md w-fit text-sm">
			{name}
		</div>
	);
}
