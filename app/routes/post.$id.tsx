import db from "#/app/db.server.ts";
import { redirect, json } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import PostContent from "#/components/PostContent.tsx";
import { useId } from "react";

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
export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
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
    return json({ content: "Content cannot be empty" });
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
