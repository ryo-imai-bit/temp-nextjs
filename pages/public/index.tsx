import { octokit } from "@/utils/fetcher";
import type { InferGetStaticPropsType } from "next"

export type PageProps = InferGetStaticPropsType<
	typeof getStaticProps
>;

export const getStaticProps = async () => {
	// reposeにレスポンスが格納される
	const repos = await octokit.request(
		"GET /users/{username}/repos",
		{username: "ryo-imai-bit"}
	);
	return {props: { repos }};
};

export default function Page(props: PageProps) {
	if (!props.repos.data) return <>error</>;
	console.log(props.repos.data);
	return <div>Hello Next.js</div>;
}
