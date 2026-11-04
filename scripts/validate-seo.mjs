import { readFile } from "node:fs/promises";

const routes = [
  "",
  "services",
  "industries",
  "projects",
  "about",
  "contact",
  "routers",
  "rates",
  "estimate",
  "terms",
];
const titles = new Set();
const descriptions = new Set();
const schemaTypes = new Set();

for (const route of routes) {
  const file = route ? `dist/${route}/index.html` : "dist/index.html";
  const html = await readFile(file, "utf8");
  const url = `https://www.rizztech.in/${route ? `${route}/` : ""}`;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const descriptionTag = html.match(
    /<meta\b(?=[^>]*\bname="description")[^>]*>/s,
  )?.[0];
  const description = descriptionTag?.match(/\bcontent="([^"]+)"/)?.[1];
  const rootStart = html.indexOf('<div id="root">') + '<div id="root">'.length;
  const rootEnd = html.lastIndexOf("</div>");
  const renderedApp = html.slice(rootStart, rootEnd);

  if (!title || !description || !renderedApp.includes("<h1")) {
    throw new Error(`${file} is missing metadata or rendered page content`);
  }
  if (titles.has(title) || descriptions.has(description)) {
    throw new Error(`${file} repeats a title or meta description`);
  }
  titles.add(title);
  descriptions.add(description);

  if (
    !html.includes(`<link rel="canonical" href="${url}"`) ||
    !html.includes('name="robots" content="index,follow') ||
    /name="robots" content="[^\"]*noindex/i.test(html)
  ) {
    throw new Error(`${file} has invalid canonical or robots metadata`);
  }

  const imageTags = [...renderedApp.matchAll(/<img\b([^>]*)>/g)];
  if (imageTags.some(([, attributes]) => !/\balt=/.test(attributes))) {
    throw new Error(`${file} has an image without an alt attribute`);
  }

  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    const data = JSON.parse(json);
    const entities = data["@graph"] || [data];
    for (const entity of entities) schemaTypes.add(entity["@type"]);
  }

  console.log(
    `${file}: metadata, canonical, robots, rendered H1 and image alts verified`,
  );
}

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  ([, url]) => url,
);
if (
  sitemapUrls.length !== routes.length ||
  routes.some(
    (route) =>
      !sitemapUrls.includes(
        `https://www.rizztech.in/${route ? `${route}/` : ""}`,
      ),
  )
) {
  throw new Error("sitemap.xml does not list every public route");
}

const robots = await readFile("dist/robots.txt", "utf8");
if (
  !robots.includes("Allow: /") ||
  !robots.includes("https://www.rizztech.in/sitemap.xml")
) {
  throw new Error("robots.txt is missing the allow rule or sitemap reference");
}

for (const type of ["Organization", "WebSite", "Service"]) {
  if (!schemaTypes.has(type)) throw new Error(`Missing ${type} JSON-LD schema`);
}

console.log(
  `Verified ${routes.length} public routes, sitemap, robots.txt and required JSON-LD types.`,
);
