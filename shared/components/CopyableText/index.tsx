import styles from "./style.module.scss";
import { PropsWithChildren } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "@/shared/assets/icons/copy.svg";
import IconButton from "@/shared/components/IconButton";

interface CopyableTextProps {
  text: string;
}

export default function CopyableText({
  text,
  children,
}: PropsWithChildren<CopyableTextProps>) {
  return (
    <div className={styles.CopyableText}>
      <div className={styles.CopyIcon}>
        <CopyToClipboard text={text}>
          <IconButton varient="none" size={34}>
            <CopyIcon />
          </IconButton>
        </CopyToClipboard>
      </div>
      <div className={styles.Separator} />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
