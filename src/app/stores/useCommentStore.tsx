import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";

import type { Comment } from "@/types/comment";

type CommentStoreType = {
	selectedComment: Comment | null;
	setSelectedComment: (comment: Comment | null) => void;
	isDetailModalOpen: boolean;
	isEditModalOpen: boolean;
	isDeleteModalOpen: boolean;
	isCreateModalOpen: boolean;
	closeDetailModal: () => void;
	closeEditModal: () => void;
	closeDeleteModal: () => void;
	closeCreateModal: () => void;
	openDetailModal: (comment: Comment) => void;
	openEditModal: (comment: Comment) => void;
	openDeleteModal: (comment: Comment) => void;
	openCreateModal: () => void;
};

const useCommentStoreBase = create<CommentStoreType>((set) => ({
	selectedComment: null,
	isDetailModalOpen: false,
	isEditModalOpen: false,
	isDeleteModalOpen: false,
	isCreateModalOpen: false,
	setSelectedComment: (comment) => {
		set(
			produce<CommentStoreType>((state) => {
				state.selectedComment = comment;
			}),
		);
	},
	openDetailModal: (comment) => {
		set(
			produce<CommentStoreType>((state) => {
				state.selectedComment = comment;
				state.isDetailModalOpen = true;
			}),
		);
	},
	closeDetailModal: () => {
		set(
			produce<CommentStoreType>((state) => {
				state.isDetailModalOpen = false;
				state.selectedComment = null;
			}),
		);
	},
	openEditModal: (comment) => {
		set(
			produce<CommentStoreType>((state) => {
				state.selectedComment = comment;
				state.isEditModalOpen = true;
			}),
		);
	},
	closeEditModal: () => {
		set(
			produce<CommentStoreType>((state) => {
				state.isEditModalOpen = false;
				state.selectedComment = null;
			}),
		);
	},
	openDeleteModal: (comment) => {
		set(
			produce<CommentStoreType>((state) => {
				state.selectedComment = comment;
				state.isDeleteModalOpen = true;
			}),
		);
	},
	closeDeleteModal: () => {
		set(
			produce<CommentStoreType>((state) => {
				state.isDeleteModalOpen = false;
				state.selectedComment = null;
			}),
		);
	},
	openCreateModal: () => {
		set(
			produce<CommentStoreType>((state) => {
				state.isCreateModalOpen = true;
			}),
		);
	},
	closeCreateModal: () => {
		set(
			produce<CommentStoreType>((state) => {
				state.isCreateModalOpen = false;
			}),
		);
	},
}));

const useCommentStore = createSelectorHooks(useCommentStoreBase);

export default useCommentStore;
