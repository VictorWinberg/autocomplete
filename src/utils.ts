export function titleCase(str: string): string {
  return str
    .split("_")
    .map((word): string => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
}
