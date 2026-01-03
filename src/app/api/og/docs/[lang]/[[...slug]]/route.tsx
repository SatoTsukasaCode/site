import { ImageResponse } from "next/og";
import { source } from "@/lib/source";
import { NextRequest } from "next/server";
import { notFound } from "next/navigation";

const size = {
  width: 1200,
  height: 630,
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang, slug = [] } = await params;
  const page = source.getPage(slug, lang);

  if (!page) {
    return notFound();
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {page.data.title}
    </div>,
    {
      ...size,
    },
  );
}
