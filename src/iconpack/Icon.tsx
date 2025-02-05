import { iconMap } from './model/icon';
import { sizeMap } from './model/size';
import { IconProps } from './model/types';

export const Icon = ({
  name,
  color = 'red',
  size = 'sm',
  ...props
}: IconProps) =>
  iconMap[name] &&
  iconMap[name]({
    size: typeof size === 'string' ? sizeMap[size] : size,
    color,
    ...props,
  });
