import Select from "@/shared/components/Select";

interface ContentSelectProps {
  placeholder?: string;
  options: string[];
  value: string | null;
  onChange: (newValue: any) => void;
  varient?:
    | "outlined"
    | "shadow"
    | "inset-shadow"
    | "shadow-without-bg"
    | "inset-shadow-without-bg";
  readOnly?: boolean;
  height?: number;
}

export default function ContentSelect({
  placeholder,
  options,
  value,
  onChange,
  varient,
  readOnly,
  height,
}: ContentSelectProps) {
  const optionsObject: Record<string, string> = {};
  options.forEach((option) => (optionsObject[option] = option));

  return (
    <Select
      placeholder={placeholder}
      options={optionsObject}
      value={value}
      onChange={onChange}
      varient={varient}
      readOnly={readOnly}
      height={height}
    />
  );
}
