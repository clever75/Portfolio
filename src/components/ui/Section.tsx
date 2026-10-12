import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export default function Section({
  id,
  children,
  className = "",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 ${className}`}
    >
      <div className={`mx-auto max-w-6xl px-6 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}