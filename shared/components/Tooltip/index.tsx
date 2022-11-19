import styles from "./style.module.scss";
import React, { ReactElement, useRef, useState } from "react";
import {
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useClick,
  arrow,
} from "@floating-ui/react-dom-interactions";

interface TooltipProps {
  message: string;
  children: ReactElement;
}

export default function Tooltip({ message, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const {
    x,
    y,
    reference,
    floating,
    placement,
    strategy,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(6),
      flip({ padding: 6 }),
      shift({ padding: 6 }),
      arrow({ element: arrowRef, padding: 6 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  const staticSide =
    {
      top: "bottom",
      bottom: "top",
    }[placement.split("-")[0]] || "top";

  return (
    <>
      <div
        ref={reference}
        {...getReferenceProps({
          className: styles.Reference,
        })}
      >
        {children}
      </div>
      {open && (
        <div
          ref={floating}
          className={styles.Tooltip}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          <div className={styles.Message} role="tooltip">
            {message}
          </div>
          <div
            ref={arrowRef}
            className={styles.Arrow}
            data-static-side={staticSide}
            style={{
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              right: "",
              bottom: "",
              [staticSide]: "-6px",
            }}
          />
        </div>
      )}
    </>
  );
}
