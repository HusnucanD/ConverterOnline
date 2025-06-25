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
      <div className="w-full">
        <h2 className="font-semibold text-2xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-6 shadow mx-auto">
          {category?.name}
        </h2>
        <p className="text-base font-medium">{category?.description}</p>
      </div>
      <div className="w-full">
        <h3 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-3 shadow">
          {fromUnit?.name}
        </h3>
        <p className="text-base font-medium">{fromUnit?.description}</p>
      </div>
      <div className="w-full">
        <h3 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit px-3 shadow">
          {toUnit?.name}
        </h3>
        <p className="text-base font-medium">{toUnit?.description}</p>
      </div>
    </Card>
  );
}
