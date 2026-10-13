import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const pagesDir = join(root, "site-archive", "pages");
const html = await readFile(join(root, "dist", "index.html"), "utf8");
const files = (await readdir(pagesDir)).filter((name) => name.endsWith(".md"));
const routes = new Set(["/"]);

for (const file of files) {
  const source = await readFile(join(pagesDir, file), "utf8");
  const url = source.match(/^source:\s*(https?:\/\/\S+)/m)?.[1];
  if (!url) throw new Error(`Missing source URL in ${file}`);
  const route = new URL(url).pathname.replace(/\/+$/, "") || "/";
  if (routes.has(route) && route !== "/") throw new Error(`Duplicate route: ${route}`);
  routes.add(route);
}

for (const route of routes) {
  if (route === "/") continue;
  const output = join(root, "dist", route.replace(/^\//, ""), "index.html");
  await mkdir(join(root, "dist", route.replace(/^\//, "")), { recursive: true });
  await writeFile(output, html);
}

console.log(`Built ${routes.size} direct-load routes from the content archive.`);
