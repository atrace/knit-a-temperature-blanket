import NextLink from "next/link";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: React.FC<LinkProps> = ({ children, style, href, ...props }) => {
  if (!href) return;

  return (
    <NextLink
      style={{
        color: "white",
        textDecoration: "underline dotted",
        ...style,
      }}
      {...props}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export default Link;
