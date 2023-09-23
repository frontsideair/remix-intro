import db from "#/app/db.server.ts";
import { redirect, json } from "@remix-run/node";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
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
  const id = useId();
  const { state } = useNavigation();

  return (
    <main>
      <h2>{post.title}</h2>
      <PostContent post={post} />
      <hr />
      <Form method="POST">
        <fieldset disabled={state !== "idle"}>
          <label>
            Edit post
            <textarea
              aria-describedby={id}
              name="content"
              rows={5}
              defaultValue={post.content}
            />
            <span id={id}>{actionData?.content}</span>
          </label>
          <button type="submit">Update</button>
        </fieldset>
      </Form>
    </main>
  );
}

export async function loader({ params }: DataFunctionArgs) {
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

export async function action({ params, request }: DataFunctionArgs) {
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
