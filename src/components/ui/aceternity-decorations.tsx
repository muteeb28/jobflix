export function CornerBracket({ className }: { className?: string }) {
  return (
    <svg fill="none" height="11" viewBox="0 0 11 11" width="11" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M11 1L11 11L10 11L10 7C10 3.68629 7.31371 1 4 1L-4.37114e-08 1L0 -4.80825e-07L11 4.37114e-07L11 1Z" fill="#cbd5e1" />
    </svg>
  );
}

export function CrossAccent({ className }: { className?: string }) {
  return (
    <svg fill="none" height="21" viewBox="0 0 22 21" width="22" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z" fill="#cbd5e1" />
    </svg>
  );
}

export function CircleCrossAccent({ className }: { className?: string }) {
  return (
    <svg fill="none" height="47" viewBox="0 0 47 47" width="47" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 18C24 21.3137 26.6863 24 30 24H34V25H30C26.6863 25 24 27.6863 24 31V35H23V31C23 27.6863 20.3137 25 17 25H13V24H17C20.3137 24 23 21.3137 23 18V14H24V18Z" fill="#14b8a6" fillOpacity="1" />
      <circle cx="23.5" cy="23.5" r="23" stroke="#e2e8f0" strokeOpacity="1" />
    </svg>
  );
}
