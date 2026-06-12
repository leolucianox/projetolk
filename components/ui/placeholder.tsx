import { cn } from "@/lib/cn";

/**
 * Image holder. Renders a real photo when `src` is provided, falling back to a
 * neutral toned block (with a faint diagonal sheen) so layout/ratio stay intact
 * even if a remote image fails to load.
 */
export function Placeholder({
  tone = "#cfcfcf",
  src,
  alt = "",
  className,
  ratio,
  rounded = false,
  children,
}: {
  tone?: string;
  src?: string;
  alt?: string;
  className?: string;
  ratio?: string; // e.g. "3 / 4"
  rounded?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-sm",
        className,
      )}
      style={{
        backgroundColor: tone,
        aspectRatio: ratio,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 14px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/15" />
        </>
      )}
      {children}
    </div>
  );
}
