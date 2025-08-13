import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Category, Unit } from "@/app/model/types";

interface CategoryLinksProps {
  categories: Category[];
  units: Unit[];
}

interface Link {
  categoryId: string;
  name: string;
  path: string;
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const revalidate = 86_400;

export default function CategoryLinks({ categories, units }: CategoryLinksProps) {
  const links: Link[] = [];
  categories.forEach((category) => {
    const unitsInCategory = units.filter((u) => u.categoryId == category.id);
    const fromUnit = unitsInCategory[Math.floor(unitsInCategory.length / 2) - 1];
    const toUnit = unitsInCategory[Math.floor(unitsInCategory.length / 2)];
    if (fromUnit && toUnit) {
      const path = `/${slugify(fromUnit.name)}-2-${slugify(toUnit.name)}`;
      links.push({
        categoryId: category.id,
        name: category.name,
        path: path,
      });
    }
  });
  const cardStyle = {
    boxShadow: "none",
  };
  return (
    <Card className="hidden md:block bg-transparent border-0 py-2" style={cardStyle}>
      <section className="w-full flex flex-wrap justify-center gap-2">
        {links.map((link) => (
          <Link
            key={link.categoryId}
            href={link.path}
            prefetch
            aria-label={link.path}
            className="border shadow-xs px-2 py-1 bg-(--custom-card) text-sm font-semibold capitalize rounded-xl"
          >
            <Image
              src={`/images/minimized/${link.categoryId}.webp`}
              alt={`${link.name} logo`}
              width={36}
              height={36}
              className="p-1 inline-block"
            />
            {link.name}
          </Link>
        ))}
      </section>
    </Card>
  );
}
