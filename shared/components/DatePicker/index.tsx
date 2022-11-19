import styles from "./style.module.scss";
import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from "@floating-ui/react-dom-interactions";
import { FormattedNumber } from "react-intl";
import moment, { Moment } from "jalali-moment";
import PrevIcon from "@/shared/assets/icons/navigateBefore.svg";
import NextIcon from "@/shared/assets/icons/navigateNext.svg";
import TextInput from "@/shared/components/TextInput";

interface DatePickerProps {
  min?: Date | Moment;
  max?: Date | Moment;
  value: Date | Moment | null;
  onChange: (newValue: Moment) => void;
  inputFormat?: string;
  inputVarient?: "outlined" | "shadow";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  setIsValid?: (newValue: boolean) => void;
  inputHeight?: number;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
}

export default function DatePicker({
  min,
  max,
  value,
  onChange,
  inputFormat = "jYYYY/jMM/jDD",
  inputVarient,
  inputProps = { placeholder: "1400/01/01" },
  setIsValid,
  inputPrefix,
  inputSuffix,
  inputHeight,
}: DatePickerProps) {
  const momentValue = useMemo(
    () => (moment.isMoment(value) ? value : value ? moment(value) : null),
    [value]
  );
  const momentMin = useMemo(
    () => (moment.isMoment(min) ? min : min ? moment(min) : undefined),
    [min]
  );
  const momentMax = useMemo(
    () => (moment.isMoment(max) ? max : max ? moment(max) : undefined),
    [max]
  );
  const [inputValue, setInputValue] = useState(
    momentValue?.format(inputFormat) || ""
  );

  useEffect(
    () => setInputValue(momentValue?.format(inputFormat) || ""),
    [momentValue]
  );

  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      shift({ padding: 8 }),
      offset(8),
      flip({ padding: 8 }),
      size({
        apply({ elements, availableWidth }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${Math.min(availableWidth, 300)}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, {
      toggle: false,
    }),
    useFocus(context),
    useDismiss(context),
  ]);

  return (
    <>
      <TextInput
        ref={reference}
        varient={inputVarient}
        value={inputValue}
        inputProps={inputProps}
        onChange={(newValue) => {
          setInputValue(newValue);
          try {
            const newMomentValue = moment(newValue, inputFormat);
            setIsValid && setIsValid(newMomentValue.isValid());
            if (newMomentValue.isValid()) onChange(newMomentValue);
          } catch {}
        }}
        boxProps={getReferenceProps()}
        prefix={inputPrefix}
        suffix={inputSuffix}
        height={inputHeight}
      />
      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          {...getFloatingProps()}
        >
          <Calendar
            min={momentMin}
            max={momentMax}
            value={momentValue}
            onChange={(newValue) => {
              onChange(newValue);
              setInputValue(newValue.format(inputFormat));
              setIsValid && setIsValid(true);
            }}
          />
        </div>
      )}
    </>
  );
}

interface CalendarProps {
  min?: Moment;
  max?: Moment;
  value: Moment | null;
  onChange: (newValue: Moment) => void;
}

function Calendar({ min, max, value, onChange }: CalendarProps) {
  const [year, setYear] = useState<Moment>(value || moment());
  const [month, setMonth] = useState<Moment>(year.clone());

  useEffect(() => {
    if (value) {
      setYear(value);
      setMonth(value);
    }
  }, [value]);

  const [isMonthSelectorMode, setIsMonthSelectorMode] = useState(false);

  return (
    <div className={styles.Calendar}>
      {isMonthSelectorMode ? (
        <MonthPicker
          year={year}
          onPrevYear={() => setYear(year.clone().subtract(1, "jYear"))}
          onNextYear={() => setYear(year.clone().add(1, "jYear"))}
          selectedMonth={month}
          onSelectMonth={(month) => {
            setMonth(month);
            setIsMonthSelectorMode(false);
          }}
        />
      ) : (
        <DayPicker
          min={min}
          max={max}
          month={month}
          onClickOnMonth={() => setIsMonthSelectorMode(true)}
          onPrevMonth={() => setMonth(month.clone().subtract(1, "jMonth"))}
          onNextMonth={() => setMonth(month.clone().add(1, "jMonth"))}
          selectedDay={value}
          onSelectDay={onChange}
        />
      )}
    </div>
  );
}

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

interface MonthPickerProps {
  year: Moment;
  onPrevYear: () => void;
  onNextYear: () => void;
  selectedMonth: Moment | null;
  onSelectMonth: (month: Moment) => void;
}

function MonthPicker({
  year,
  onPrevYear,
  onNextYear,
  selectedMonth,
  onSelectMonth,
}: MonthPickerProps) {
  return (
    <div className={styles.MonthPicker}>
      <div className={styles.Heading}>
        <button title="سال قبل" onClick={() => onPrevYear()}>
          <NextIcon />
        </button>
        <span className={styles.title}>
          <FormattedNumber value={year.jYear()} useGrouping={false} />
        </span>
        <button title="سال بعد" onClick={() => onNextYear()}>
          <PrevIcon />
        </button>
      </div>
      <div className={styles.MonthList}>
        {months.map((month, index) => (
          <button
            key={index}
            data-selected={!!selectedMonth && selectedMonth.jMonth() === index}
            onClick={() =>
              onSelectMonth(year.clone().startOf("jYear").add(index, "jMonth"))
            }
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}

interface DayPickerProps {
  min?: Moment;
  max?: Moment;
  month: Moment;
  onPrevMonth: () => void;
  onClickOnMonth: () => void;
  onNextMonth: () => void;
  selectedDay: Moment | null;
  onSelectDay: (day: Moment) => void;
}

function DayPicker({
  min,
  max,
  month,
  onPrevMonth,
  onClickOnMonth,
  onNextMonth,
  selectedDay,
  onSelectDay,
}: DayPickerProps) {
  const days = useMemo(() => {
    const result = [];

    const current = month.clone().startOf("jMonth");
    const end = month.clone().endOf("jMonth");

    // Set start to the first day of week in the last month
    current.subtract((current.day() + 1) % 7, "days");

    // Set end to the last day of week in the next month
    end.add(6 - ((end.day() + 1) % 7), "days");

    while (current.isBefore(end)) {
      result.push(current.clone());
      current.add(1, "days");
    }

    return result;
  }, [month]);

  return (
    <div className={styles.DayPicker}>
      <div className={styles.Heading}>
        <button title="ماه قبل" onClick={() => onPrevMonth()}>
          <NextIcon />
        </button>
        <button onClick={() => onClickOnMonth()}>
          {months[month.jMonth()]}{" "}
          <FormattedNumber value={month.jYear()} useGrouping={false} />
        </button>
        <button title="ماه بعد" onClick={() => onNextMonth()}>
          <PrevIcon />
        </button>
      </div>
      <div className={styles.DaysOfWeek}>
        <div>ش</div>
        <div>ی</div>
        <div>د</div>
        <div>س</div>
        <div>چ</div>
        <div>پ</div>
        <div>ج</div>
      </div>
      <div className={styles.DayList}>
        {days.map((day) => (
          <button
            key={day.format("jYYYY-jMM-jDD")}
            disabled={
              (!!min && day.isBefore(min, "jDay")) ||
              (!!max && day.isAfter(max, "jDay"))
            }
            data-selected={!!selectedDay && selectedDay.isSame(day, "jD")}
            data-is-current-month={day.isSame(month, "jMonth")}
            onClick={() => onSelectDay(day)}
          >
            <FormattedNumber value={day.jDate()} />
          </button>
        ))}
      </div>
    </div>
  );
}
