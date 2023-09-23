import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import db from "#/app/db.server.ts";

/** topics
  - loader
  - type safety
  - progressively enhanced links
  - standard response
*/
export default function Index() {
  const { postTitles } = useLoaderData<typeof loader>();
  return (
    <main>
      <h2>Most popular</h2>
      <ul>
        {postTitles.map((postTitle) => (
          <li key={postTitle.title}>
            {/* <a href={`/${postTitle.title}`} >
              {postTitle.title} ({postTitle._count.title})
            </a> */}
            <Link to={`/${postTitle.title}`}>
              {postTitle.title} ({postTitle._count.title})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function loader() {
  const postTitles = await db.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
    orderBy: {
      _count: {
        title: "desc",
      },
    },
  });

  // return new Response(JSON.stringify({ posts }), {
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  // });

  return json({ postTitles });
}
