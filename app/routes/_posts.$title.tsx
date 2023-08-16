import db from "../db.server";
import { json, type LoaderArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostContent from "components/PostContent";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data.title,
  };
};

/** topics
  - dynamic segments
  - params
  - throw 404
*/
export default function Posts() {
  const { title, posts } = useLoaderData<typeof loader>();
  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <ol className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostContent post={post} />
          </li>
        ))}
      </ol>
    </main>
  );
}

export async function loader({ params }: LoaderArgs) {
  const posts = await db.post.findMany({
    where: {
      title: params.title,
    },
  });

  if (posts.length === 0) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  } else {
    return json({ title: params.title, posts });
  }
}
