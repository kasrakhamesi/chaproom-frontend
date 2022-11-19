import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient?:
    | "gradient"
    | "filled"
    | "outlined"
    | "content-title-outlined"
    | "none"
    | "content-title-none";
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
      case "gradient":
        className.push(styles.Gradient);
        break;
      case "filled":
        className.push(styles.Filled);
        break;
      case "outlined":
        className.push(styles.Outlined);
        break;
      case "content-title-outlined":
        className.push(styles.ContentTitleOutlined);
        break;
      case "none":
        className.push(styles.None);
        break;
      case "content-title-none":
        className.push(styles.ContentTitleNone);
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
