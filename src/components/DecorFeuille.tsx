export default function DecorFeuille({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 160"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* tige */}
      <path
        d="M50 158 C50 110 52 60 50 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* feuilles : ellipses inclinées autour de la tige */}
      <g fill="currentColor">
        <ellipse cx="50" cy="22" rx="9" ry="20" />
        <ellipse cx="30" cy="55" rx="10" ry="22" transform="rotate(-35 30 55)" />
        <ellipse cx="70" cy="75" rx="10" ry="22" transform="rotate(35 70 75)" />
        <ellipse cx="30" cy="105" rx="10" ry="22" transform="rotate(-35 30 105)" />
      </g>
    </svg>
  );
}