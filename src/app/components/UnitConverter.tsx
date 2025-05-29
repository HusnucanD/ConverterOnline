"use client";
import { useMemo, useState, useEffect } from "react";
import type { Category, Unit } from "@/app/model/types";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface Props {
  categories: Category[];
  units: Unit[];
}

export default function UnitConverter({ categories, units }: Props) {
  const [catId, setCatId] = useState<string>(categories[0]?.id ?? "");
  const unitsInCategory = useMemo(
    () => units.filter((u) => u.categoryId === catId),
    [units, catId]
  );
  const [fromId, setFromId] = useState<string>("");
  const [toId, setToId] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("1");
  const [outputVal, setOutputVal] = useState<string>("");
  useEffect(() => {
    setFromId(unitsInCategory[0]?.id ?? "");
    setToId(unitsInCategory[1]?.id ?? unitsInCategory[0]?.id ?? "");
  }, [unitsInCategory]);
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
  return (
    <div className="mx-auto max-w-5xl h-auto md:min-h-full flex flex-col gap-5 pb-10">
      <img src="/new_logo.svg" alt="Converter Online" className="w-23 md:w-32 mx-auto" />
      <div className="flex flex-col md:flex-row gap-5">
        <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-auto md:h-[65vh] bg-[#fbfbfb]">
          <Label className="text-base">Category</Label>
          <Select value={catId} onValueChange={(e: any) => setCatId(e)}>
            <SelectTrigger className="w-full cursor-pointer mb-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[35vh]">
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id} className="cursor-pointer p-1 m group">
                  {/* <span className="text-xl my-[-2px] group-hover:bg-white/20 rounded-md">
                    {c.logo}
                  </span> */}
                  <span className="font-medium capitalize">{c.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className="text-base">From</Label>
          <Select value={fromId} onValueChange={(e: any) => setFromId(e)}>
            <SelectTrigger className="w-full cursor-pointer mb-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[40vh]">
              {unitsInCategory.map((u) => (
                <SelectItem key={u.id} value={u.id} className="cursor-pointer group">
                  <span className="font-semibold capitalize text-primary group-hover:text-accent-foreground">
                    {u.shortName}
                  </span>
                  <span className="font-medium capitalize">{u.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className="text-base">To</Label>
          <Select value={toId} onValueChange={(e: any) => setToId(e)}>
            <SelectTrigger className="w-full cursor-pointer mb-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[40vh]">
              {unitsInCategory.map((u) => (
                <SelectItem
                  key={u.id}
                  value={u.id}
                  className="cursor-pointer hover:bg-accent group"
                >
                  <span className="font-semibold capitalize text-primary group-hover:text-accent-foreground">
                    {u.shortName}
                  </span>
                  <span className="font-medium capitalize">{u.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className="text-base">Value</Label>
          <Input
            type="number"
            value={inputVal}
            className="font-medium"
            onChange={(e) => setInputVal(e.target.value)}
          ></Input>
          <div className="flex items-center justify-center text-xl font-bold font-mono rounded-md bg-primary text-primary-foreground mt-3 py-2 cursor shadow">
            {outputVal}
          </div>
        </Card>
        <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-[50vh] md:h-[65vh] bg-[#fbfbfb]">
          <h2 className="text-xl font-medium">
            Units of{" "}
            <span className="capitalize">{categories.filter((x) => x.id == catId)[0].name}</span>
            {/* <span className="ml-1 text-2xl rounded-md bg-foreground/50">
              {categories.filter((x) => x.id == catId)[0].logo}
            </span> */}
          </h2>
          <div className="flex flex-col grow overflow-y-auto">
            {unitsInCategory.map((u) => (
              <button
                key={u.id}
                onClick={() => setFromId(u.id)}
                className="text-left p-2 mr-3 rounded-md cursor-pointer flex align-middle hover:bg-accent hover:text-accent-foreground group"
              >
                <div>
                  <span className="text-base font-semibold text-primary group-hover:text-accent-foreground capitalize text-shadow-sm">
                    {u.shortName}
                  </span>
                  <span className="text-sm font-medium capitalize ml-1">{u.name}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
      <Card className="font-semibold flex flex-row gap-8 p-5 h-25 justify-center items-center bg-[#fbfbfb]">
        <p>ADS AREA</p>
      </Card>
      <Card className="flex flex-col gap-4 p-5 bg-[#fbfbfb]">
        <div>
          <h2 className="font-medium text-xl mb-1 text-primary capitalize">
            {unitsInCategory.filter((u) => u.id == fromId)[0]?.name}
          </h2>
          <p className="text-base">
            {unitsInCategory.filter((u) => u.id == fromId)[0]?.description}
          </p>
        </div>
        <div>
          <h2 className="font-medium text-xl mb-1 text-primary capitalize">
            {unitsInCategory.filter((u) => u.id == toId)[0]?.name}
          </h2>
          <p className="text-base">{unitsInCategory.filter((u) => u.id == toId)[0]?.description}</p>
        </div>
        <div></div>
      </Card>
    </div>
  );
}
