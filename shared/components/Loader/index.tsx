import styles from "./style.module.scss";
import LoaderImage from "@/shared/assets/images/loader.svg";

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <LoaderImage />
    </div>
  );
}
