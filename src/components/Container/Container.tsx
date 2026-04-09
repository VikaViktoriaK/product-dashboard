import type { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className = "" }) => {
  return <div className={`container ${className}`.trim()}>{children}</div>;
};

export default Container;
