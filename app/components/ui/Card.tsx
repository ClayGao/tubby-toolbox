import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bordered?: boolean;
  hoverEffect?: boolean;
}

export function Card({
  children,
  bordered = true,
  hoverEffect = true,
  className = "",
  ...props
}: CardProps) {
  const baseStyles =
    "bg-card-bg rounded-lg p-5 transition-all duration-200";

  const borderStyles = bordered ? "border border-border" : "";

  const hoverStyles = hoverEffect
    ? "hover:shadow-md hover:border-primary/50 cursor-pointer"
    : "";

  const combinedClassName = `${baseStyles} ${borderStyles} ${hoverStyles} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ children, className = "", ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 pb-4 border-b border-border ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardBody({ children, className = "", ...props }: CardBodyProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  return (
    <div className={`pt-4 border-t border-border flex gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
