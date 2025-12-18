"use client";

import { EllipsisVertical, Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AreaOfConcernDetailModal from "@/app/(dashboard)/concern/[id]/[id_concern]/_containers/AreaOfConcernDetailModal";
import DeleteAreaOfConcernModal from "@/app/(dashboard)/concern/[id]/[id_concern]/_containers/DeleteAreaOfConcernModal";
import EditAreaOfConcernModal from "@/app/(dashboard)/concern/[id]/[id_concern]/_containers/EditAreaOfConcernModal";
import useAuthStore from "@/app/stores/useAuthStore";
import { ROLE } from "@/lib/data";
import type { AreaOfConcern } from "@/types/concern";

interface AreaOfConcernCardProps {
	concern: AreaOfConcern;
	linkHref?: string;
	packageId: string;
}

export default function AreaOfConcernCard({
	concern,
	linkHref,
	packageId,
}: AreaOfConcernCardProps) {
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
		setIsOpen({ ...isOpen, detail: true });
	};

	const handleEditClick = () => {
		setShowMenu(false);
		setIsOpen({ ...isOpen, edit: true });
	};

	const handleDeleteClick = () => {
		setShowMenu(false);
		setIsOpen({ ...isOpen, delete: true });
	};

	return (
		<div className="px-6 py-4 border rounded-lg bg-blue-600 text-white flex gap-[24px] flex-col">
			<div className="flex justify-between items-start">
				<div>
					<p className="font-semibold text-[20px]">
						{concern.document.company_document_number}
					</p>
					<h1 className="font-bold text-[32px]">
						{concern.document.document_title}
					</h1>
				</div>
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
							{user?.role === ROLE.SUPERADMIN && (
								<>
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
								</>
							)}
						</div>
					)}
				</div>
			</div>
			<Link
				href={linkHref || "#"}
				className="w-full bg-white rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out"
			>
				Check Document
			</Link>

			{/* Modals */}
			<AreaOfConcernDetailModal
				concern={concern}
				isOpen={isOpen.detail}
				onClose={() => setIsOpen({ ...isOpen, detail: false })}
			/>
			<EditAreaOfConcernModal
				concern={concern}
				isOpen={isOpen.edit}
				onClose={() => setIsOpen({ ...isOpen, edit: false })}
				packageId={packageId}
			/>
			<DeleteAreaOfConcernModal
				concern={concern}
				isOpen={isOpen.delete}
				onClose={() => setIsOpen({ ...isOpen, delete: false })}
			/>
		</div>
	);
}
