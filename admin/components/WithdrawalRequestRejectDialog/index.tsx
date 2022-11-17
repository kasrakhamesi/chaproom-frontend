import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import Dialog from "@/shared/components/Dialog";
import ContentSelect from "@/shared/components/ContentSelect";
import TextInput from "@/shared/components/TextInput";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface WithdrawalRequestRejectDialogProps {
  open: boolean;
  onClose: () => void;
  onRejectWithdrawalRequest: (reason: string) => Promise<any>;
}

export default function WithdrawalRequestRejectDialog({
  open,
  onClose,
  onRejectWithdrawalRequest,
}: WithdrawalRequestRejectDialogProps) {
  const [reason, setReason] = useState(
    "شماره شبا با نام صاحب حساب مطابقت ندارد"
  );
  const [reasonText, setReasonText] = useState("");

  useEffect(() => {
    if (open) {
      setReason("شماره شبا با نام صاحب حساب مطابقت ندارد");
      setReasonText("");
    }
  }, [open]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog
      title="رد کردن درخواست برداشت"
      open={open}
      onClose={() => onClose()}
    >
      <div className={styles.DialogContent}>
        <div>انتخاب علت:</div>
        <div>
          <ContentSelect
            options={["شماره شبا با نام صاحب حساب مطابقت ندارد", "دیگر"]}
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
            onRejectWithdrawalRequest(
              reason === "دیگر" ? reasonText : reason
            ).finally(() => setIsSubmitting(false));
          }}
          style={{ minWidth: 100 }}
          loading={isSubmitting}
          disabled={isSubmitting || (reason === "دیگر" && !reasonText)}
        >
          رد کردن
        </Button>
      </BottomActions>
    </Dialog>
  );
}
