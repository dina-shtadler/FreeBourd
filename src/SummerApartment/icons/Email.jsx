const EmailIcon = ({ size = 24, color = 'currentColor' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M22,6 L12,13 L2,6" />
    </svg>
  );
  
  export default EmailIcon;
  