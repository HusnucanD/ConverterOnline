import fs from "node:fs/promises";
import path from "node:path";
import UnitConverter from "@/app/components/UnitConverter";
import type { UnitsPayload } from "@/app/model/types";

export const revalidate = false;

export default async function Page() {
  const file = await fs.readFile(path.join(process.cwd(), "public", "data.json"), "utf8");
  const data = JSON.parse(file) as UnitsPayload;
  console.log(data.categories[0]);

  return (
    <main className="w-full px-4 md:px-8 py-6 md:py-3">
      <UnitConverter categories={data.categories} units={data.units} />
    </main>
  );
}
