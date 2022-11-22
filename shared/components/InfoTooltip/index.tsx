import styles from "./style.module.scss";
import InfoIcon from "@/admin/assets/icons/info.svg";
import Tooltip from "@/shared/components/Tooltip";

interface InfoTooltipProps {
  iconSize?: number;
  message: string;
}

export default function InfoTooltip({
  iconSize = 24,
  message,
}: InfoTooltipProps) {
  return (
    <Tooltip message={message}>
      <span className={styles.Info}>
        <InfoIcon width={iconSize} height={iconSize} />
      </span>
    </Tooltip>
  );
}
