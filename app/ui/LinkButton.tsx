import React from "react";

type LinkButtonProps = React.ComponentProps<"button">;

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`underline decoration-dotted hover:bg-primary-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default LinkButton;
