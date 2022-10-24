import React, { FC } from "react";
import styles from "./Button.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface ButtonProps {
  children: React.ReactNode | string;
  active?: boolean;
  className?: string[];
  onClick?: React.MouseEventHandler;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, active, className = [], onClick } = props;
  const classnames = [cx("button", active && "active"), ...className];

  return (
    <button className={classnames.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
