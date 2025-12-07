import {
	EllipsisVertical,
	Eye,
	File,
	Pencil,
	Reply,
	Trash,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CommentDetailModal from "@/app/(dashboard)/concern/[id]/[id_concern]/[id_document]/_containers/_commentModals/CommentDetailModal";
import EditCommentModal from "@/app/(dashboard)/concern/[id]/[id_concern]/[id_document]/_containers/_commentModals/EditCommentModal";
import CreateReplyModal from "@/app/(dashboard)/concern/[id]/[id_concern]/[id_document]/_containers/_replyModals/CreateReplyModal";
import DeleteCommentModal from "@/app/(dashboard)/concern/[id]/[id_concern]/[id_document]/_containers/DeleteCommentModal";
import UpdateStatusModal from "@/app/(dashboard)/concern/[id]/[id_concern]/[id_document]/_containers/UpdateStatusModal";
import useAuthStore from "@/app/stores/useAuthStore";
import { COMMENT_STATUS, ROLE } from "@/lib/data";
import { trimText } from "@/lib/utils";
import type { Comment } from "@/types/comment";
import Button from "../button/Button";
import LightboxModal from "../LightboxModal";
import ButtonLink from "../links/ButtonLink";
import ReplyCard from "./ReplyCard";

interface CommentCardProps {
	comments: Comment | null;
	isPreview?: boolean;
}
export default function CommentCard({
	comments,
	isPreview = false,
}: CommentCardProps) {
	const {
		comment_replies = [],
		user_comment: {
			name = "John Doe",
			photo_profile = null,
			role = "string",
		} = {},
	} = comments || {};

	const { user } = useAuthStore();
	const [showMenu, setShowMenu] = useState(false);
	const [isCloseComment, setIsCloseComment] = useState(false);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const [isOpen, setIsOpen] = useState({
		detail: false,
		edit: false,
		delete: false,
		reply: false,
		updateStatus: false,
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

	if (!comments) return null;

	const handleDetailClick = () => {
		setIsOpen({ ...isOpen, detail: true });
		setShowMenu(false);
	};

	const handleEditClick = () => {
		setIsOpen({ ...isOpen, edit: true });
		setShowMenu(false);
	};

	const handleDeleteClick = () => {
		setIsOpen({ ...isOpen, delete: true });
		setShowMenu(false);
	};

	const handleReplyClick = () => {
		setIsOpen({ ...isOpen, reply: true });
		setShowMenu(false);
	};

	const handleChangeStatusClick = () => {
		setIsOpen({ ...isOpen, updateStatus: true });
		setShowMenu(false);
	};

	const handleCloseCommentClick = () => {
		setIsCloseComment(true);
		setIsOpen({ ...isOpen, reply: true });
		setShowMenu(false);
	};

	return (
		<div className="rounded-lg w-full">
			{/* Header Section */}
			<div className="flex items-start gap-3 mb-3">
				{/* Avatar */}
				<div className="flex-shrink-0">
					<div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
						{photo_profile ? (
							<Image
								width={50}
								height={50}
								src={
									comments?.user_comment.photo_profile
										? `https://${comments?.user_comment.photo_profile}`
										: "/images/user.png"
								}
								alt={`${name} photo_profile`}
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
				</div>

				{/* Author Info and Badges */}
				<div className="flex-1">
					<div className="flex items-center gap-2 flex-wrap">
						<h3 className="text-gray-900 font-semibold text-base">
							{trimText(name, 20)}
						</h3>
						<span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded">
							{role}
						</span>
						{comments.status === COMMENT_STATUS.ACCEPTED && (
							<span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded">
								Accepted
							</span>
						)}
						{comments.status === COMMENT_STATUS.REJECTED && (
							<span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded">
								Rejected
							</span>
						)}
					</div>

					{/* Section Document */}
					<p className="text-sm text-gray-600 mt-1">
						Section Document :{" "}
						<span className="font-medium">{comments.section}</span>
					</p>
				</div>

				{!isPreview && (
					<div ref={ref} className="relative flex-shrink-0">
						<button
							type="button"
							onClick={() => setShowMenu(!showMenu)}
							className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
						>
							<EllipsisVertical className="w-5 h-5 text-gray-600" />
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
								{comments?.status === null && (
									<>
										{(user?.role === ROLE.SUPERADMIN ||
											comments.user_comment.name === user?.name) && (
											<button
												type="button"
												onClick={handleEditClick}
												className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
											>
												<Pencil className="w-[12px] h-[12px]" />
												Edit
											</button>
										)}
										<button
											type="button"
											onClick={handleReplyClick}
											className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
										>
											<Reply className="w-[12px] h-[12px]" />
											Reply
										</button>
									</>
								)}
								{(user?.role === ROLE.SUPERADMIN ||
									comments.user_comment.name === user?.name) && (
									<button
										type="button"
										onClick={handleDeleteClick}
										className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
									>
										<Trash className="w-[12px] h-[12px]" />
										Delete
									</button>
								)}
							</div>
						)}
					</div>
				)}
			</div>{" "}
			{/* Baseline Section */}
			<div className="mb-3">
				<div className="bg-gray-100 border-l-4 border-blue-500 p-3 rounded">
					<h4 className="text-sm font-semibold text-blue-600 mb-2">Baseline</h4>
					<p className="text-sm text-gray-600 leading-relaxed">
						{comments.baseline ? comments.baseline : "No baseline provided."}
					</p>
				</div>
			</div>
			{/* Comment Text */}
			<p className="text-gray-800 text-sm leading-relaxed mb-3">
				{comments.comment}
			</p>
			{/* Attachment Section */}
			{comments.attach_file_url && (
				<div className="mb-3">
					<p className="text-sm text-gray-600 mb-2">Attachment</p>
					<ButtonLink
						href={`https://${comments.attach_file_url}`}
						className="w-full"
						variant="secondary"
						leftIcon={File}
					>
						Open File
					</ButtonLink>
				</div>
			)}
			{/* Timestamp */}
			<div className="text-right text-sm text-gray-500">
				{comments.comment_at}
			</div>
			{/*Reply Section*/}
			<div className="flex pl-[2rem] mt-4">
				<div className="border-l-2 border-gray-200 w-[1rem]" />
				<div className="mt-[12px] flex flex-col gap-[12px] pl-[2rem] w-full">
					{comment_replies?.map((reply) => (
						<ReplyCard
							key={reply.id}
							replies={reply}
							parentComment={comments}
						/>
					))}
					{!isPreview &&
						comments?.status === null &&
						user?.role !== ROLE.CONTRACTOR && (
							<>
								<Button
									onClick={handleChangeStatusClick}
									variant="primary"
									size="sm"
									className="w-full"
								>
									Set Status
								</Button>
								<Button
									onClick={handleCloseCommentClick}
									variant="secondary"
									size="sm"
									className="w-full"
								>
									Close Comment
								</Button>
							</>
						)}
				</div>
			</div>
			{/* Modals */}
			<CommentDetailModal
				comment={comments}
				isOpen={isOpen.detail}
				onClose={() => setIsOpen({ ...isOpen, detail: false })}
			/>
			<EditCommentModal
				comment={comments}
				isOpen={isOpen.edit}
				onClose={() => setIsOpen({ ...isOpen, edit: false })}
			/>
			<DeleteCommentModal
				comment={comments}
				isOpen={isOpen.delete}
				onClose={() => setIsOpen({ ...isOpen, delete: false })}
			/>
			<CreateReplyModal
				isCloseComment={isCloseComment}
				comment={comments}
				isOpen={isOpen.reply}
				onClose={() => setIsOpen({ ...isOpen, reply: false })}
			/>
			<UpdateStatusModal
				comment={comments}
				isOpen={isOpen.updateStatus}
				onClose={() => setIsOpen({ ...isOpen, updateStatus: false })}
			/>
			{/* Lightbox for Image */}
			{comments.attach_file_url && (
				<LightboxModal
					images={[`https://${comments.attach_file_url}`]}
					open={isLightboxOpen}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</div>
	);
}
