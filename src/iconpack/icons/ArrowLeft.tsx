import { SVGProps } from '../model/types';

export const ArrowLeft = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 9 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M8 1L2 7L8 13'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);
