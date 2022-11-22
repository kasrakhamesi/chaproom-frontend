import styles from "./style.module.scss";
import Select from "@/shared/components/Select";
import { useIntl } from "react-intl";

interface TableControlsProps {
  itemPerPage: number;
  setItemPerPage: (newValue: number) => void;
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
  totalCount: number;
}

export default function TableControls({
  itemPerPage,
  setItemPerPage,
  currentPage,
  setCurrentPage,
  totalCount,
}: TableControlsProps) {
  const intl = useIntl();

  return (
    <div className={styles.Container}>
      <div className={styles.ItemPerPageSelect}>
        <Select
          value={itemPerPage.toString()}
          onChange={(newValue) => setItemPerPage(parseInt(newValue))}
          options={{
            "10": intl.formatNumber(10),
            "20": intl.formatNumber(20),
            "50": intl.formatNumber(50),
            "100": intl.formatNumber(100),
            "200": intl.formatNumber(200),
          }}
        />
      </div>
    </div>
  );
}
