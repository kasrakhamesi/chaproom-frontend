import React, { InputHTMLAttributes, ReactNode, Ref } from "react";
import styles from "./style.module.scss";

interface TextInputProps {
  prefix?: ReactNode;
  value?: string;
  suffix?: ReactNode;
  onChange?: (newValue: string) => void;
  varient?: "outlined" | "shadow" | "shadow-without-bg";
  boxProps?: InputHTMLAttributes<HTMLDivElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
  readOnly?: boolean;
  height?: number;
}

const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      prefix,
      value,
      suffix,
      onChange,
      varient = "outlined",
      boxProps,
      inputProps,
      inputRef,
      readOnly = false,
      height = 40,
    }: TextInputProps,
    ref
  ) => {
    const className = [styles.InputBox];
    switch (varient) {
      case "outlined":
        className.push(styles.Outlined);
        break;
      case "shadow":
        className.push(styles.Shadow);
        break;
      case "shadow-without-bg":
        className.push(styles.ShadowWithoutBg);
        break;
    }
    if (readOnly) {
      className.push(styles.ReadOnly);
    }
    if (boxProps?.className) {
      className.push(boxProps.className);
    }

    return (
      <div
        ref={ref}
        {...boxProps}
        className={className.join(" ")}
        style={{
          height,
          borderRadius: Math.round(height / 2),
          ...boxProps?.style,
        }}
      >
        {prefix}
        <input
          ref={inputRef}
          {...inputProps}
          readOnly={readOnly}
          value={
            value !== undefined
              ? value
              : inputProps
              ? inputProps.value
              : undefined
          }
          onChange={(event) => {
            onChange && onChange(event.target.value);
            if (typeof inputProps?.onChange === "function") {
              return inputProps.onChange.apply(this, [event]);
            }
          }}
        />
        {suffix}
      </div>
    );
  }
);

export default TextInput;
