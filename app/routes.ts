import { index, route } from "@react-router/dev/routes";

export const routes = [
  index("routes/index.tsx"),
  route(":title", "routes/title.tsx"),
  route("post/:id", "routes/post.tsx"),
];
