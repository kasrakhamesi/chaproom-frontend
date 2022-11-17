import React, { PropsWithChildren, TextareaHTMLAttributes } from "react";
import styles from "./style.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  onTextChange?: (newValue: string) => void;
  varient?: "outlined" | "shadow";
}

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  PropsWithChildren<TextAreaProps>
>(({ onTextChange, varient = "outlined", ...props }: TextAreaProps, ref) => {
  const className = [styles.TextArea];
  switch (varient) {
    case "outlined":
      className.push(styles.Outlined);
      break;
    case "shadow":
      className.push(styles.Shadow);
      break;
  }
  if (props.readOnly) {
    className.push(styles.ReadOnly);
  }
  if (props?.className) {
    className.push(props.className);
  }

  return (
    <textarea
      ref={ref}
      {...props}
      className={className.join(" ")}
      onChange={(event) => {
        onTextChange && onTextChange(event.target.value);
        if (typeof props?.onChange === "function") {
          return props.onChange.apply(this, [event]);
        }
      }}
    />
  );
});

export default TextArea;
