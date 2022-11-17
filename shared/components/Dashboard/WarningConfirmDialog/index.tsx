import styles from "./style.module.scss";
import Button from "@/shared/components/Button";
import Dialog from "@/shared/components/Dialog";
import ButtonList from "@/shared/components/ButtonList";
import WarningIcon from "@/shared/assets/icons/warning.svg";
import { useState } from "react";

interface WarningConfirmDialogProps {
  open: boolean;
  onConfirm: () => Promise<any>;
  onClose: () => void;
  message: string;
  confirmButtonText: string;
}

export default function WarningConfirmDialog({
  open,
  onConfirm,
  onClose,
  message,
  confirmButtonText,
}: WarningConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.Container}>
        <div className={styles.WarningIcon}>
          <WarningIcon />
        </div>
        <div className={styles.Message}>{message}</div>
        <div className={styles.Buttons}>
          <ButtonList>
            <Button
              className={styles.Button}
              onClick={onClose}
              disabled={isSubmitting}
            >
              بستن
            </Button>
            <Button
              varient="filled"
              className={styles.Button}
              onClick={() => {
                setIsSubmitting(true);
                onConfirm().finally(() => setIsSubmitting(false));
              }}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {confirmButtonText}
            </Button>
          </ButtonList>
        </div>
      </div>
    </Dialog>
  );
}
