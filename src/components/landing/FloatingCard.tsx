import { CornerBracket } from "@/components/ui/aceternity-decorations";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showBrackets?: boolean;
}

export function FloatingCard({
  children,
  className = "",
  style,
  showBrackets = true,
}: FloatingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl border border-neutral-200 shadow-[0_8px_32px_rgba(0,0,0,0.09)] ${className}`}
      style={style}
    >
      {showBrackets && (
        <>
          <CornerBracket className="absolute top-0 left-0" />
          <CornerBracket className="absolute top-0 right-0 rotate-90" />
          <CornerBracket className="absolute bottom-0 left-0 -rotate-90" />
          <CornerBracket className="absolute bottom-0 right-0 rotate-180" />
        </>
      )}
      {children}
    </div>
  );
}
