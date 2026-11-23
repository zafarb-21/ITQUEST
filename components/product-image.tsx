import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

/** The manufacturer's product photo, or a neat placeholder. Plain <img>: the links point at the brands' own media servers. */
export function ProductImage({
  src,
  alt,
  className,
  large = false,
}: {
  src: string | null;
  alt: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-center overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white", large ? "aspect-[4/3] p-6" : "aspect-[16/10] p-4", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className="max-h-full max-w-full object-contain" />
      ) : (
        <div className="inline-flex rounded-2xl bg-brand-50 p-4 text-brand-700">
          <Boxes className={large ? "h-10 w-10" : "h-6 w-6"} />
        </div>
      )}
    </div>
  );
}
