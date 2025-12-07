import { Modal, ModalContent } from "@heroui/modal";
import { X } from "lucide-react";
import Image from "next/image";
import IconButton from "@/components/button/IconButton";

interface FilePreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	fileUrl: string;
	fileName?: string;
}

export default function FilePreviewModal({
	isOpen,
	onClose,
	fileUrl,
	fileName = "Attachment",
}: FilePreviewModalProps) {
	const fullUrl = fileUrl.startsWith("http") ? fileUrl : `https://${fileUrl}`;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="5xl"
			classNames={{
				wrapper: "fixed inset-0 flex justify-center items-center z-[2000]",
				backdrop: "z-[1999] bg-black/50",
				base: "bg-white z-[2001] rounded-lg shadow-xl max-h-[95vh] w-[90vw] flex flex-col !m-4",
				closeButton: "hidden",
			}}
		>
			<ModalContent>
				<div className="flex flex-col h-full max-h-[95vh]">
					{/* Header */}
					<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
						<h2 className="text-xl font-bold text-gray-900">{fileName}</h2>
						<IconButton
							variant="ghost"
							onClick={onClose}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-5 h-5 text-gray-600"
						/>
					</div>

					{/* Image Container */}
					<div className="flex-1 p-6 overflow-auto bg-gray-50 min-h-0">
						<div className="w-full h-full flex items-center justify-center">
							<div className="relative max-w-full max-h-full">
								<Image
									src={fullUrl}
									alt={fileName}
									width={0}
									height={0}
									sizes="100vw"
									className="w-auto h-auto max-w-full max-h-[calc(95vh-120px)] object-contain"
									unoptimized
								/>
							</div>
						</div>
					</div>
				</div>
			</ModalContent>
		</Modal>
	);
}
