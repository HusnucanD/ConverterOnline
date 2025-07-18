import { redirect, RedirectType } from "next/navigation";
import { Metadata } from "next";
import UnitsLogo from "@/app/components/UnitsLogo";
import UnitsHeader from "@/app/components/UnitsHeader";
import UnitsConverter from "@/app/components/UnitsConverter";
import UnitsInfo from "@/app/components/UnitsInfo";
// import AdsSection from "@/app/components/AdsSection";
import type { UnitsPayload } from "@/app/model/types";
import { getData } from "@/lib/data";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  let conversionTitle = "";
  const { conversion } = await params;
  if (conversion && conversion[0]) {
    const conversionPath = conversion[0];
    const match = conversionPath.match(/^(.+)-2-(.+)$/);
    if (match) {
      let [, fromSlug, toSlug]: [any, string, string] = match;
      fromSlug = fromSlug.charAt(0).toUpperCase() + fromSlug.slice(1);
      fromSlug = fromSlug.replaceAll("-", " ");
      toSlug = toSlug.charAt(0).toUpperCase() + toSlug.slice(1);
      toSlug = toSlug.replaceAll("-", " ");
      conversionTitle = `${fromSlug} to ${toSlug}`;
    }
  }
  return {
    title: conversionTitle,
    alternates: {
      canonical: `/${conversion}`,
    },
  };
}

export const revalidate = 86_400;

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const redirectToInitialConversion = async () => {
  const data: UnitsPayload = await getData();
  const unitsInCategory1 = data.units.filter((unit) => unit.categoryId == data.categories[1].id);
  redirect(
    `${slugify(unitsInCategory1[1].name)}-2-${slugify(unitsInCategory1[0].name)}`,
    RedirectType.replace
  );
};

export default async function Page({ params }: any) {
  const { conversion } = await params;
  if (conversion && conversion[0]) {
    const conversionPath = conversion[0];
    const match = conversionPath.match(/^(.+)-2-(.+)$/);
    if (match) {
      const data: UnitsPayload = await getData();
      const [, fromSlug, toSlug] = match;
      const fromId = data.units.find((u) => slugify(u.name) === fromSlug)?.id || "";
      const toId = data.units.find((u) => slugify(u.name) === toSlug)?.id || "";
      if (fromId != "" && toId != "") {
        return (
          <main className="w-full px-4 md:px-8 py-6 md:py-3">
            <div className="mx-auto max-w-5xl h-auto md:min-h-full flex flex-col gap-5 pb-10">
              <UnitsLogo />
              <UnitsHeader />
              <UnitsConverter categories={data.categories} units={data.units} fromId={fromId} toId={toId} />
              {/* <AdsSection slot="2643060303" /> */}
              <UnitsInfo categories={data.categories} units={data.units} fromId={fromId} toId={toId} />
            </div>
          </main>
        );
      } else {
        const unitsInCategory1 = data.units.filter((unit) => unit.categoryId == data.categories[14].id);
        redirect(
          `${slugify(unitsInCategory1[21].name)}-2-${slugify(unitsInCategory1[12].name)}`,
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
