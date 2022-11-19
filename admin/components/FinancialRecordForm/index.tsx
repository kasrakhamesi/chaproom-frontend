import styles from "./style.module.scss";
import { useState } from "react";
import { User } from "@/shared/types";
import {
  optionalValidate,
  useValidation,
  validateInt,
  validateNotEmpty,
} from "@/shared/utils/validation";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Select from "@/shared/components/Select";
import UserSelect from "@/admin/components/UserSelect";
import Radio from "@/shared/components/Radio";
import ErrorList from "@/shared/components/ErrorList";

interface FinancialRecordData {
  user: User;
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
  const [user, setUser] = useState<User | null>(defaultValues?.user || null);
  const [amount, setAmount] = useState(defaultValues?.amount?.toString() || "");
  const [type, setType] = useState(defaultValues?.type || "creditor");
  const [descriptionPreset, setDescriptionPreset] = useState<
    "1" | "2" | "other"
  >(
    typeof defaultValues?.description === "string"
      ? defaultValues.description === "افزایش موجودی کیف پول"
        ? "1"
        : defaultValues.description.startsWith(
            "واریز به حساب کاربر بابت برداشت موجودی. کد پیکیری: "
          )
        ? "2"
        : "other"
      : "1"
  );
  const [trackingCode, setTrackingCode] = useState(
    typeof defaultValues?.description === "string" &&
      defaultValues.description.startsWith(
        "واریز به حساب کاربر بابت برداشت موجودی. کد پیکیری: "
      )
      ? defaultValues.description.substring(
          "واریز به حساب کاربر بابت برداشت موجودی. کد پیکیری: ".length
        )
      : ""
  );
  const [otherDescription, setOtherDescription] = useState(
    typeof defaultValues?.description === "string" &&
      defaultValues.description !== "افزایش موجودی کیف پول" &&
      !defaultValues.description.startsWith(
        "واریز به حساب کاربر بابت برداشت موجودی. کد پیکیری: "
      )
      ? defaultValues.description
      : ""
  );

  const formValidation = useValidation(
    {
      user: [validateNotEmpty()],
      amount: [validateInt({ unsigned: true, min: 1 })],
      trackingCode: [
        optionalValidate({
          enabled: descriptionPreset === "2",
          validator: validateInt({ unsigned: true }),
        }),
      ],
      otherDescription: [
        optionalValidate({
          enabled: descriptionPreset === "other",
          validator: validateNotEmpty(),
        }),
      ],
    },
    {
      user,
      amount,
      trackingCode,
      otherDescription,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>کاربر:</div>
        <div className={styles.Input}>
          <UserSelect value={user} onChange={setUser} />
          <ErrorList errors={formValidation.errors.user} />
        </div>
        <div className={styles.Label}>نوع سند:</div>
        <div className={styles.Input}>
          <Select
            options={{ debtor: "بدهکار", creditor: "بستانکار" }}
            value={type}
            onChange={setType}
          />
        </div>
        <div className={styles.Label}>مبلغ:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "مبلغ", type: "number" }}
            value={amount}
            onChange={setAmount}
            suffix="تومان"
          />
          <ErrorList errors={formValidation.errors.amount} />
        </div>
        <div className={styles.Label}>جزییات:</div>
        <div className={styles.Input}>
          <div className={styles.Details}>
            <div>
              <Radio
                checked={descriptionPreset === "1"}
                onChecked={() => setDescriptionPreset("1")}
              />
              افزایش موجودی کیف پول
            </div>
            <div>
              <Radio
                checked={descriptionPreset === "2"}
                onChecked={() => setDescriptionPreset("2")}
              />
              <div>
                <div>واریز به حساب کاربر بابت برداشت موجودی</div>
                <div>
                  <TextInput
                    inputProps={{
                      type: "number",
                      placeholder: "کد پیگیری",
                    }}
                    value={trackingCode}
                    onChange={setTrackingCode}
                  />
                  <ErrorList errors={formValidation.errors.trackingCode} />
                </div>
              </div>
            </div>
            <div>
              <Radio
                checked={descriptionPreset === "other"}
                onChecked={() => setDescriptionPreset("other")}
              />
              <div>
                <div>سایر</div>
                <div>
                  <TextInput
                    inputProps={{
                      placeholder: "توضیح",
                    }}
                    value={otherDescription}
                    onChange={setOtherDescription}
                  />
                  <ErrorList errors={formValidation.errors.otherDescription} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() =>
            onSave({
              user: user!,
              type: type,
              amount: parseInt(amount),
              description:
                descriptionPreset === "1"
                  ? "افزایش موجودی کیف پول"
                  : descriptionPreset === "2"
                  ? `واریز به حساب کاربر بابت برداشت موجودی. کد پیکیری: ${trackingCode}`
                  : otherDescription,
            })
          }
          disabled={!formValidation.isValid}
        >
          ذخیره
        </Button>
      </BottomActions>
    </>
  );
}
