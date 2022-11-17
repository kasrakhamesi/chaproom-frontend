import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: "gradient" | "filled" | "outlined" | "none";
  loading?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    { varient = "none", loading = false, children, ...props }: ButtonProps,
    ref
  ) => {
    const className = [styles.Button];
    switch (varient) {
      case "outlined":
        className.push(styles.Outlined);
        break;
      case "filled":
        className.push(styles.Filled);
        break;
      case "gradient":
        className.push(styles.Gradient);
        break;
      case "none":
        className.push(styles.None);
        break;
    }
    if (loading) {
      className.push(styles.Loading);
    }
    if (props.className) {
      className.push(props.className);
    }

    return (
      <button ref={ref} {...props} className={className.join(" ")}>
        {children}
      </button>
    );
  }
);

export default Button;
