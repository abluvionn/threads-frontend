import dayjs from 'dayjs';

export const formatTimeAgo = (createdAt: string) => {
  const now = dayjs();
  const diffInSeconds = now.diff(dayjs(createdAt), 's');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} с.`;
  }

  const diffInMinutes = now.diff(dayjs(createdAt), 'm');
  if (diffInMinutes < 60) {
    return `${diffInMinutes} мин.`;
  }

  const diffInHours = now.diff(dayjs(createdAt), 'h');
  if (diffInHours < 24) {
    return `${diffInHours} ч.`;
  }

  const diffInDays = now.diff(dayjs(createdAt), 'd');
  if (diffInDays < 30) {
    return `${diffInDays} дн.`;
  }

  const diffInMonths = now.diff(dayjs(createdAt), 'M');
  if (diffInMonths < 12) {
    return `${diffInMonths} мес.`;
  }

  const diffInYears = now.diff(dayjs(createdAt), 'y');
  return `${diffInYears} г.`;
};
