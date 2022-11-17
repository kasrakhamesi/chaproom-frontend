import styles from "./style.module.scss";
import { useState } from "react";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Select from "@/shared/components/Select";

interface FinancialRecordData {
  userId: number;
  amount: number;
  description: string;
  type: "debtor" | "creditor";
}

interface FinancialRecordFormProps {
  defaultValues?: Partial<FinancialRecordData>;
  onSave: (data: FinancialRecordData) => void;
}

export default function FinancialRecordForm({
  defaultValues,
  onSave,
}: FinancialRecordFormProps) {
  const [userId, setUserId] = useState(defaultValues?.userId?.toString() || "");
  const [amount, setAmount] = useState(defaultValues?.amount?.toString() || "");
  const [description, setDescription] = useState(""); // TODO
  const [type, setType] = useState(defaultValues?.type || "creditor");

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>کاربر:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "کاربر" }}
            value={userId}
            onChange={setUserId}
          />
        </div>
        <div className={styles.Label}>مبلغ:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "مبلغ", type: "number" }}
            value={amount}
            onChange={setAmount}
          />
        </div>
        <div className={styles.Label}>نوع:</div>
        <div className={styles.Input}>
          <Select
            options={{ debtor: "بدهکار", creditor: "بستانکار" }}
            value={type}
            onChange={setType}
          />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={
            () => 0 /* onSave({ // TODO
            userId: parseInt(userId),
            amount: parseInt(amount),
          }) */
          }
          disabled={isNaN(parseInt(amount)) || parseInt(amount) < 0}
        >
          ذخیره
        </Button>
      </BottomActions>
    </>
  );
}
