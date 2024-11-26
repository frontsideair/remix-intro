import { Link, useLoaderData } from "react-router";
import type { Post } from "@prisma/client";
import DateTime from "#/components/DateTime.tsx";

type SerializeFrom<T> = ReturnType<typeof useLoaderData<T>>;

type Props = {
  post: SerializeFrom<Post>;
};

export default function PostContent({ post }: Props) {
  return (
    <article>
      <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
      <div>
        <Link to={`/post/${post.id}`}>
          <DateTime date={new Date(post.createdAt)} />
        </Link>{" "}
        &middot; <span>{post.author}</span>
      </div>
    </article>
  );
}
