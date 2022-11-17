import styles from "./style.module.scss";
import { useState } from "react";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import {
  optionalValidate,
  useValidation,
  validateLength,
  validateNotEmpty,
  validatePasswordRepeat,
  validatePhoneNumber,
} from "@/shared/utils/validation";
import ErrorList from "@/shared/components/ErrorList";

interface AdminFormData {
  phoneNumber: string;
  name: string;
  password: string;
}

interface AdminFormProps {
  defaultValues?: Partial<AdminFormData>;
  isEdit?: boolean;
  onSave: (data: AdminFormData) => Promise<any>;
}

export default function AdminForm({
  defaultValues,
  isEdit,
  onSave,
}: AdminFormProps) {
  const [phoneNumber, setPhoneNumber] = useState(
    defaultValues?.phoneNumber || ""
  );
  const [name, setName] = useState(defaultValues?.name || "");
  const [password, setPassword] = useState(defaultValues?.password || "");
  const [retryPassword, setRetryPassword] = useState(
    defaultValues?.password || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      phoneNumber: [validatePhoneNumber()],
      name: [validateNotEmpty()],
      password: [
        optionalValidate({
          enabled: !isEdit || password !== "",
          validator: validateLength({ min: 8 }),
        }),
      ],
      retryPassword: [
        optionalValidate({
          enabled: !isEdit || password !== "",
          validator: validateLength({ min: 8 }),
        }),
        validatePasswordRepeat(password),
      ],
    },
    {
      phoneNumber,
      name,
      password,
      retryPassword,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>شماره موبایل:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "شماره موبایل" }}
            value={phoneNumber}
            onChange={(newValue) => setPhoneNumber(newValue.substring(0, 11))}
          />
          <ErrorList errors={formValidation.errors.phoneNumber} />
        </div>
        <div className={styles.Label}>نام کامل:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "نام کامل" }}
            value={name}
            onChange={setName}
          />
          <ErrorList errors={formValidation.errors.name} />
        </div>
        <div className={styles.Label}>رمز عبور:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{
              type: "password",
              placeholder: "رمز عبور",
            }}
            value={password}
            onChange={setPassword}
          />
          <ErrorList errors={formValidation.errors.password} />
        </div>
        <div className={styles.Label}>تکرار رمز عبور:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{
              type: "password",
              placeholder: "تکرار رمز عبور",
            }}
            value={retryPassword}
            onChange={setRetryPassword}
          />
          <ErrorList errors={formValidation.errors.retryPassword} />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              phoneNumber,
              name,
              password,
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
