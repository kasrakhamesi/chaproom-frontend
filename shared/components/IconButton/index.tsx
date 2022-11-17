import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";
import styles from "./style.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: "filled" | "outlined" | "none";
  size?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ varient = "none", size = 54, ...props }: IconButtonProps, ref) => {
    const className = [styles.IconButton];
    switch (varient) {
      case "outlined":
        className.push(styles.Outlined);
        break;
      case "filled":
        className.push(styles.Filled);
        break;
      case "none":
        className.push(styles.None);
        break;
    }

    return (
      <button
        className={className.join(" ")}
        style={{ width: size, height: size }}
        {...props}
        ref={ref}
      >
        {props.children}
      </button>
    );
  }
);

export default IconButton;
