export function AmericanFlag() {
  return (
    <svg
      viewBox="0 0 60 32"
      className="w-12 h-8 drop-shadow-md"
      aria-label="American Flag"
    >
      {/* Red stripes */}
      <rect width="60" height="2.46" fill="#B22234" />
      <rect y="4.92" width="60" height="2.46" fill="#B22234" />
      <rect y="9.84" width="60" height="2.46" fill="#B22234" />
      <rect y="14.76" width="60" height="2.46" fill="#B22234" />
      <rect y="19.68" width="60" height="2.46" fill="#B22234" />
      <rect y="24.6" width="60" height="2.46" fill="#B22234" />
      <rect y="29.52" width="60" height="2.46" fill="#B22234" />
      
      {/* White stripes */}
      <rect y="2.46" width="60" height="2.46" fill="#FFFFFF" />
      <rect y="7.38" width="60" height="2.46" fill="#FFFFFF" />
      <rect y="12.3" width="60" height="2.46" fill="#FFFFFF" />
      <rect y="17.22" width="60" height="2.46" fill="#FFFFFF" />
      <rect y="22.14" width="60" height="2.46" fill="#FFFFFF" />
      <rect y="27.06" width="60" height="2.46" fill="#FFFFFF" />
      
      {/* Blue canton */}
      <rect width="24" height="17.22" fill="#3C3B6E" />
      
      {/* White stars - simplified 5x6 pattern */}
      <g fill="#FFFFFF">
        {/* Row 1 - 6 stars */}
        <circle cx="2.4" cy="1.5" r="0.8" />
        <circle cx="6" cy="1.5" r="0.8" />
        <circle cx="9.6" cy="1.5" r="0.8" />
        <circle cx="13.2" cy="1.5" r="0.8" />
        <circle cx="16.8" cy="1.5" r="0.8" />
        <circle cx="20.4" cy="1.5" r="0.8" />
        
        {/* Row 2 - 5 stars */}
        <circle cx="4.2" cy="4" r="0.8" />
        <circle cx="7.8" cy="4" r="0.8" />
        <circle cx="11.4" cy="4" r="0.8" />
        <circle cx="15" cy="4" r="0.8" />
        <circle cx="18.6" cy="4" r="0.8" />
        
        {/* Row 3 - 6 stars */}
        <circle cx="2.4" cy="6.5" r="0.8" />
        <circle cx="6" cy="6.5" r="0.8" />
        <circle cx="9.6" cy="6.5" r="0.8" />
        <circle cx="13.2" cy="6.5" r="0.8" />
        <circle cx="16.8" cy="6.5" r="0.8" />
        <circle cx="20.4" cy="6.5" r="0.8" />
        
        {/* Row 4 - 5 stars */}
        <circle cx="4.2" cy="9" r="0.8" />
        <circle cx="7.8" cy="9" r="0.8" />
        <circle cx="11.4" cy="9" r="0.8" />
        <circle cx="15" cy="9" r="0.8" />
        <circle cx="18.6" cy="9" r="0.8" />
        
        {/* Row 5 - 6 stars */}
        <circle cx="2.4" cy="11.5" r="0.8" />
        <circle cx="6" cy="11.5" r="0.8" />
        <circle cx="9.6" cy="11.5" r="0.8" />
        <circle cx="13.2" cy="11.5" r="0.8" />
        <circle cx="16.8" cy="11.5" r="0.8" />
        <circle cx="20.4" cy="11.5" r="0.8" />
        
        {/* Row 6 - 5 stars */}
        <circle cx="4.2" cy="14" r="0.8" />
        <circle cx="7.8" cy="14" r="0.8" />
        <circle cx="11.4" cy="14" r="0.8" />
        <circle cx="15" cy="14" r="0.8" />
        <circle cx="18.6" cy="14" r="0.8" />
        
        {/* Row 7 - 6 stars */}
        <circle cx="2.4" cy="16.5" r="0.8" />
        <circle cx="6" cy="16.5" r="0.8" />
        <circle cx="9.6" cy="16.5" r="0.8" />
        <circle cx="13.2" cy="16.5" r="0.8" />
        <circle cx="16.8" cy="16.5" r="0.8" />
        <circle cx="20.4" cy="16.5" r="0.8" />
      </g>
    </svg>
  );
}
