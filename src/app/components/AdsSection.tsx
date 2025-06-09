"use client";
import { useEffect } from "react";

export default function AdsSection({
  slot,
  format = "auto",
  responsive = true,
  style = { display: "block" },
}: {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  style?: React.CSSProperties;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (process.env.NODE_ENV != "production") {
    return null;
  } else {
    return (
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout="in-article"
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    );
  }
}
