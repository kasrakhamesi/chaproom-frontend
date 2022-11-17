import styles from "./style.module.scss";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.ProgressBar}>
      <div style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }} />
    </div>
  );
}
