export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/v1/auth/login",
		CurrentUser: "/v1/auth/me",
		ForgotPassword: "/v1/auth/forget",
		ResetPassword: "/v1/auth/change?token=id",
	},
	Comment: {
		FetchComments:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id/comment?sort=desc&sort_by=created_at",
		CreateComment:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id/comment",
		EditComment:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id/comment/:comment_id",
		CreateReply:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id/comment/:comment_id/reply",
		DeleteComment:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id/comment/:comment_id",
	},
	Document: {
		FetchDocuments: "/v1/document",
	},
	AreaOfConcern: {
		FetchAreaOfConcerns:
			"/v1/area-of-concern-group/:area_of_concern_group_id/area-of-concern/:area_of_concern_id",
	},
};
