import styles from "./style.module.scss";
import { useState } from "react";
import { User } from "@/shared/types";
import TextInput from "@/shared/components/TextInput";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Select from "@/shared/components/Select";
import CheckBox from "@/shared/components/CheckBox";
import DatePicker from "@/shared/components/DatePicker";
import UserSelect from "@/admin/components/UserSelect";
import {
  optionalValidate,
  useValidation,
  validateInt,
  validateNotEmpty,
  validatePhoneNumber,
} from "@/shared/utils/validation";
import ErrorList from "@/shared/components/ErrorList";
import Radio from "@/shared/components/Radio";

interface DiscountFormData {
  active: boolean;
  code: string;
  description: string;
  user: User | null;
  phoneNumber: string | null;
  type: "fixed" | "percentage" | "page";
  value: number;
  usageLimit: number | null;
  expireDate: Date | null;
}

interface DiscountFormProps {
  defaultValues?: Partial<DiscountFormData>;
  onSave: (data: DiscountFormData) => Promise<any>;
}

export default function DiscountForm({
  defaultValues,
  onSave,
}: DiscountFormProps) {
  const [active, setActive] = useState(
    defaultValues && defaultValues.active !== undefined
      ? defaultValues.active
      : true
  );
  const [code, setCode] = useState(defaultValues?.code || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const [forOneUser, setForOneUser] = useState(
    defaultValues
      ? defaultValues.user !== null || defaultValues.phoneNumber !== null
      : false
  );
  const [userMode, setUserMode] = useState<"user" | "phoneNumber">(
    defaultValues?.phoneNumber !== null ? "phoneNumber" : "user"
  );
  const [user, setUser] = useState<User | null>(defaultValues?.user || null);
  const [phoneNumber, setPhoneNumber] = useState(
    defaultValues?.phoneNumber?.toString() || ""
  );
  const [type, setType] = useState(defaultValues?.type || "percentage");
  const [value, setValue] = useState(defaultValues?.value?.toString() || "");
  const [hasUsageLimit, setHasUsageLimit] = useState(
    defaultValues ? defaultValues.usageLimit !== null : false
  );
  const [usageLimit, setUsageLimit] = useState(
    defaultValues?.usageLimit?.toString() || ""
  );
  const [hasExpireDate, setHasExpireDate] = useState(
    defaultValues ? defaultValues.expireDate !== null : false
  );
  const [expireDate, setExpireDate] = useState<Date | null>(
    defaultValues?.expireDate || null
  );
  const [isExpireDateValid, setIsExpireDateValid] = useState(
    expireDate !== null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      code: [validateNotEmpty()],
      user: [
        optionalValidate({
          enabled: forOneUser && userMode === "user",
          validator: validateNotEmpty(),
        }),
      ],
      phoneNumber: [
        optionalValidate({
          enabled: forOneUser && userMode === "phoneNumber",
          validator: validatePhoneNumber(),
        }),
      ],
      value: [
        validateInt({
          unsigned: true,
          max: type === "percentage" ? 100 : undefined,
        }),
      ],
      usageLimit: [
        optionalValidate({
          enabled: hasUsageLimit,
          validator: validateInt({ unsigned: true, min: 1 }),
        }),
      ],
      isExpireDateValid: [
        optionalValidate({
          enabled: hasExpireDate,
          validator: validateNotEmpty({ message: "?????????? ??????????????" }),
        }),
      ],
    },
    {
      code,
      user,
      phoneNumber,
      value,
      usageLimit,
      isExpireDateValid,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.OptionalInput}>
          <div className={styles.CheckBoxWithLabel}>
            <CheckBox checked={active} onChange={setActive} /> ?????? ???? ?????????? ????????
            ??????
          </div>
        </div>
        <div className={styles.Separator} />
        <div className={styles.Label}>????:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "????" }}
            value={code}
            onChange={setCode}
          />
          <ErrorList errors={formValidation.errors.code} />
        </div>
        <div className={styles.Label}>??????????????:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{ placeholder: "??????????????" }}
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className={styles.Separator} />
        <div className={styles.OptionalInput}>
          <div className={styles.CheckBoxWithLabel}>
            <CheckBox checked={forOneUser} onChange={setForOneUser} /> ???????? ????
            ?????????? ??????
          </div>
          {forOneUser && (
            <div>
              <div className={styles.UserModeRadioList}>
                <div>
                  <Radio
                    checked={userMode === "user"}
                    onChecked={() => setUserMode("user")}
                  />
                  ??????????
                </div>
                <div>
                  <Radio
                    checked={userMode === "phoneNumber"}
                    onChecked={() => setUserMode("phoneNumber")}
                  />
                  ?????????? ????????????
                </div>
              </div>
              {userMode === "user" ? (
                <div className={styles.Input}>
                  <UserSelect value={user} onChange={setUser} />
                  <ErrorList errors={formValidation.errors.user} />
                </div>
              ) : (
                <div className={styles.Input}>
                  <TextInput
                    inputProps={{ type: "number", placeholder: "?????????? ????????????" }}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  <ErrorList errors={formValidation.errors.phoneNumber} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.Separator} />
        <div className={styles.Label}>?????? ??????????:</div>
        <div className={styles.Input}>
          <Select
            options={{
              fixed: "???????? ????????",
              percentage: "??????????",
              page: "???????????? ???? ??????????",
            }}
            value={type}
            onChange={setType}
          />
        </div>
        <div className={styles.Label}>?????????? ??????????:</div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{
              type: "number",
              placeholder: "?????????? ??????????",
            }}
            suffix={
              type === "fixed" ? "??????????" : type === "page" ? "????????" : "????????"
            }
            value={value}
            onChange={setValue}
          />
          <ErrorList errors={formValidation.errors.value} />
        </div>
        <div className={styles.Separator} />
        <div className={styles.OptionalInput}>
          <div className={styles.CheckBoxWithLabel}>
            <CheckBox checked={hasUsageLimit} onChange={setHasUsageLimit} />{" "}
            ?????????? ?????????????? ?????????????? ??????
          </div>
          {hasUsageLimit && (
            <div className={styles.Input}>
              <TextInput
                inputProps={{
                  type: "number",
                  placeholder: "?????????????? ??????????????",
                }}
                suffix="??????"
                value={usageLimit}
                onChange={setUsageLimit}
              />
              <ErrorList errors={formValidation.errors.usageLimit} />
            </div>
          )}
        </div>
        <div className={styles.Separator} />
        <div className={styles.OptionalInput}>
          <div className={styles.CheckBoxWithLabel}>
            <CheckBox checked={hasExpireDate} onChange={setHasExpireDate} />{" "}
            ?????????? ?????????? ?????????? ??????
          </div>
          {hasExpireDate && (
            <div>
              <div className={styles.Input}>
                <DatePicker
                  value={expireDate}
                  onChange={(newValue) => setExpireDate(newValue.toDate())}
                  setIsValid={setIsExpireDateValid}
                />
                <ErrorList errors={formValidation.errors.isExpireDateValid} />
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              active,
              code,
              description,
              user: forOneUser && userMode === "user" ? user : null,
              phoneNumber:
                forOneUser && userMode === "phoneNumber" ? phoneNumber : null,
              type,
              value: parseInt(value),
              usageLimit: hasUsageLimit ? parseInt(usageLimit) : null,
              expireDate: hasExpireDate
                ? new Date("2022-07-13T07:24:52")
                : null, // TODO
            }).finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={isSubmitting || !formValidation.isValid}
        >
          ??????????
        </Button>
      </BottomActions>
    </>
  );
}
