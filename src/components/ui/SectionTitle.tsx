type SectionTitleProps = {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  number,
  label,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-widest text-indigo">
        <span>{number}</span>
        <span className="h-px w-8 bg-indigo/40" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2 className="mt-4 font-titre text-4xl font-bold leading-tight text-encre sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-encre-douce">
          {subtitle}
        </p>
      )}
    </div>
  );
}