import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import TextInput from "@/shared/components/TextInput";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface OrderSentDialogProps {
  open: boolean;
  onClose: () => void;
  onMarkOrderSent: (trackingCode: string) => Promise<any>;
}

export default function OrderSentDialog({
  open,
  onClose,
  onMarkOrderSent,
}: OrderSentDialogProps) {
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    if (open) {
      setTrackingCode("");
    }
  }, [open]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog title="ارسال سفارش" open={open} onClose={() => onClose()}>
      <div className={styles.DialogContent}>
        <div>کد پیگیری:</div>
        <div>
          <TextInput
            inputProps={{ type: "number", placeholder: "کد پیگیری" }}
            value={trackingCode}
            onChange={(newValue) => setTrackingCode(newValue.substring(0, 24))}
          />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          onClick={() => {
            setIsSubmitting(true);
            onMarkOrderSent(trackingCode).finally(() => setIsSubmitting(false));
          }}
          style={{ minWidth: 100 }}
          loading={isSubmitting}
          disabled={isSubmitting || trackingCode.length !== 24}
        >
          ارسال شده
        </Button>
      </BottomActions>
    </Dialog>
  );
}
