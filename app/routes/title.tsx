import db from "#/app/db.server.ts";
import { type MetaFunction } from "react-router";
import PostContent from "#/components/PostContent.tsx";
import type * as Route from "./+types.title";

export const meta: MetaFunction = (data) => {
  const { title } = data.data as Route.LoaderData;
  return [{ title: title ?? "Posts" }];
};

/** topics
  - dynamic segments
  - params
  - throw 404
*/
export default function Posts({ loaderData }: Route.ComponentProps) {
  const { title, posts } = loaderData;
  return (
    <main>
      <h2>{title}</h2>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <PostContent post={post} />
          </li>
        ))}
      </ol>
    </main>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  const posts = await db.post.findMany({
    where: {
      title: params.title,
    },
  });

  if (posts.length === 0) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  } else {
    return { title: params.title, posts };
  }
}
