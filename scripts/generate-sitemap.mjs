import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { create } from "xmlbuilder2";

const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://converter.online";
const json = readFileSync(path.join(process.cwd(), "public", "data.json"), "utf8");
const data = JSON.parse(json);
const urls = [];
data.units.forEach((from) => {
  data.units
    .filter((unit) => unit.categoryId == from.categoryId)
    .forEach((to) => {
      if (from.id !== to.id) {
        urls.push(`${BASE_URL}/${slugify(from.name)}-2-${slugify(to.name)}`);
      }
    });
});
const lastmod = new Date().toISOString().split("T")[0];
const xml = create({ version: "1.0", encoding: "UTF-8" })
  .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" })
  .ele(urls.map((loc) => `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n"))
  .end({ prettyPrint: true });
writeFileSync("public/sitemap.xml", xml);
console.log("✔︎  sitemap.xml generated");
