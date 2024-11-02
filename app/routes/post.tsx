import db from "#/app/db.server.ts";
import { redirect } from "react-router";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "react-router";
import { Form, useNavigation } from "react-router";
import PostContent from "#/components/PostContent.tsx";
import { useId } from "react";
import type * as Route from "./+types.post";

export const meta: MetaFunction = () => {
  return [{ title: "Post" }];
};

/** topics
  - action
  - standard forms, request, formdata
  - redirect
  - validation
  - make it fast with js
*/
export default function Post({ loaderData, actionData }: Route.ComponentProps) {
  const { post } = loaderData;
  const { state } = useNavigation();
  const id = useId();
  const inputId = `input-${id}`;
  const descriptionId = `description${id}`;
  const busy = state !== "idle";

  return (
    <main>
      <h2>{post.title}</h2>
      <PostContent post={post} />
      <hr />
      <Form method="POST">
        <label htmlFor={inputId}>Edit post</label>
        <textarea
          id={inputId}
          aria-describedby={descriptionId}
          name="content"
          rows={5}
          defaultValue={post.content}
        />
        <span id={descriptionId}>{actionData?.content}</span>
        <button type={busy ? "button" : "submit"} aria-disabled={busy}>
          Update
        </button>
      </Form>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const post = await db.post.findUnique({
    where: {
      id: Number.parseInt(params.id!, 10),
    },
  });

  if (!post) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  return { post };
}

export async function action({ params, request }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const content = formData.get("content") as string;

  if (content === "") {
    return { content: "Content cannot be empty" };
  }

  await db.post.update({
    where: {
      id: Number.parseInt(id!, 10),
    },
    data: {
      content,
    },
  });

  return redirect(`/post/${id}`);
}
