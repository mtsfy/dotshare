import { differenceInMonths, formatDistanceToNow, format } from 'date-fns';

export function formatTimeAgo(postTime: Date): string {
  const currentTime = new Date();
  const monthsDifference = differenceInMonths(currentTime, postTime);

  if (monthsDifference >= 2) {
    return format(postTime, 'MMM d, yyyy');
  }

  return formatDistanceToNow(postTime, { addSuffix: true },);
}

