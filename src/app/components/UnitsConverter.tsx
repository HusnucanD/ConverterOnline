"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Category, Unit } from "@/app/model/types";

interface UnitsConverterProps {
  categories: Category[];
  units: Unit[];
  fromId: string;
  toId: string;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export default function UnitsConverter({ categories, units, fromId, toId }: UnitsConverterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [catId, setCatId] = useState<string>();
  const unitsInCategory = useMemo(() => units.filter((u) => u.categoryId === catId), [units, catId]);
  const [inputVal, setInputVal] = useState<string>("1");
  const [outputVal, setOutputVal] = useState<string>("");
  useEffect(() => {
    const fromUnit = units.find((u) => u.id === fromId);
    if (fromUnit) {
      setCatId(fromUnit.categoryId);
    }
  }, [fromId, units]);
  useEffect(() => {
    if (!fromId || !toId) return;
    if (fromId === toId) {
      setOutputVal(inputVal);
      return;
    }
    const fromUnit = units.find((u) => u.id === fromId);
    if (!fromUnit) return;
    const fnStr = fromUnit.conversions[toId];
    if (!fnStr) {
      setOutputVal("N/A");
      return;
    }
    try {
      const fn = eval(fnStr) as (v: number) => number;
      const res = fn(parseFloat(inputVal));
      setOutputVal(Number.isFinite(res) ? res.toString() : "N/A");
    } catch {
      setOutputVal("Error");
    }
  }, [inputVal, fromId, toId, units]);
  const handleCategoryChange = (catId: string) => {
    const unitsInCategory = units.filter((u) => u.categoryId == catId);
    const fromUnit = unitsInCategory[Math.floor(unitsInCategory.length / 2) - 1];
    const toUnit = unitsInCategory[Math.floor(unitsInCategory.length / 2)];
    if (fromUnit && toUnit) {
      const newPath = `/${slugify(fromUnit.name)}-2-${slugify(toUnit.name)}`;
      if (pathname !== newPath) {
        router.push(newPath, { scroll: false });
      }
    }
  };
  const handleUnitChange = (field: any, value: any) => {
    let fromUnit, toUnit;
    if (field == "from") {
      fromUnit = units.find((u) => u.id === value);
      toUnit = units.find((u) => u.id === toId);
    } else {
      fromUnit = units.find((u) => u.id === fromId);
      toUnit = units.find((u) => u.id === value);
    }
    if (fromUnit && toUnit) {
      const newPath = `/${slugify(fromUnit.name)}-2-${slugify(toUnit.name)}`;
      if (pathname !== newPath) {
        router.push(newPath, { scroll: false });
      }
    }
  };
  const handleResultClick = () => {
    navigator.clipboard
      .writeText(outputVal)
      .then(() => {
        toast("Copied!", {
          description: `${outputVal}`,
        });
      })
      .catch(() => {
        toast.error("Failed to Copy");
      });
  };
  const handleUnitClick = (toUnitId: string) => {
    const fromUnit = units.find((u) => u.id === fromId);
    const toUnit = units.find((u) => u.id === toUnitId);
    if (fromUnit && toUnit) {
      const newPath = `/${slugify(fromUnit.name)}-2-${slugify(toUnit.name)}`;
      if (pathname !== newPath) {
        router.push(newPath, { scroll: false });
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-111 bg-(--custom-card)">
        <Label className="text-base font-semibold">Category</Label>
        <Select value={catId} onValueChange={(e: any) => handleCategoryChange(e)}>
          <SelectTrigger className="w-full cursor-pointer mb-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[30vh]">
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id} className="cursor-pointer p-1 m group">
                <span className="text-xl group-hover:bg-white/50 group-focus:bg-white/50 rounded-xl px-1">
                  {c.logo}
                </span>
                <span className="font-semibold capitalize">{c.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="text-base font-semibold">From</Label>
        <Select value={fromId} onValueChange={(e: any) => handleUnitChange("from", e)}>
          <SelectTrigger className="w-full cursor-pointer mb-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[40vh]">
            {unitsInCategory.map((u) => (
              <SelectItem key={u.id} value={u.id} className="cursor-pointer group">
                <span className="font-bold capitalize text-primary group-hover:text-primary-foreground group-focus:text-primary-foreground">
                  {u.shortName}
                </span>
                <span className="font-semibold capitalize">{u.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="text-base font-semibold">To</Label>
        <Select value={toId} onValueChange={(e: any) => handleUnitChange("to", e)}>
          <SelectTrigger className="w-full cursor-pointer mb-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[40vh]">
            {unitsInCategory.map((u) => (
              <SelectItem key={u.id} value={u.id} className="cursor-pointer hover:bg-accent group">
                <span className="font-bold capitalize text-primary group-hover:text-primary-foreground group-focus:text-primary-foreground">
                  {u.shortName}
                </span>
                <span className="font-semibold capitalize">{u.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="text-base font-semibold">Value</Label>
        <Input
          type="number"
          value={inputVal}
          className="font-semibold"
          onChange={(e) => setInputVal(e.target.value)}
        ></Input>
        <div
          onClick={() => handleResultClick()}
          className="flex items-center justify-center text-xl font-bold rounded-md bg-primary text-primary-foreground mt-6 py-2 shadow h-11 cursor-pointer"
        >
          {outputVal}{" "}
          <span className="font-extrabold capitalize ml-2">
            {units.find((u) => u.id === toId)?.shortName}
          </span>
        </div>
      </Card>
      <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-111 bg-(--custom-card)">
        <h2 className="text-xl font-bold">
          Units of <span className="capitalize">{categories.filter((x) => x.id == catId)[0]?.name}</span>
          <span className="ml-1 text-2xl rounded-md">{categories.filter((x) => x.id == catId)[0]?.logo}</span>
        </h2>
        <div className="flex flex-col grow overflow-y-auto">
          {unitsInCategory.map((u) => (
            <button
              key={u.id}
              onClick={() => handleUnitClick(u.id)}
              className={`text-left p-2 mr-3 rounded-md cursor-pointer flex align-middle hover:bg-accent hover:text-accent-foreground group ${
                fromId === u.id || toId === u.id
                  ? fromId === u.id
                    ? "bg-primary/10 border-l-4 border-primary hover:border-primary"
                    : "bg-secondary/10 border-l-4 border-secondary hover:border-primary"
                  : ""
              }`}
            >
              <div>
                <span className="text-base font-bold text-primary group-hover:text-accent-foreground capitalize text-shadow-2xs">
                  {u.shortName}
                </span>
                <span className="text-sm font-semibold capitalize ml-1">{u.name}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
