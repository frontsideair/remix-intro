import { Link } from "@remix-run/react";
import type { Post } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

type Props = {
  post: SerializeFrom<Post>;
};

export default function PostContent({ post }: Props) {
  return (
    <article>
      <p>{post.content}</p>
      <div className="text-sm text-right">
        <Link to={`/post/${post.id}`}>
          <time>{post.createdAt}</time>
        </Link>{" "}
        &middot; <span>{post.author}</span>
      </div>
    </article>
  );
}
