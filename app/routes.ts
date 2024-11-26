import { index, route, RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route(":title", "routes/title.tsx"),
  route("post/:id", "routes/post.tsx"),
] satisfies RouteConfig;
