import styles from "./style.module.scss";
import UploadImage from "@/shared/assets/images/upload.svg";
import { FormattedList, FormattedNumber } from "react-intl";
import { useRef, useState } from "react";

interface ImageUploadAreaProps {
  onSelectFile: (file: File) => void;
}

export default function ImageUploadArea({
  onSelectFile,
}: ImageUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [dragActive, setDragActive] = useState(false);

  return (
    <div className={styles.ImageUploadArea} data-drag-active={dragActive}>
      <input
        ref={inputRef}
        type="file"
        className={styles.Input}
        accept="image/*"
        onChange={() => {
          const input = inputRef.current;
          if (!input || !input.files || !input.files[0]) return;
          onSelectFile(input.files[0]);
          input.value = "";
        }}
      />
      <button
        className={styles.DropZone}
        onClick={() => inputRef.current?.click()}
        onDragEnter={() => setDragActive(true)}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();

          const dataTransfer = event.dataTransfer;
          Array.from(dataTransfer.files).forEach(onSelectFile);
          setDragActive(false);
        }}
      />
      <div className={styles.Image}>
        <UploadImage />
      </div>
      <div className={styles.Message}>
        فایل‌ها را اینجا بکشید و رها کنید یا بارگزاری کنید
      </div>
      <div className={styles.MobileMessage}>
        برای انتخاب فایل اینجا کلیک کنید
      </div>
    </div>
  );
}
