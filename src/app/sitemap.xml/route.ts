import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { UnitsPayload } from "@/app/model/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export async function GET() {
  const json = await fs.readFile(path.join(process.cwd(), "public", "data.json"), "utf8");
  const data = JSON.parse(json) as UnitsPayload;
  const urls: string[] = [];
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
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urls.map((loc) => `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}
                </urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

export const revalidate = 86_400;
