interface PartnerLogoProps {
  name: string;
  className?: string;
}

export default function PartnerLogo({ name, className = "" }: PartnerLogoProps) {
  const initials = name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      className={`bg-green-deep text-gold-rich font-display font-medium flex items-center justify-center ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
