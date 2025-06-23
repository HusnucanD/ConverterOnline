export const revalidate = false;

export default function UnitsHeader() {
  return (
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
      <span className="bg-(--custom-card) px-2 rounded-xl border z-30 shadow-sm">Fast, Free & Accurate</span>
    </h1>
  );
}
