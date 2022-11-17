import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import moment from "jalali-moment";
import Dialog from "@/shared/components/Dialog";
import TextInput from "@/shared/components/TextInput";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Button from "@/shared/components/Button";

interface WithdrawalRequestDoneDialogProps {
  open: boolean;
  onClose: () => void;
  onDoneWithdrawalRequest: (
    transactionDate: string,
    trackingCode: string
  ) => Promise<any>;
}

export default function WithdrawalRequestDoneDialog({
  open,
  onClose,
  onDoneWithdrawalRequest,
}: WithdrawalRequestDoneDialogProps) {
  const jaliliMoment = moment().locale("fa");
  const [transactionDateDay, setTransactionDateDay] = useState(
    jaliliMoment.day().toString()
  );
  const [transactionDateMonth, setTransactionDateMonth] = useState(
    jaliliMoment.month().toString()
  );
  const [transactionDateYear, setTransactionDateYear] = useState(
    jaliliMoment.year().toString()
  );
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    if (open) {
      const jaliliMoment = moment().locale("fa");
      setTransactionDateDay(jaliliMoment.day().toString());
      setTransactionDateMonth(jaliliMoment.month().toString());
      setTransactionDateYear(jaliliMoment.year().toString());
      setTrackingCode("");
    }
  }, [open]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog
      title="انجام دادن درخواست برداشت"
      open={open}
      onClose={() => onClose()}
    >
      <div className={styles.DialogContent}>
        <div>تاریخ انجام:</div>
        <div>
          <div className={styles.DateInput}>
            <TextInput
              inputProps={{ type: "number", placeholder: "روز" }}
              value={transactionDateDay}
              onChange={setTransactionDateDay}
            />
            <TextInput
              inputProps={{ type: "number", placeholder: "ماه" }}
              value={transactionDateMonth}
              onChange={setTransactionDateMonth}
            />
            <TextInput
              inputProps={{ type: "number", placeholder: "سال" }}
              value={transactionDateYear}
              onChange={setTransactionDateYear}
            />
          </div>
        </div>
        <div>کد پیگیری:</div>
        <div>
          <TextInput
            inputProps={{ type: "number", placeholder: "کد پیگیری" }}
            value={trackingCode}
            onChange={setTrackingCode}
          />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          onClick={() => {
            setIsSubmitting(true);
            onDoneWithdrawalRequest(
              [
                transactionDateDay,
                transactionDateMonth,
                transactionDateYear,
              ].join("-"),
              trackingCode
            ).finally(() => setIsSubmitting(false));
          }}
          style={{ minWidth: 100 }}
          loading={isSubmitting}
          disabled={
            isSubmitting ||
            isNaN(parseInt(transactionDateYear)) ||
            parseInt(transactionDateYear) <= 0 ||
            transactionDateYear.length !== 4 ||
            isNaN(parseInt(transactionDateMonth)) ||
            parseInt(transactionDateMonth) <= 0 ||
            parseInt(transactionDateMonth) > 12 ||
            isNaN(parseInt(transactionDateDay)) ||
            parseInt(transactionDateDay) <= 0 ||
            (parseInt(transactionDateMonth) > 6
              ? parseInt(transactionDateDay) > 30
              : parseInt(transactionDateDay) > 31)
          }
        >
          انجام دادن
        </Button>
      </BottomActions>
    </Dialog>
  );
}
