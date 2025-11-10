"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { toast } from "react-hot-toast";
import Loading from "@/app/loading";
import useAuthStore from "@/app/stores/useAuthStore";
import { getToken, removeToken } from "@/lib/cookies";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";
import type { UserResponse } from "@/types/login";
import type { User } from "@/types/user";

const ROLE = ["SUPER ADMIN", "CONTRACTOR", "REVIEWER"] as const;

type Role = (typeof ROLE)[number];

export interface WithAuthProps {
	user: User;
}

const DEFAULT_ROUTE = "/home";
const LOGIN_ROUTE = "/login";

export enum RouteRole {
	public,
	admin,
	user,
}

export const isRole = (p: Role): p is Role => ROLE.includes(p as Role);

const hasAccess = (
	userRole: Role,
	routeRole: keyof typeof RouteRole,
): boolean => {
	if (userRole === "SUPER ADMIN") return true;

	switch (userRole) {
		case "CONTRACTOR":
			return routeRole === "user" || routeRole === "public";
		case "REVIEWER":
			return routeRole === "user" || routeRole === "public";

		default:
			return false;
	}
};

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T>(
	Component: React.ComponentType<T>,
	routeRole: keyof typeof RouteRole,
) {
	function ComponentWithAuth(props: T) {
		const router = useRouter();
		const params = useSearchParams();
		const redirect = params.get("redirect");
		const pathName = usePathname();

		//#region  //*=========== STORE ===========
		const isAuthenticated = useAuthStore.useIsAuthed();
		const isLoading = useAuthStore.useIsLoading();
		const login = useAuthStore.useLogin();
		const logout = useAuthStore.useLogout();
		const stopLoading = useAuthStore.useStopLoading();
		const user = useAuthStore.useUser();
		//#endregion  //*======== STORE ===========

		const checkAuth = React.useCallback(() => {
			const token = getToken();
			if (!token) {
				isAuthenticated && logout();
				stopLoading();
				return;
			}
			if (!user) {
				const loadUser = async () => {
					try {
						const res = await api.get<ApiResponse<UserResponse>>("/v1/auth/me");

						if (!res.data) {
							toast.error("Sesi login tidak valid");
							throw new Error("Sesi login tidak valid");
						}

						login({ ...res.data.data.personal_info, token: token });
					} catch (_err) {
						await removeToken();
					} finally {
						stopLoading();
					}
				};

				loadUser();
			} else {
				stopLoading();
			}
		}, [isAuthenticated, login, logout, stopLoading, user]);

		React.useEffect(() => {
			if (isLoading && !user) {
				checkAuth();
			}

			window.addEventListener("focus", checkAuth);
			return () => {
				window.removeEventListener("focus", checkAuth);
			};
		}, [checkAuth, isLoading, user]);

		React.useEffect(() => {
			const handleRedirect = () => {
				if (isAuthenticated && user) {
					// Handle login route redirect
					if (pathName === LOGIN_ROUTE) {
						router.replace(DEFAULT_ROUTE);
						return;
					}

					// Handle role-based access
					if (routeRole === "public") {
						if (redirect) {
							router.replace(redirect as string);
						} else {
							router.replace(DEFAULT_ROUTE);
						}
					} else if (!hasAccess(user.role as Role, routeRole)) {
						router.replace(DEFAULT_ROUTE);
					}
				} else if (routeRole !== "public") {
					router.replace(`${LOGIN_ROUTE}?redirect=${pathName}`);
				}
			};

			if (!isLoading) {
				handleRedirect();
			}
		}, [
			isAuthenticated,
			isLoading,
			pathName,
			redirect,
			router,
			user,
			routeRole,
		]);

		// Show loading state if:
		// 1. Initial loading
		// 2. Not authenticated and trying to access protected route
		// 3. Authenticated but user data not yet loaded
		// 4. Authenticated but doesn't have access to the route
		if (
			isLoading ||
			(!isAuthenticated && routeRole !== "public") ||
			(isAuthenticated && !user) ||
			(isAuthenticated &&
				user &&
				routeRole !== "public" &&
				!hasAccess(user.role as Role, routeRole))
		) {
			return <Loading />;
		}

		// Only render the component if:
		// 1. It's a public route
		// 2. User is authenticated and has access
		if (
			routeRole === "public" ||
			(isAuthenticated && user && hasAccess(user.role as Role, routeRole))
		) {
			return <Component {...(props as T)} user={user} />;
		}

		// Fallback loading state - this shouldn't normally be reached
		return <Loading />;
	}

	return ComponentWithAuth;
}
