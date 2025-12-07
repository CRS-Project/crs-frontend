export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/v1/auth/login",
		CurrentUser: "/v1/auth/me",
		ForgotPassword: "/v1/auth/forget",
		ResetPassword: "/v1/auth/change?token=id",
	},
	Comment: {
		FetchComments:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id/comment?sort=desc&sort_by=created_at",
		CreateComment:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id/comment",
		EditComment:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id/comment/:comment_id",
		CreateReply:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id/comment/:comment_id/reply",
		DeleteComment:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id/comment/:comment_id",
	},
	Document: {
		FetchDocuments: "/v1/document",
	},
	Concern: {
		FetchConcernsById: "/v1/discipline-group/:area_of_concern_group_id",
	},
	AreaOfConcern: {
		FetchAreaOfConcerns:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id",
		CreateAreaOfConcern:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document",
		EditAreaOfConcern:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id",
		DeleteAreaOfConcern:
			"/v1/discipline-group/:area_of_concern_group_id/discipline-list-document/:area_of_concern_id",
		GeneratePdf: "/v1/discipline-group/:area_of_concern_group_id/generate-pdf",
		GetConsolidators:
			"/v1/discipline-group/:area_of_concern_group_id/consolidator",
	},
	User: {
		FetchUsersByPackageAndRole:
			"/v1/user?filter=Reviewer,:id&filter_by=role,package_id",
	},
	Package: {
		GeneratePdf: "/v1/package/:package_id/generate-pdf",
	},
};
