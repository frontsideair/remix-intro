import { Link } from "react-router";
import type { Post } from "@prisma/client";
import type { SerializeFrom } from "#node_modules/react-router/dist/lib/dom/ssr/components";
import DateTime from "#/components/DateTime.tsx";

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
