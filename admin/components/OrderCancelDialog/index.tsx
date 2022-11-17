import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import TextInput from "@/shared/components/TextInput";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";
import ContentSelect from "@/shared/components/ContentSelect";

interface OrderCancelDialogProps {
  open: boolean;
  onClose: () => void;
  onCancelOrder: (reason: string) => Promise<any>;
}

export default function OrderCancelDialog({
  open,
  onClose,
  onCancelOrder,
}: OrderCancelDialogProps) {
  const [reason, setReason] = useState<string>(
    "تعداد برگ با سفارش همخوانی ندارد"
  );
  const [reasonText, setReasonText] = useState("");

  useEffect(() => {
    if (open) {
      setReason("تعداد برگ با سفارش همخوانی ندارد");
      setReasonText("");
    }
  }, [open]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog title="لغو سفارش" open={open} onClose={() => onClose()}>
      <div className={styles.DialogContent}>
        <div>انتخاب علت:</div>
        <div>
          <ContentSelect
            options={["تعداد برگ با سفارش همخوانی ندارد", "دیگر"]}
            value={reason}
            onChange={setReason}
          />
        </div>
        {reason === "دیگر" && (
          <>
            <div>علت:</div>
            <div>
              <TextInput
                inputProps={{ placeholder: "علت" }}
                value={reasonText}
                onChange={setReasonText}
              />
            </div>
          </>
        )}
      </div>
      <BottomActions>
        <Button
          varient="filled"
          onClick={() => {
            setIsSubmitting(true);
            onCancelOrder(reason === "دیگر" ? reasonText : reason).finally(() =>
              setIsSubmitting(false)
            );
          }}
          style={{ minWidth: 100 }}
          loading={isSubmitting}
          disabled={isSubmitting || (reason === "دیگر" && !reasonText)}
        >
          لغو کردن
        </Button>
      </BottomActions>
    </Dialog>
  );
}
