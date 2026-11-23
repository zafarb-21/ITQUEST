import { isPublicToken } from "@/lib/public-token";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The quotation PDF for the customer's private quote page. */
export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isPublicToken(token) || !isDatabaseConfigured()) {
    return new Response("Not found", { status: 404 });
  }
  const quote = await getPrismaClient().salesQuote.findUnique({
    where: { publicToken: token },
    select: { pdf: true, pdfName: true },
  });
  if (!quote) {
    return new Response("Not found", { status: 404 });
  }
  const name = (quote.pdfName || "quotation.pdf").replace(/[^A-Za-z0-9._ -]/g, "_");
  return new Response(Buffer.from(quote.pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${name}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
