import fs from "node:fs/promises";
import path from "node:path";
import { redirect, RedirectType } from "next/navigation";
import UnitConverter from "@/app/components/UnitConverter";
import type { UnitsPayload } from "@/app/model/types";

export const revalidate = false;

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const redirectToInitialConversion = async () => {
  const file = await fs.readFile(path.join(process.cwd(), "public", "data.json"), "utf8");
  const data = JSON.parse(file) as UnitsPayload;
  const unitsInCategory1 = data.units.filter((unit) => unit.categoryId == data.categories[1].id);
  redirect(
    `${slugify(unitsInCategory1[1].name)}-2-${slugify(unitsInCategory1[0].name)}`,
    RedirectType.replace
  );
};

export default async function Page({ params }: any) {
  if (params.conversion && params.conversion[0]) {
    const conversionPath = params.conversion[0];
    const match = conversionPath.match(/^(.+)-2-(.+)$/);
    if (match) {
      const file = await fs.readFile(path.join(process.cwd(), "public", "data.json"), "utf8");
      const data = JSON.parse(file) as UnitsPayload;
      const [, fromSlug, toSlug] = match;
      const fromId = data.units.find((u) => slugify(u.name) === fromSlug)?.id || "";
      const toId = data.units.find((u) => slugify(u.name) === toSlug)?.id || "";
      if (fromId != "" || toId != "") {
        return (
          <main className="w-full px-4 md:px-8 py-6 md:py-3">
            <UnitConverter categories={data.categories} units={data.units} fromId={fromId} toId={toId} />
          </main>
        );
      } else {
        const unitsInCategory1 = data.units.filter((unit) => unit.categoryId == data.categories[1].id);
        redirect(
          `${slugify(unitsInCategory1[1].name)}-2-${slugify(unitsInCategory1[0].name)}`,
          RedirectType.replace
        );
      }
    } else {
      return redirectToInitialConversion();
    }
  } else {
    return redirectToInitialConversion();
  }
}
