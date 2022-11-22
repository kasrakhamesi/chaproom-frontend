import Select from "@/shared/components/Select";
import styles from "./style.module.scss";

interface FilterSelectProps {
  placeholder?: string;
  options: Record<string, string>;
  value: any;
  onChange: (newValue: any) => void;
  maxWidth?: number;
  width?: number;
}

export default function FilterSelect({
  placeholder,
  options,
  value,
  onChange,
  maxWidth = 100,
  width,
}: FilterSelectProps) {
  return (
    <div className={styles.FilterSelect} style={{ maxWidth, width }}>
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        height={36}
      />
    </div>
  );
}
