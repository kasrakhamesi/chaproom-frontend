import styles from "./style.module.scss";
import { PropsWithChildren, useId } from "react";
import {
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
} from "@floating-ui/react-dom-interactions";
import CloseIcon from "@/shared/assets/icons/close.svg";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  fullScreenInMobile?: boolean;
  hideTitleInMobile?: boolean;
}

export default function Dialog({
  open,
  onClose,
  title,
  children,
  fullScreenInMobile = false,
  hideTitleInMobile = false,
}: PropsWithChildren<DialogProps>) {
  const { floating, context } = useFloating({
    open,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  const id = useId();
  const labelId = `${id}-label`;

  const { getFloatingProps } = useInteractions([
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay lockScroll={true}>
          <FloatingFocusManager context={context}>
            <div
              className={styles.Container}
              data-full-screen-in-mobile={fullScreenInMobile}
              data-hide-title-in-mobile={hideTitleInMobile}
            >
              <div
                className={styles.Dialog}
                ref={floating}
                aria-labelledby={labelId}
                {...getFloatingProps()}
              >
                {title && (
                  <div className={styles.Header}>
                    <div className={styles.Start} />
                    <div className={styles.Center}>
                      <div className={styles.Title} id={labelId}>
                        {title}
                      </div>
                    </div>
                    <div className={styles.End}>
                      <button
                        className={styles.CloseButton}
                        onClick={() => onClose()}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                )}
                <div className={styles.Content}>{children}</div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
}
