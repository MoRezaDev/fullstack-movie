import React from "react";

interface CardProps {
  title?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`bg-neutral-800 text-white rounded-2xl shadow-md p-4  ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-gray-100">{title}</h2>
      )}
      <div className="mb-2">{children}</div>
      {footer && (
        <div className="mt-4 border-t border-gray-700 pt-3">{footer}</div>
      )}
    </div>
  );
};

export default Card;
