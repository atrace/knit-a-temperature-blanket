import NextLink from "next/link";
import React from "react";

type LinkProps = React.ComponentPropsWithRef<"a">;

const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => {
  if (!href) return;

  return (
    <NextLink
      className={`text-primary-white underline decoration-dotted hover:bg-primary-white ${className}`}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
