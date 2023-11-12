import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import "bamboo.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Starter" },
    { name: "description", content: "Welcome to remix!" },
  ];
};

/** topics
  - fs based routing
  - nested routes
  - links, meta
*/
export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1>Remix Starter</h1>
        </header>
        <Outlet />

        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let element = (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  );

  if (isRouteErrorResponse(error)) {
    element = (
      <div>
        <h1>Oops</h1>
        <p>
          Status: {error.status} {error.statusText}
        </p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{element}</div>
      </body>
    </html>
  );
}
