import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditReplyModal from "@/app/(dashboard)/documents/[id]/[id_document]/_containers/_replyModals/EditReplyModal";
import DeleteCommentModal from "@/app/(dashboard)/documents/[id]/[id_document]/_containers/DeleteCommentModal";
import type { Comment } from "@/types/comment";

interface ReplyCardProps {
	replies: Comment;
	parentComment: Comment;
}

export default function ReplyCard({ replies, parentComment }: ReplyCardProps) {
	const {
		comment = "Lorem ipsum dolor sit amet consectetur. Egestas sit pellentesque varius vestibulum purus enim vulputate posuere ullamcorper. In venenatis risus diam suspendisse pharetra fringilla euismod. Fames elit cursus at praesent viverra dui. Ultrices arcu amet non urna.",
		comment_at = "15.19 • 09 Nov 2025",
		user_comment: {
			name = "John Doe",
			photo_profile = null,
			role = "Contractor",
		} = {},
	} = replies || {};

	const [showMenu, setShowMenu] = useState(false);
	const [isOpen, setIsOpen] = useState({
		edit: false,
		delete: false,
	});

	const handleEditClick = () => {
		setShowMenu(false);
		setIsOpen({ ...isOpen, edit: true });
	};

	const handleDeleteClick = () => {
		setShowMenu(false);
		setIsOpen({ ...isOpen, delete: true });
	};

	return (
		<div className="rounded-lg">
			{/* Header Section */}
			<div className="flex items-center gap-3 w-full justify-between">
				<div className="flex-shrink-0 gap-2 items-center flex">
					{/* Avatar */}
					<div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
						{photo_profile ? (
							<Image
								width={50}
								height={50}
								src={photo_profile}
								alt={`${name} avatar`}
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold bg-gray-400">
								{name
									.split(" ")
									.map((n: string) => n[0])
									.join("")
									.slice(0, 2)}
							</div>
						)}
					</div>

					{/* Author Info and Badges */}
					<div className="flex-1">
						<div className="flex items-center gap-2 flex-wrap">
							<h3 className="text-gray-900 font-semibold text-base">{name}</h3>
							<span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded">
								{role}
							</span>
						</div>
					</div>
				</div>

				{/* Menu Button */}
				<div className="relative flex-shrink-0">
					<button
						type="button"
						onClick={() => setShowMenu(!showMenu)}
						className="p-1 hover:bg-gray-100 rounded transition-colors"
					>
						<EllipsisVertical className="w-5 h-5 text-gray-600" />
					</button>

					{/* Dropdown Menu */}
					{showMenu && (
						<div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
							<button
								type="button"
								onClick={handleEditClick}
								className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
							>
								<Pencil className="w-[12px] h-[12px]" />
								Edit
							</button>
							<button
								type="button"
								onClick={handleDeleteClick}
								className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
							>
								<Trash className="w-[12px] h-[12px]" />
								Delete
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Comment Text */}
			<p className="text-gray-800 text-sm leading-relaxed mb-3 mt-2">
				{comment}
			</p>

			{/* Timestamp */}
			<div className="text-right text-sm text-gray-500">{comment_at}</div>

			{/* Modals */}
			<EditReplyModal
				isOpen={isOpen.edit}
				onClose={() => setIsOpen({ ...isOpen, edit: false })}
				parentComment={parentComment}
				reply={replies}
			/>
			<DeleteCommentModal
				comment={replies}
				isOpen={isOpen.delete}
				onClose={() => setIsOpen({ ...isOpen, delete: false })}
			/>
		</div>
	);
}
