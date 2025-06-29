import { Card } from "@/components/ui/card";
import type { Category, Unit } from "@/app/model/types";

interface UnitsInfoProps {
  categories: Category[];
  units: Unit[];
  fromId: string;
  toId: string;
}

export const revalidate = 86_400;

export default function UnitsInfo({ categories, units, fromId, toId }: UnitsInfoProps) {
  const fromUnit = units.find((unit) => unit.id == fromId);
  const toUnit = units.find((unit) => unit.id == toId);
  const category = categories.find((category) => category.id == fromUnit?.categoryId);
  return (
    <Card className="flex flex-col gap-7 p-5 items-center bg-(--custom-card)">
      <section className="w-full">
        <h2 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-6 shadow mx-auto">
          {category?.name}
        </h2>
        <p className="text-[15px] font-medium relative">
          {category?.description}
          {category?.logo && (
            <span className="absolute antialiased left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] opacity-20 pointer-events-none select-none">
              {category.logo}
            </span>
          )}
        </p>
      </section>
      <section className="w-full">
        <h3 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-3 shadow">
          {fromUnit?.name}
        </h3>
        {fromUnit?.longDescription && (
          <div
            className="prose max-w-none text-[15px] font-medium whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: fromUnit.longDescription }}
          ></div>
        )}
      </section>
      <section className="w-full">
        <h3 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-3 shadow">
          {toUnit?.name}
        </h3>
        {toUnit?.longDescription && (
          <div
            className="prose max-w-none text-[15px] font-medium whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: toUnit.longDescription }}
          ></div>
        )}
      </section>
    </Card>
  );
}
