import styles from "./style.module.scss";
import DatePicker from "@/shared/components/DatePicker";
import DateIcon from "@/shared/assets/icons/date.svg";

interface FilterDateProps {
  min?: Date;
  max?: Date;
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  maxWidth?: number;
  width?: number;
  placeholder: string;
}

export default function FilterDate({
  min,
  max,
  value,
  onChange,
  maxWidth = 100,
  width,
  placeholder,
}: FilterDateProps) {
  return (
    <div className={styles.FilterDate} style={{ maxWidth, width }}>
      <DatePicker
        min={min}
        max={max}
        value={value}
        onChange={(moment) => onChange(moment.toDate())}
        inputHeight={36}
        inputProps={{ placeholder }}
        inputSuffix={
          <div className={styles.DateIcon}>
            <DateIcon />
          </div>
        }
        setIsValid={(isValid) => {
          if (!isValid) onChange(null);
        }}
      />
    </div>
  );
}
