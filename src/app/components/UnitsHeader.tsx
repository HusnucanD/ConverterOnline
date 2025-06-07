import Image from "next/image";

export const revalidate = false;

export default function UnitsHeader() {
  return (
    <>
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
          Convert any Unit
        </span>
        <span className="bg-(--custom-card) px-2 rounded-xl border z-30 shadow-sm">
          Fast, Free & Accurate
        </span>
      </h1>
    </>
  );
}
