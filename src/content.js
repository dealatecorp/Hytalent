import sourceFiles from './content-pages.json';
import sourceCountryCodes from './country-codes.json';

const categoryNames = {
  leadership: "Leadership & performance",
  communication: "Communication & collaboration",
  culture: "Culture & wellbeing",
  organization: "Organization & HR",
};

const categoryByPath = {
  "/art-of-negotiation/": "leadership",
  "/building-inter-personal-trust/": "communication",
  "/business-writing-etiquette/": "communication",
  "/campus-to-corporate/": "organization",
  "/capacity-building-for-internal-complaints-committee/": "culture",
  "/capacity-building-for-internal-complaints-committee-cloned-1932/": "leadership",
  "/coaching-to-maximize-employee-performance/": "leadership",
  "/conflict-management/": "communication",
  "/customer-service-excellence/": "communication",
  "/diversity-equity-and-inclusion-training/": "culture",
  "/emotional-intelligence/": "leadership",
  "/effective-presentations/": "communication",
  "/mastering-communication-skills/": "communication",
  "/developing-next-generation-teachers/": "organization",
  "/effective-leadership/": "leadership",
  "/hrd-audit/": "organization",
  "/locus-of-control/": "leadership",
  "/making-every-meeting-matter/": "communication",
  "/personal-effectiveness-2/": "leadership",
  "/positive-attitude-at-workplace/": "culture",
  "/stress-management/": "culture",
  "/team-building/": "communication",
  "/time-management/": "leadership",
  "/training-on-prevention-of-sexual-harassment-at-workplace/": "culture",
  "/work-life-balance/": "culture",
  "/poshified/": "culture",
  "/onboard-trainings/": "organization",
  "/hr-policies-for-startups/": "organization",
};

const utilityPaths = new Set([
  "/", "/about/", "/blog/", "/contact-us/", "/gallery/",
  "/gallery-cloned-1261/", "/privacy-policy/", "/training-programs/",
  "/category/training-programs/", "/ticker/test/",
]);

function cleanBody(raw, path) {
  let text = raw.replace(/^---[\s\S]*?---\s*/, "");
  text = text.replace(/^# [^\n]+\n+/, "");
  const sharedPopup = text.indexOf("\nContact Us\n\nPlease prove you are human");
  if (sharedPopup !== -1) text = text.slice(0, sharedPopup);
  if (path !== "/contact-us/") {
    const registration = text.search(/\n### Register Now\s*\n\s*Please prove you are human/);
    if (registration !== -1) text = text.slice(0, registration);
  }
  text = text.replace(/^Please prove you are human by selecting[^\n]*\n+Δ\n+/gm, "");
  return text.trim();
}

function titleFromBody(body, fallback, path) {
  if (path === "/") return "Learning that moves people forward";
  if (path === "/gallery-cloned-1261/") return "Our Clients";
  if (path === "/time-management/") return "Time Management";
  if (path === "/category/training-programs/") return "Training Programs";
  if (path === "/training-programs/") return "Training Programs";
  const headings = [...body.matchAll(/^#{1,2}\s+(.+)$/gm)].map((match) => match[1].trim());
  const candidate = headings.find((heading) => !/^(Training Programs Offered|About|Contact Us|Privacy Policy|Blog)$/i.test(heading));
  if (categoryByPath[path] && candidate) return candidate;
  return fallback.replace(/\s*-\s*HYtalent$/i, "").trim();
}

function summaryFromBody(body) {
  const blocks = body.split(/\n\s*\n/).map((part) => part.trim());
  return blocks.find((part) =>
    part.length > 85 && !part.startsWith("#") && !part.startsWith("-") &&
    !part.startsWith("!") && !part.startsWith("[") &&
    !part.startsWith("Please prove") && !part.startsWith("**Error"),
  )?.replace(/\*\*/g, "") || "";
}

export const pages = Object.values(sourceFiles).map((raw) => {
  const source = raw.match(/^source:\s*(\S+)/m)?.[1];
  const path = new URL(source).pathname.replace(/\/+$/, "") + "/";
  const normalizedPath = path === "//" ? "/" : path;
  const originalTitle = raw.match(/^#\s+([^\n]+)/m)?.[1] || "HYtalent";
  const body = cleanBody(raw, normalizedPath);
  const images = [...body.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]);
  const category = categoryByPath[normalizedPath] || null;
  return {
    path: normalizedPath,
    source,
    originalTitle,
    title: titleFromBody(body, originalTitle, normalizedPath),
    body,
    summary: summaryFromBody(body),
    images,
    category,
    categoryName: category ? categoryNames[category] : null,
    isProgram: !utilityPaths.has(normalizedPath),
  };
}).sort((a, b) => a.title.localeCompare(b.title));

export const pageByPath = Object.fromEntries(pages.map((page) => [page.path, page]));
export const programs = pages.filter((page) => page.isProgram);
export const categories = Object.entries(categoryNames).map(([id, label]) => ({ id, label }));
export const countryCodes = sourceCountryCodes;

export function normalizePath(path) {
  const clean = path.replace(/\/+$/, "");
  return clean ? `${clean}/` : "/";
}

export function localizeUrl(href) {
  if (!href) return href;
  try {
    const url = new URL(href, "https://hytalent.in");
    if (url.hostname === "hytalent.in" || url.hostname === "www.hytalent.in") {
      return `${normalizePath(url.pathname)}${url.search}${url.hash}`;
    }
  } catch { /* Keep the original URL. */ }
  return href;
}
