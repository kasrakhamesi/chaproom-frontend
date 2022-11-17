import styles from "./style.module.scss";
import { useState } from "react";
import { BindingTariffs } from "@/shared/types";
import { useValidation, validateInt } from "@/shared/utils/validation";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";

interface BindingTariffsFormProps {
  defaultValues?: Partial<BindingTariffs>;
  onSave: (data: BindingTariffs) => Promise<any>;
}

export default function BindingTariffsForm({
  defaultValues,
  onSave,
}: BindingTariffsFormProps) {
  const [springNormalA4Price, setSpringNormalA4Price] = useState(
    defaultValues?.springNormal?.a4.toString() || ""
  );
  const [springNormalA5Price, setSpringNormalA5Price] = useState(
    defaultValues?.springNormal?.a5.toString() || ""
  );
  const [springNormalA3Price, setSpringNormalA3Price] = useState(
    defaultValues?.springNormal?.a3.toString() || ""
  );
  const [springPapcoA4Price, setSpringPapcoA4Price] = useState(
    defaultValues?.springPapco?.a4.toString() || ""
  );
  const [springPapcoA5Price, setSpringPapcoA5Price] = useState(
    defaultValues?.springPapco?.a5.toString() || ""
  );
  const [springPapcoA3Price, setSpringPapcoA3Price] = useState(
    defaultValues?.springPapco?.a3.toString() || ""
  );
  const [staplerPrice, setStaplerPrice] = useState(
    defaultValues?.stapler?.toString() || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      springNormalA4Price: [validateInt({ unsigned: true, min: 1 })],
      springNormalA3Price: [validateInt({ unsigned: true, min: 1 })],
      springNormalA5Price: [validateInt({ unsigned: true, min: 1 })],
      springPapcoA4Price: [validateInt({ unsigned: true, min: 1 })],
      springPapcoA3Price: [validateInt({ unsigned: true, min: 1 })],
      springPapcoA5Price: [validateInt({ unsigned: true, min: 1 })],
      staplerPrice: [validateInt({ unsigned: true, min: 1 })],
    },
    {
      springNormalA4Price,
      springNormalA3Price,
      springNormalA5Price,
      springPapcoA4Price,
      springPapcoA3Price,
      springPapcoA5Price,
      staplerPrice,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>فنر با طلق معمولی A4:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springNormalA4Price}
            onChange={setSpringNormalA4Price}
          />
        </div>
        <div className={styles.Label}>فنر با طلق معمولی A5:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springNormalA5Price}
            onChange={setSpringNormalA5Price}
          />
        </div>
        <div className={styles.Label}>فنر با طلق معمولی A3:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springNormalA3Price}
            onChange={setSpringNormalA3Price}
          />
        </div>
        <div className={styles.Label}>فنر با طلق پاپکو A4:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springPapcoA4Price}
            onChange={setSpringPapcoA4Price}
          />
        </div>
        <div className={styles.Label}>فنر با طلق پاپکو A5:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springPapcoA5Price}
            onChange={setSpringPapcoA5Price}
          />
        </div>
        <div className={styles.Label}>فنر با طلق پاپکو A3:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={springPapcoA3Price}
            onChange={setSpringPapcoA3Price}
          />
        </div>
        <div className={styles.Label}>منگنه:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ type: "number" }}
            suffix="تومان"
            value={staplerPrice}
            onChange={setStaplerPrice}
          />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              springNormal: {
                a4: parseInt(springNormalA4Price),
                a3: parseInt(springNormalA3Price),
                a5: parseInt(springNormalA5Price),
              },
              springPapco: {
                a4: parseInt(springPapcoA4Price),
                a3: parseInt(springPapcoA3Price),
                a5: parseInt(springPapcoA5Price),
              },
              stapler: parseInt(staplerPrice),
            }).finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={isSubmitting || !formValidation.isValid}
        >
          ذخیره
        </Button>
      </BottomActions>
    </>
  );
}
