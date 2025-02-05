import { SVGProps } from '../model/types';

export const HeartOutlined = ({ size, color, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 21 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M6.66737 1.38831C3.96708 1.38831 1.77795 3.57743 1.77795 6.27772C1.77795 11.1671 7.55635 15.612 10.6678 16.6459C13.7792 15.612 19.5576 11.1671 19.5576 6.27772C19.5576 3.57743 17.3685 1.38831 14.6682 1.38831C13.0147 1.38831 11.5523 2.20928 10.6678 3.46586C10.2169 2.82374 9.61788 2.2997 8.92154 1.93807C8.22521 1.57644 7.45201 1.38786 6.66737 1.38831Z'
      stroke={color}
      strokeWidth='1.77797'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
