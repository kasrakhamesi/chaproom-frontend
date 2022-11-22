import styles from "./style.module.scss";
import { useState } from "react";
import TextArea from "@/shared/components/TextArea";
import ContentSelect from "@/shared/components/ContentSelect";
import TextInput from "@/shared/components/TextInput";
import iranProvincesAndCitiesJson from "@/shared/assets/json/iranProvincesAndCities.json";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import {
  useValidation,
  validateInt,
  validateNotEmpty,
  validatePhoneNumber,
} from "@/shared/utils/validation";
import ErrorList from "@/shared/components/ErrorList";

const iranProvincesAndCities: Record<string, string[]> =
  iranProvincesAndCitiesJson;

interface AddressFormData {
  label: string;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientPostalCode: string;
  recipientDeliveryProvince: string;
  recipientDeliveryCity: string;
  recipientDeliveryAddress: string;
}

interface AddressFormProps {
  defaultValues?: Partial<AddressFormData>;
  onCancel?: () => void;
  onSave: (data: AddressFormData) => Promise<any>;
  inputsVarient?: "outlined" | "shadow";
}

export default function AddressForm({
  defaultValues,
  onCancel,
  onSave,
  inputsVarient,
}: AddressFormProps) {
  const [label, setLabel] = useState(defaultValues?.label || "");
  const [recipientName, setRecipientName] = useState(
    defaultValues?.recipientName || ""
  );
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(
    defaultValues?.recipientPhoneNumber || ""
  );
  const [recipientPostalCode, setRecipientPostalCode] = useState(
    defaultValues?.recipientPostalCode || ""
  );
  const [recipientDeliveryProvince, setRecipientDeliveryProvince] = useState(
    defaultValues?.recipientDeliveryProvince || null
  );
  const [recipientDeliveryCity, setRecipientDeliveryCity] = useState(
    defaultValues?.recipientDeliveryCity || null
  );
  const [recipientDeliveryAddress, setRecipientDeliveryAddress] = useState(
    defaultValues?.recipientDeliveryAddress || ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValidation = useValidation(
    {
      label: [validateNotEmpty()],
      recipientName: [validateNotEmpty()],
      recipientPhoneNumber: [validatePhoneNumber()],
      recipientPostalCode: [validateInt({ length: 10, unsigned: true })],
      recipientDeliveryProvince: [validateNotEmpty()],
      recipientDeliveryCity: [validateNotEmpty()],
      recipientDeliveryAddress: [validateNotEmpty()],
    },
    {
      label,
      recipientName,
      recipientPhoneNumber,
      recipientPostalCode,
      recipientDeliveryProvince,
      recipientDeliveryCity,
      recipientDeliveryAddress,
    }
  );

  return (
    <>
      <div className={styles.Form}>
        <TextInput
          inputProps={{ placeholder: "عنوان" }}
          varient={inputsVarient}
          value={label}
          onChange={(newValue) => setLabel(newValue)}
        />
        <ErrorList errors={formValidation.errors.label} />
        <TextInput
          inputProps={{ placeholder: "نام تحویل گیرنده" }}
          varient={inputsVarient}
          value={recipientName}
          onChange={(newValue) => setRecipientName(newValue)}
        />
        <ErrorList errors={formValidation.errors.recipientName} />
        <TextInput
          inputProps={{
            type: "number",
            placeholder: "شماره موبایل تحویل گیرنده",
          }}
          varient={inputsVarient}
          value={recipientPhoneNumber}
          onChange={(newValue) =>
            setRecipientPhoneNumber(newValue.substring(0, 11))
          }
        />
        <ErrorList errors={formValidation.errors.recipientPhoneNumber} />
        <TextInput
          inputProps={{ type: "number", placeholder: "کد پستی" }}
          varient={inputsVarient}
          value={recipientPostalCode}
          onChange={(newValue) =>
            setRecipientPostalCode(newValue.substring(0, 10))
          }
        />
        <ErrorList errors={formValidation.errors.recipientPostalCode} />
        <div className={styles.ProvinceAndCitySelects}>
          <div>
            <ContentSelect
              placeholder="استان"
              options={Object.keys(iranProvincesAndCities)}
              varient={
                inputsVarient === "outlined" ? "outlined" : "inset-shadow"
              }
              value={recipientDeliveryProvince}
              onChange={(newValue) => {
                setRecipientDeliveryProvince(newValue);
                setRecipientDeliveryCity(null);
              }}
            />
            <ErrorList
              errors={formValidation.errors.recipientDeliveryProvince}
            />
          </div>
          <div>
            <ContentSelect
              placeholder="شهر"
              options={
                iranProvincesAndCities[recipientDeliveryProvince || ""] || []
              }
              varient={
                inputsVarient === "outlined" ? "outlined" : "inset-shadow"
              }
              value={recipientDeliveryCity}
              onChange={(newValue) => setRecipientDeliveryCity(newValue)}
              readOnly={
                !iranProvincesAndCities[recipientDeliveryProvince || ""]
              }
            />
            <ErrorList errors={formValidation.errors.recipientDeliveryCity} />
          </div>
        </div>
        <TextArea
          varient={inputsVarient}
          placeholder="نشانی"
          rows={4}
          value={recipientDeliveryAddress}
          onTextChange={(newText) => setRecipientDeliveryAddress(newText)}
        />
        <ErrorList errors={formValidation.errors.recipientDeliveryAddress} />
      </div>
      <BottomActions>
        {onCancel && <Button onClick={() => onCancel()}>بازگشت</Button>}
        <Button
          varient="filled"
          style={{ minWidth: 100 , width: 114 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              label,
              recipientName,
              recipientPhoneNumber,
              recipientPostalCode,
              recipientDeliveryProvince: recipientDeliveryProvince!,
              recipientDeliveryCity: recipientDeliveryCity!,
              recipientDeliveryAddress,
            }).finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={isSubmitting || !formValidation.isValid}
        >
          افزودن
        </Button>
      </BottomActions>
    </>
  );
}
