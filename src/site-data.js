import { pageByPath } from "./content.js";

export const media = {
  leadership: "https://hytalent.in/wp-content/uploads/2021/10/high-impact-l-s-hy.jpeg",
  communication: "https://hytalent.in/wp-content/uploads/2021/09/pexels-photo-3184291-3.jpeg",
  conflict: "https://hytalent.in/wp-content/uploads/2021/10/conflict-resolution.jpeg",
  workLife: "https://hytalent.in/wp-content/uploads/2021/12/work-life-balance-hy-1024x574.jpeg",
  founder: "https://hytalent.in/wp-content/uploads/2021/09/unnamed-5.jpg",
};

export const leadPrograms = [
  "/effective-leadership/", "/mastering-communication-skills/",
  "/conflict-management/", "/work-life-balance/", "/hrd-audit/",
  "/capacity-building-for-internal-complaints-committee/",
];

export const serviceCards = [
  {
    title: "Leadership & behavioural training",
    path: "/training-programs/",
    detail: "Success of any organisation mainly depends on the leadership skills and behavioural skills of the managers. These modules help the participants to prepare for the leadership roles.",
    image: media.leadership,
  },
  {
    title: "HRD Audit",
    path: "/hrd-audit/",
    detail: "Evaluate the strength of HRD systems, strategies, competencies and culture to achieve best results.",
    image: "https://hytalent.in/wp-content/uploads/2021/12/audit-g36eafc22d_640.jpg",
  },
  {
    title: "Customer service excellence",
    path: "/customer-service-excellence/",
    detail: "Customer Service Excellence is the key to customer loyalty and customer retention. Good training develops the skills of employees who interact with customers.",
    image: media.communication,
  },
  {
    title: "Capacity building for ICC",
    path: "/capacity-building-for-internal-complaints-committee/",
    detail: "Internal Complaints Committees learn their roles, responsibilities and procedures for handling sexual harassment cases.",
    image: "https://hytalent.in/wp-content/uploads/2023/11/Capacity-Building.jpg",
  },
  {
    title: "POSH at work",
    path: "/poshified/",
    detail: "Create a safe and healthy workplace through professional behaviour and the prevention of sexual harassment.",
    image: "https://hytalent.in/wp-content/uploads/2023/11/POSH.jpg",
  },
  {
    title: "Campus to corporate",
    path: "/campus-to-corporate/",
    detail: "Equip students with the soft skills and confidence needed to enter the corporate world.",
    image: "https://hytalent.in/wp-content/uploads/2023/11/Campus-Corporate.jpg",
  },
  {
    title: "Onboard training",
    path: "/onboard-trainings/",
    detail: "Give new joiners a smooth onboarding experience and prepare them for real situations at work.",
    image: "https://hytalent.in/wp-content/uploads/2023/11/Onboard-Training.jpg",
  },
  {
    title: "HR policies for startups",
    path: "/hr-policies-for-startups/",
    detail: "Put sound HR policies in place so growing businesses can focus on their other key areas.",
    image: "https://hytalent.in/wp-content/uploads/2023/11/HR-Policies.jpg",
  },
];


function parseTestimonials() {
  const home = pageByPath["/"]?.body || "";
  const segment = home.split("## Client Testimonials")[1]?.split("[SIGN UP TODAY")[0] || "";
  const withoutImages = segment.replace(/^!\[\]\([^)]+\)\s*$/gm, "");
  const matches = [...withoutImages.matchAll(/\*\*([^*]+)\*\*\s+\*\*([^*]+)\*\*\s*([\s\S]*?)(?=\n\n\*\*[^*]+\*\*\s+\*\*[^*]+\*\*|$)/g)];
  const unique = new Set();
  return matches.map((match) => ({ name: match[1], organization: match[2], quote: match[3].trim() }))
    .filter((item) => { const key = `${item.name}|${item.organization}`; if (unique.has(key)) return false; unique.add(key); return item.quote; });
}

export const testimonials = parseTestimonials();
export const clientImages = pageByPath["/gallery-cloned-1261/"]?.images || [];


