import styles from "./style.module.scss";
import { useState } from "react";
import { useValidation, validateInt } from "@/shared/utils/validation";
import Dialog from "@/shared/components/Dialog";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import Select from "@/shared/components/Select";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface IncreasBalanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => Promise<any>;
}

export default function IncreasBalanceDialog({
  open,
  onClose,
  onSubmit,
}: IncreasBalanceDialogProps) {
  const [amount, setAmount] = useState("");
  const [gate, setGate] = useState<string>("zarinPalGate");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      amount: [validateInt({ unsigned: true, min: 1 })],
    },
    {
      amount,
    }
  );

  return (
    <Dialog
      title="افزایش موجودی"
      open={open}
      onClose={onClose}
      fullScreenInMobile
      hideTitleInMobile
    >
      <div className={styles.DialogContent}>
        <div className={styles.MobileTitle}>افزایش موجودی</div>
        <div>
          <div className={styles.Label}>مبلغ مورد نظر:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{
                type: "number",
                placeholder: "مبلغ",
              }}
              varient="shadow-without-bg"
              value={amount}
              onChange={setAmount}
              suffix="تومان"
            />
            <ErrorList errors={formValidation.errors.amount} />
          </div>
          <div className={styles.Label}>انتخاب درگاه:</div>
          <div className={styles.Input}>
            <Select
              options={{
                zarinPalGate: "زرین پال",
              }}
              varient="inset-shadow-without-bg"
              value={gate}
              onChange={setGate}
              readOnly
            />
          </div>
        </div>
        <BottomActions>
          <Button
            varient="filled"
            style={{ minWidth: 100 }}
            onClick={() => {
              setIsSubmitting(true);
              onSubmit(parseInt(amount)).finally(() => setIsSubmitting(false));
            }}
            loading={isSubmitting}
            disabled={isSubmitting || !formValidation.isValid}
          >
            پرداخت
          </Button>
        </BottomActions>
      </div>
    </Dialog>
  );
}
