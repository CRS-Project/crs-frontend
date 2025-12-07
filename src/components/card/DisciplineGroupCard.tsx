"use client";

import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ConcernDetailModal from "@/app/(dashboard)/concern/[id]/_containers/ConcernDetailModal";
import DeleteConcernModal from "@/app/(dashboard)/concern/[id]/_containers/DeleteConcernModal";
import EditConcernModal from "@/app/(dashboard)/concern/[id]/_containers/EditConcernModal";
import useAuthStore from "@/app/stores/useAuthStore";
import { ROLE } from "@/lib/data";
import type { Concern } from "@/types/concern";

interface DisciplineGroupCardProps {
	concern: Concern;
	packageId: string;
	areaOfConcernId: string;
}

export default function DisciplineGroupCard({
	concern,
	packageId,
	areaOfConcernId,
}: DisciplineGroupCardProps) {
	const router = useRouter();
	const { user } = useAuthStore();
	const [showMenu, setShowMenu] = useState(false);
	const [isOpen, setIsOpen] = useState({
		detail: false,
		edit: false,
		delete: false,
	});
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleDetailClick = () => {
		setShowMenu(false);
		setIsOpen((prev) => ({ ...prev, detail: true }));
	};

	const handleEditClick = () => {
		setShowMenu(false);
		setIsOpen((prev) => ({ ...prev, edit: true }));
	};

	const handleDeleteClick = () => {
		setShowMenu(false);
		setIsOpen((prev) => ({ ...prev, delete: true }));
	};

	return (
		<div className="bg-blue-600 rounded-xl p-6 text-white relative flex justify-between flex-col gap-6">
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="text-[1.5rem] font-bold">
						{concern.user_discipline || "Discipline Not Available"}
					</h3>
					<p className="text-[1rem] text-blue-100">
						{concern.review_focus || "Review Focus Not Available"}
					</p>
				</div>
				{user?.role !== ROLE.REVIEWER && (
					<div ref={ref} className="relative flex-shrink-0">
						<button
							type="button"
							onClick={() => setShowMenu(!showMenu)}
							className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
						>
							<EllipsisVertical className="w-5 h-5 text-white" />
						</button>

						{showMenu && (
							<div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
								<button
									type="button"
									onClick={handleDetailClick}
									className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
								>
									<Eye className="w-[12px] h-[12px]" />
									Detail
								</button>
								<button
									type="button"
									onClick={handleEditClick}
									className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
								>
									<Pencil className="w-[12px] h-[12px]" />
									Edit
								</button>
								<button
									type="button"
									onClick={handleDeleteClick}
									className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
								>
									<Trash className="w-[12px] h-[12px]" />
									Delete
								</button>
							</div>
						)}
					</div>
				)}
			</div>
			<button
				type="button"
				className="w-full bg-white rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer"
				onClick={() => router.push(`/concern/${areaOfConcernId}/${concern.id}`)}
			>
				Check Detail Discipline
			</button>

			{/* Modals */}
			<ConcernDetailModal
				concern={concern}
				isOpen={isOpen.detail}
				onClose={() => setIsOpen((prev) => ({ ...prev, detail: false }))}
			/>
			<EditConcernModal
				concern={concern}
				isOpen={isOpen.edit}
				onClose={() => setIsOpen((prev) => ({ ...prev, edit: false }))}
				packageId={packageId}
			/>
			<DeleteConcernModal
				concern={concern}
				isOpen={isOpen.delete}
				onClose={() => setIsOpen((prev) => ({ ...prev, delete: false }))}
			/>
		</div>
	);
}
