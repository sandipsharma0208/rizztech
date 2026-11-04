import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const routes = [
  ["", "/"],
  ["services", "/services/"],
  ["industries", "/industries/"],
  ["projects", "/projects/"],
  ["about", "/about/"],
  ["contact", "/contact/"],
  ["routers", "/routers/"],
  ["rates", "/rates/"],
  ["estimate", "/estimate/"],
  ["terms", "/terms/"],
];
const basePath = (process.env.GITHUB_PAGES_BASE ?? "/").replace(/\/$/, "");
const server = await createServer({ server: { middlewareMode: true } });

try {
  const { App } = await server.ssrLoadModule("/src/main.jsx");

  for (const [directory, route] of routes) {
    const file = resolve("dist", directory, "index.html");
    const html = await readFile(file, "utf8");
    const page = renderToString(
      React.createElement(App, {
        pathname: `${basePath}${route}`,
        search: "",
      }),
    );
    const prerendered = html.replace(
      '<div id="root"></div>',
      `<div id="root">${page}</div>`,
    );

    if (prerendered === html) {
      throw new Error(`Could not find the React root in ${file}`);
    }
    await writeFile(file, prerendered);
  }
} finally {
  await server.close();
}
