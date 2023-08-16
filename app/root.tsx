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
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./style.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
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
      <body className="max-w-sm mx-auto px-4">
        <header>
          <h1 className="text-4xl font-bold">Remix Starter</h1>
        </header>
        <Outlet />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
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
