import { octokit } from "@/utils/fetcher";
import { GetStaticPropsContext } from "next";
import { route } from "next/dist/next-server/server/router";
import { useReducer } from "react";

export const getStaticPaths = async () => {
	return { paths: [], fallback: true };
};

export const getStaticProps = async (
	context: GetStaticPropsContext
) => {
	const username = context.params?.username;
	if (typeof username !== "string") {
		return propsFactory({
			err: { status: 400, message: "Bad Request" },
		});
	}
}

try {
	const param = { username };
	const res = await Promise.all([
		octokit.request("GET /users/{username}", param),
		octokit.request("GET /users/{username}/repos", param);
	]);
	return propsFactory({ user: res[0], repos: [1]});
} catch (err) {
	return propsFactory({
		err: { status: err.status, message: err.message },
	});
}

const router = useRouter();
if (err) {
	return (
		<Error statusCode={err.status} title={err.message} />
	);
}

if (route.isFallback || !user.data || !Response.data) {
	return <Loading />;
}

return (
	<>
		<template user={user.data} repos={Response.data} />
		<GeneratedAt label={generatedAt} />
	</>
)
