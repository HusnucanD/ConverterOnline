"use client";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
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
import type { Category, Unit } from "@/app/model/types";

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
  const copyToClipboard = () => {
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
  return (
    <div className="mx-auto max-w-5xl h-auto md:min-h-full flex flex-col gap-5 pb-10">
      <Image
        src="/logo2.svg"
        alt="Converter Online"
        width={130}
        height={130}
        quality={100}
        className="w-23 md:w-35 mx-auto shadow-sm rounded-xl border p-1 bg-(--custom-card)"
      ></Image>
      <h1 className="text-2xl md:text-3xl mx-auto text-primary text-center text-shadow-sm font-semibold my-1 flex flex-col">
        <span
          className="bg-(--custom-card) px-2 rounded-xl border border-b-0 z-40 -mb-px w-fit mx-auto rounded-b-none"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(26, 26, 26, 0) 0px 0px 0px 0px, rgb(26, 26, 26) 4px 0px 2px -2px",
          }}
        >
          Convert any unit
        </span>
        <span className="bg-(--custom-card) px-2 rounded-xl border z-30 shadow-sm">
          Fast, Free & Accurate
        </span>
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-111 bg-(--custom-card)">
          <Label className="text-base font-semibold">Category</Label>
          <Select value={catId} onValueChange={(e: any) => setCatId(e)}>
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
          <Select value={fromId} onValueChange={(e: any) => setFromId(e)}>
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
            onClick={() => copyToClipboard()}
            className="flex items-center justify-center text-xl font-bold rounded-md bg-primary text-primary-foreground mt-6 py-2 shadow h-11 cursor-pointer"
          >
            {outputVal}
          </div>
        </Card>
        <Card className="w-full md:w-[50%] flex flex-col gap-2 p-5 h-111 bg-(--custom-card)">
          <h2 className="text-xl font-bold">
            Units of{" "}
            <span className="capitalize">{categories.filter((x) => x.id == catId)[0].name}</span>
            <span className="ml-1 text-2xl rounded-md">
              {categories.filter((x) => x.id == catId)[0].logo}
            </span>
          </h2>
          <div className="flex flex-col grow overflow-y-auto">
            {unitsInCategory.map((u) => (
              <button
                key={u.id}
                onClick={() => setFromId(u.id)}
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
      {/* <Card className="font-semibold flex flex-row gap-8 p-5 h-25 justify-center items-center bg-(--custom-card)">
        <p>ADS AREA</p>
      </Card> */}
      <Card className="flex flex-col gap-7 p-5 items-center bg-(--custom-card)">
        <div>
          <h2 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit pl-2 pr-3 shadow">
            {unitsInCategory.filter((u) => u.id == fromId)[0]?.name}
          </h2>
          <p className="text-base font-medium">
            {unitsInCategory.filter((u) => u.id == fromId)[0]?.description}
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-4 text-primary-foreground bg-primary capitalize w-fit pl-2 pr-3 shadow">
            {unitsInCategory.filter((u) => u.id == toId)[0]?.name}
          </h2>
          <p className="text-base font-medium">
            {unitsInCategory.filter((u) => u.id == toId)[0]?.description}
          </p>
        </div>
      </Card>
    </div>
  );
}
