import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { PrintPrice } from "@/shared/types";
import { useValidation, validateInt } from "@/shared/utils/validation";
import EditIcon from "@/shared/assets/icons/edit.svg";
import CheckIcon from "@/shared/assets/icons/check.svg";
import DeletetIcon from "@/shared/assets/icons/delete.svg";
import AddIcon from "@/shared/assets/icons/add.svg";
import TextInput from "@/shared/components/TextInput";
import ErrorList from "@/shared/components/ErrorList";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";

interface PrintPricesFormProps {
  printSize: "a4" | "a5" | "a3";
  printColor: "blackAndWhite" | "normalColor" | "fullColor";
  defaultValues?: Partial<PrintPrice>;
  onSave: (data: PrintPrice) => Promise<any>;
}

export default function PrintPricesForm({
  printSize,
  printColor,
  defaultValues,
  onSave,
}: PrintPricesFormProps) {
  const nextId = useRef(0);
  const [breakpoints, setBreakpoints] = useState([
    {
      id: nextId.current++,
      at: "1",
      singleSided: defaultValues?.singleSided?.toString() || "",
      doubleSided: defaultValues?.doubleSided?.toString() || "",
      singleSidedGlossy: defaultValues?.singleSidedGlossy?.toString() || "",
      doubleSidedGlossy: defaultValues?.doubleSidedGlossy?.toString() || "",
    },
    ...(defaultValues?.breakpoints?.map((breakpoint) => ({
      id: nextId.current++,
      at: breakpoint.at.toString(),
      singleSided: breakpoint.singleSided.toString(),
      doubleSided: breakpoint.doubleSided.toString(),
      singleSidedGlossy: breakpoint.singleSidedGlossy.toString(),
      doubleSidedGlossy: breakpoint.doubleSidedGlossy.toString(),
    })) || []),
  ]);
  const existingBreakpointsAt = useRef(
    breakpoints.map((breakpoint) => breakpoint.at)
  );
  const [breakpointsValidation, setBreakpointsValidation] = useState<
    Record<number, boolean>
  >({});
  const [editingAtProperty, setEditingAtProperty] = useState<number[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.Label}>سایز:</div>
        <div className={styles.Input}>
          <TextInput
            value={
              {
                a4: "A4",
                a5: "A5",
                a3: "A3",
              }[printSize]
            }
            readOnly
          />
        </div>
        <div className={styles.Label}>رنگ:</div>
        <div className={styles.Input}>
          <TextInput
            value={
              {
                blackAndWhite: "سیاه و سفید",
                normalColor: "رنگی معمولی",
                fullColor: "تمام رنگی",
              }[printColor]
            }
            readOnly
          />
        </div>
        <div className={styles.Label}>نقاط شکست:</div>
        <div className={styles.BreakpointsInput}>
          {breakpoints.map((breakpoint) => (
            <BreakpointInput
              key={breakpoint.id}
              breakpoint={breakpoint}
              onChange={(property, newValue) =>
                setBreakpoints(
                  breakpoints.map((item) =>
                    item.id === breakpoint.id
                      ? {
                          ...breakpoint,
                          [property]: newValue,
                        }
                      : item
                  )
                )
              }
              isBaseBreakpoint={breakpoint.id === 0}
              isEditingAtProperty={editingAtProperty.includes(breakpoint.id)}
              isAtPropertyExist={existingBreakpointsAt.current.includes(
                breakpoint.at
              )}
              onStartEditingAtProperty={() => {
                existingBreakpointsAt.current =
                  existingBreakpointsAt.current.filter(
                    (item) => item !== breakpoint.at
                  );
                setEditingAtProperty([...editingAtProperty, breakpoint.id]);
              }}
              onEndEditingAtProperty={() => {
                setEditingAtProperty(
                  editingAtProperty.filter((item) => item !== breakpoint.id)
                );
                existingBreakpointsAt.current.push(breakpoint.at);
                setBreakpoints(
                  breakpoints.sort((a, b) => parseInt(a.at) - parseInt(b.at))
                );
              }}
              onDelete={() =>
                setBreakpoints(
                  breakpoints.filter((item) => item.id !== breakpoint.id)
                )
              }
              setIsValid={(newValue) =>
                setBreakpointsValidation({
                  ...breakpointsValidation,
                  [breakpoint.id]: newValue,
                })
              }
            />
          ))}
          <div className={styles.Footer}>
            <button
              className={styles.AddButton}
              onClick={() => {
                setBreakpoints([
                  ...breakpoints,
                  {
                    id: nextId.current++,
                    at: "",
                    singleSided: "",
                    doubleSided: "",
                    singleSidedGlossy: "",
                    doubleSidedGlossy: "",
                  },
                ]);
              }}
            >
              اضافه کردن <AddIcon />
            </button>
          </div>
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              singleSided: parseInt(breakpoints[0].singleSided),
              doubleSided: parseInt(breakpoints[0].doubleSided),
              singleSidedGlossy: parseInt(breakpoints[0].singleSidedGlossy),
              doubleSidedGlossy: parseInt(breakpoints[0].doubleSidedGlossy),
              breakpoints: breakpoints.slice(1).map((breakpoint) => ({
                at: parseInt(breakpoint.at),
                singleSided: parseInt(breakpoint.singleSided),
                doubleSided: parseInt(breakpoint.doubleSided),
                singleSidedGlossy: parseInt(breakpoint.singleSidedGlossy),
                doubleSidedGlossy: parseInt(breakpoint.doubleSidedGlossy),
              })),
            }).finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={
            isSubmitting ||
            editingAtProperty.length > 0 ||
            Object.values(breakpointsValidation).filter(
              (breakpointValidation) => !breakpointValidation
            ).length > 0
          }
        >
          ذخیره
        </Button>
      </BottomActions>
    </>
  );
}

interface BreakpointInputProps {
  breakpoint: {
    at: string;
    singleSided: string;
    doubleSided: string;
    singleSidedGlossy: string;
    doubleSidedGlossy: string;
  };
  onChange: (
    property:
      | "at"
      | "singleSided"
      | "doubleSided"
      | "singleSidedGlossy"
      | "doubleSidedGlossy",
    newValue: string
  ) => void;
  isBaseBreakpoint: boolean;
  isEditingAtProperty: boolean;
  isAtPropertyExist: boolean;
  onStartEditingAtProperty: () => void;
  onEndEditingAtProperty: () => void;
  onDelete: () => void;
  setIsValid: (newValue: boolean) => void;
}

function BreakpointInput({
  breakpoint,
  onChange,
  isBaseBreakpoint,
  isEditingAtProperty,
  isAtPropertyExist,
  onStartEditingAtProperty,
  onEndEditingAtProperty,
  onDelete,
  setIsValid,
}: BreakpointInputProps) {
  const formValidation = useValidation(
    {
      at: [
        validateInt({ unsigned: true, min: 1 }),
        () => {
          if (isAtPropertyExist) return "این مقدار از قبل وجود دارد";
        },
      ],
      singleSided: [validateInt({ unsigned: true, min: 1 })],
      doubleSided: [validateInt({ unsigned: true, min: 1 })],
      singleSidedGlossy: [validateInt({ unsigned: true, min: 1 })],
      doubleSidedGlossy: [validateInt({ unsigned: true, min: 1 })],
    },
    {
      at: breakpoint.at,
      singleSided: breakpoint.singleSided,
      doubleSided: breakpoint.doubleSided,
      singleSidedGlossy: breakpoint.singleSidedGlossy,
      doubleSidedGlossy: breakpoint.doubleSidedGlossy,
    }
  );

  useEffect(() => setIsValid(formValidation.isValid), [formValidation.isValid]);

  return (
    <div className={styles.BreakpointInput}>
      <div>
        <div className={styles.Input}>
          <TextInput
            inputProps={{
              type: "number",
            }}
            value={breakpoint.at}
            onChange={(newValue) => onChange("at", newValue)}
            readOnly={!isEditingAtProperty}
            prefix={<div className={styles.Label}>از صفحه:</div>}
            suffix={
              !isBaseBreakpoint &&
              (!isEditingAtProperty ? (
                <div className={styles.EditAtButton}>
                  <IconButton
                    size={32}
                    onClick={() => onStartEditingAtProperty()}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              ) : (
                <div className={styles.DoneEditAtButton}>
                  <IconButton
                    size={32}
                    disabled={
                      isNaN(parseInt(breakpoint.at)) ||
                      parseInt(breakpoint.at) <= 0 ||
                      isAtPropertyExist
                    }
                    onClick={() => onEndEditingAtProperty()}
                  >
                    <CheckIcon />
                  </IconButton>
                </div>
              ))
            }
          />
          <ErrorList errors={formValidation.errors.at} />
        </div>
        {!isBaseBreakpoint && (
          <button className={styles.DeleteButton} onClick={onDelete}>
            حذف کردن <DeletetIcon />
          </button>
        )}
      </div>
      <div className={styles.Input}>
        <TextInput
          inputProps={{
            type: "number",
          }}
          value={breakpoint.singleSided}
          onChange={(newValue) => onChange("singleSided", newValue)}
          prefix={<div className={styles.Label}>دو رو:</div>}
          suffix={<div className={styles.Label}>تومان</div>}
        />
        <ErrorList errors={formValidation.errors.singleSided} />
      </div>
      <div className={styles.Input}>
        <TextInput
          inputProps={{
            type: "number",
          }}
          value={breakpoint.doubleSided}
          onChange={(newValue) => onChange("doubleSided", newValue)}
          prefix={<div className={styles.Label}>دو رو:</div>}
          suffix={<div className={styles.Label}>تومان</div>}
        />
        <ErrorList errors={formValidation.errors.doubleSided} />
      </div>
      <div className={styles.Input}>
        <TextInput
          inputProps={{
            type: "number",
          }}
          value={breakpoint.singleSidedGlossy}
          onChange={(newValue) => onChange("singleSidedGlossy", newValue)}
          prefix={<div className={styles.Label}>یک رو گلاسه:</div>}
          suffix={<div className={styles.Label}>تومان</div>}
        />
        <ErrorList errors={formValidation.errors.singleSidedGlossy} />
      </div>
      <div className={styles.Input}>
        <TextInput
          inputProps={{
            type: "number",
          }}
          value={breakpoint.doubleSidedGlossy}
          onChange={(newValue) => onChange("doubleSidedGlossy", newValue)}
          prefix={<div className={styles.Label}>دو رو گلاسه:</div>}
          suffix={<div className={styles.Label}>تومان</div>}
        />
        <ErrorList errors={formValidation.errors.doubleSidedGlossy} />
      </div>
    </div>
  );
}
