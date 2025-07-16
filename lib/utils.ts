import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  // console.log("Now:", now.toISOString());
  // console.log("CreatedAt:", createdAt.toISOString());

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "a few seconds ago";
};

export const formatNumber = (num: number): string => {
  const format = (value: number, suffix: string) => {
    return Number.isInteger(value)
      ? `${value}${suffix}`
      : `${value.toFixed(1)}${suffix}`;
  };

  if (num >= 1_000_000_000) {
    return format(num / 1_000_000_000, "B");
  }
  if (num >= 1_000_000) {
    return format(num / 1_000_000, "M");
  }
  if (num >= 1_000) {
    return format(num / 1_000, "K");
  }
  return num.toString();
};
