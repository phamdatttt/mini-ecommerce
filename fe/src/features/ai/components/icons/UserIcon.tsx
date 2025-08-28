import React from 'react';

interface IconProps {
  className?: string;
}

const UserIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default UserIcon;
