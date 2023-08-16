/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_routes: true,
    v2_meta: false,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  serverModuleFormat: "cjs",
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
};
