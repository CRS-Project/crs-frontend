import Cookies from "universal-cookie";

// !CHANGETHIS

const cookies = new Cookies();

export const getToken = (): string => cookies.get("@crs/token");

export const setToken = (token: string) => {
	cookies.set("@crs/token", token, { path: "/" });
};

export const removeToken = () => cookies.remove("@crs/token", { path: "/" });
