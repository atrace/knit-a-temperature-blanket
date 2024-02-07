type LinkButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <button
      style={{
        color: "white",
        textDecoration: "underline dotted",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default LinkButton;
