import { cn } from "@lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "secondary" | "white" | "black";
  screenReaderText?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-2",
  xl: "w-12 h-12 border-4",
};

const colorClasses = {
  primary: "border-blue-600 border-t-transparent",
  secondary: "border-gray-600 border-t-transparent",
  white: "border-white border-t-transparent",
  black: "border-black border-t-transparent",
};

export default function LoadingSpinner({
  size = "md",
  className,
  color = "primary",
  screenReaderText,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">{screenReaderText}</span>
    </div>
  );
}
