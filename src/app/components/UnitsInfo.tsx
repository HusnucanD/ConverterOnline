import { Card } from "@/components/ui/card";
import type { Unit } from "@/app/model/types";

interface UnitsInfoProps {
  units: Unit[];
  fromId: string;
  toId: string;
}

export const revalidate = false;

export default function UnitsInfo({ units, fromId, toId }: UnitsInfoProps) {
  const fromUnit = units.find((unit) => unit.id == fromId);
  const toUnit = units.find((unit) => unit.id == toId);
  return (
    <Card className="flex flex-col gap-7 p-5 items-center bg-(--custom-card)">
      <div className="w-full">
        <h2 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit pl-2 pr-3 shadow">
          {fromUnit?.name}
        </h2>
        <p className="text-base font-medium">{fromUnit?.description}</p>
      </div>
      <div className="w-full">
        <h2 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit pl-2 pr-3 shadow">
          {toUnit?.name}
        </h2>
        <p className="text-base font-medium">{toUnit?.description}</p>
      </div>
    </Card>
  );
}
