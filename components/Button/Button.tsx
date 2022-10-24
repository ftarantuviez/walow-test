import React, { FC } from "react";
import styles from "./Button.module.css";
import classnames from "classNames/bind";

const cx = classnames.bind(styles);

interface ButtonProps {
  children: React.ReactNode | string;
  active?: boolean;
  className?: string[];
  onClick?: React.MouseEventHandler;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, active, className = [], onClick } = props;
  const classNames = [cx("button", active && "active"), ...className];

  return (
    <button className={classNames.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
