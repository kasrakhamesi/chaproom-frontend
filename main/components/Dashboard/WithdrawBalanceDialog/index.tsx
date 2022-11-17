import styles from "./style.module.scss";
import { useState } from "react";
import {
  useValidation,
  validateInt,
  validateLength,
  validateNotEmpty,
} from "@/shared/utils/validation";
import Dialog from "@/shared/components/Dialog";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface WithdrawBalanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (accountHolderName: string, iban: string) => Promise<any>;
}

export default function WithdrawBalanceDialog({
  open,
  onClose,
  onSubmit,
}: WithdrawBalanceDialogProps) {
  const [iban, setIban] = useState("");
  const [accountHolderName, setAccountHolder] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      iban: [validateLength({ length: 24 }), validateInt({ unsigned: true })],
      accountHolderName: [validateNotEmpty()],
    },
    {
      iban,
      accountHolderName,
    }
  );

  return (
    <Dialog
      title="برداشت موجودی"
      open={open}
      onClose={onClose}
      fullScreenInMobile
      hideTitleInMobile
    >
      <div className={styles.DialogContent}>
        <div className={styles.MobileTitle}>برداشت موجودی</div>
        <div>
          <div className={styles.Label}>شماره شبا:</div>
          <div className={styles.Input}>
            <TextInput
              prefix="IR"
              boxProps={{ dir: "ltr" }}
              inputProps={{
                type: "number",
                placeholder: "شماره شبا",
              }}
              varient="shadow-without-bg"
              value={iban}
              onChange={(newValue) => setIban(newValue.substring(0, 24))}
            />
            <ErrorList errors={formValidation.errors.iban} />
          </div>
          <div className={styles.Label}>نام صاحب حساب:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "صاحب حساب" }}
              varient="shadow-without-bg"
              value={accountHolderName}
              onChange={setAccountHolder}
            />
            <ErrorList errors={formValidation.errors.accountHolderName} />
          </div>
        </div>
        <BottomActions>
          <Button
            varient="filled"
            style={{ minWidth: 100 }}
            onClick={() => {
              setIsSubmitting(true);
              onSubmit(accountHolderName, iban).finally(() =>
                setIsSubmitting(false)
              );
            }}
            loading={isSubmitting}
            disabled={isSubmitting || !formValidation.isValid}
          >
            ثبت درخواست
          </Button>
        </BottomActions>
      </div>
    </Dialog>
  );
}
