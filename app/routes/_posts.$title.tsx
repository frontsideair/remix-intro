import db from "#/app/db.server.ts";
import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostContent from "#/components/PostContent.tsx";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title ?? "Posts" }];
};

/** topics
  - dynamic segments
  - params
  - throw 404
*/
export default function Posts() {
  const { title, posts } = useLoaderData<typeof loader>();
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

export async function loader({ params }: LoaderFunctionArgs) {
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
