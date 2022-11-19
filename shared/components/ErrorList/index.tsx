import styles from "./style.module.scss";
import ErrorIcon from "@/admin/assets/icons/info.svg";

interface ErrorListProps {
  errors: string[];
}

export default function ErrorList({ errors }: ErrorListProps) {
  return (
    <div className={styles.ErrorList}>
      {errors.map((error, index) => (
        <div key={index}>
          <ErrorIcon />
          <div>{error}</div>
        </div>
      ))}
    </div>
  );
}
