import type { UserComment } from "./user";

export interface Comment {
	id: string;
	section: string;
	comment: string;
	baseline: string;
	status: string;
	comment_at: string;
	document_id: string;
	user_comment: UserComment;
	comment_replies: Comment[];
}

export interface CreateCommentRequest {
	document_id: string;
	section: string;
	comment: string;
	baseline: string;
}

export interface CreateReplyRequest {
	document_id: string;
	section: string;
	comment: string;
	baseline: string;
	is_close_out_comment: boolean;
}

export interface EditCommentRequest {
	document_id: string;
	section: string;
	comment: string;
	baseline: string;
	is_close_out_comment: boolean;
	status: string;
}
