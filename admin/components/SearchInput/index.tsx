import styles from "./style.module.scss";
import { InputHTMLAttributes } from "react";
import SearchIcon from "@/admin/assets/icons/search.svg";
import TextInput from "@/shared/components/TextInput";

interface SearchInputProps {
  value: string;
  setValue: (newValue: string) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export default function SearchInput({
  value,
  setValue,
  inputProps,
}: SearchInputProps) {
  return (
    <div className={styles.Input}>
      <TextInput
        varient="outlined"
        value={value}
        onChange={setValue}
        inputProps={inputProps}
        suffix={
          <div className={styles.Icon}>
            <SearchIcon />
          </div>
        }
        boxProps={{
          style: {
            paddingLeft: 10,
          },
        }}
      />
    </div>
  );
}
