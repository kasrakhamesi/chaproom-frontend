import styles from "./style.module.scss";
import { useState } from "react";
import { FormattedNumber } from "react-intl";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import {
  useValidation,
  validateNotEmpty,
  validateLength,
  validatePasswordRepeat,
  optionalValidate,
} from "@/shared/utils/validation";
import ErrorList from "@/shared/components/ErrorList";

interface ProfileFormData {
  phoneNumber: string;
  name: string;
  password: string;
}

interface ProfileFormProps {
  defaultValues?: Partial<ProfileFormData>;
  onSave: (data: ProfileFormData) => Promise<any>;
  inputsVarient?: "outlined" | "shadow";
}

export default function ProfileForm({
  defaultValues,
  onSave,
  inputsVarient,
}: ProfileFormProps) {
  const [phoneNumber] = useState(defaultValues?.phoneNumber || "");
  const [name, setName] = useState(defaultValues?.name || "");
  const [password, setPassword] = useState(defaultValues?.password || "");
  const [passwordRepeat, setPasswordRepeat] = useState(
    defaultValues?.password || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      name: [validateNotEmpty()],
      password: [
        optionalValidate({
          enabled: password !== "",
          validator: validateLength({ min: 8 }),
        }),
      ],
      passwordRepeat: [
        optionalValidate({
          enabled: password !== "",
          validator: validateLength({ min: 8 }),
        }),
        validatePasswordRepeat(password),
      ],
    },
    {
      name,
      password,
      passwordRepeat,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>شماره موبایل:</div>
        <div className={styles.Input}>
          <FormattedNumber
            value={parseInt(phoneNumber)}
            useGrouping={false}
            minimumIntegerDigits={11}
          />
        </div>
        <div className={styles.Label}>نام کامل:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "نام کامل" }}
            varient={inputsVarient}
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
            varient={inputsVarient}
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
            varient={inputsVarient}
            value={passwordRepeat}
            onChange={setPasswordRepeat}
          />
          <ErrorList errors={formValidation.errors.passwordRepeat} />
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
