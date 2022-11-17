import styles from "./style.module.scss";
import { FormattedNumber, useIntl } from "react-intl";
import { PrintFolder } from "@/shared/types";
import EditIcon from "@/shared/assets/icons/edit.svg";
import DeletetIcon from "@/shared/assets/icons/delete.svg";

interface PrintFolderListProps {
  printFolders: PrintFolder[];
  onEditPrintFolder: (printFolderId: number) => void;
  onDeletePrintFolder: (printFolderId: number) => void;
}

export default function PrintFolderList({
  printFolders,
  onEditPrintFolder,
  onDeletePrintFolder,
}: PrintFolderListProps) {
  const intl = useIntl();

  return (
    <div className={styles.PrintFolderList}>
      {printFolders.map((printFolder, index) => (
        <div className={styles.PrintFolder} key={printFolder.id}>
          <div className={styles.Header}>
            <div className={styles.Label}>
              <span>پوشه {index + 1}</span>
              <span>
                (<FormattedNumber value={printFolder.amount} /> تومان)
              </span>
            </div>
            <div className={styles.Actions}>
              <button
                className={styles.EditButton}
                onClick={() => onEditPrintFolder(printFolder.id)}
              >
                <EditIcon />
              </button>
              <button
                className={styles.DeleteButton}
                onClick={() => onDeletePrintFolder(printFolder.id)}
              >
                <DeletetIcon />
              </button>
            </div>
          </div>
          <div>
            فایلها:{" "}
            {printFolder.printFiles
              .map((printFile) => printFile.name)
              .join(" / ")}
          </div>
          <div>
            خلاصه:{" "}
            {[
              {
                blackAndWhite: "سیاه و سفید",
                normalColor: "رنگی معمولی",
                fullColor: "تمام رنگی",
              }[printFolder.printColor],
              { a4: "A4", a5: "A5", a3: "A3" }[printFolder.printSize],
              { singleSided: "یک رو", doubleSided: "دو رو" }[
                printFolder.printSide
              ],
              ...(printFolder.bindingOptions === null
                ? []
                : [
                    "صحافی",
                    {
                      springNormal: "فنر با طلق معمولی",
                      springPapco: "فنر با طلق پاپکو",
                      stapler: "منگنه",
                    }[printFolder.bindingOptions.bindingType],
                    printFolder.bindingOptions.bindingMethod !== "countOfFiles"
                      ? {
                          allFilesTogether: "هر فایل جدا",
                          eachFileSeparated: "همه فایل ها با هم",
                        }[printFolder.bindingOptions.bindingMethod]
                      : `${intl.formatNumber(
                          printFolder.bindingOptions.countOfFiles || 0
                        )} فایل`,
                    {
                      colorful: "جلد رنگی",
                      blackAndWhite: "جلد سیاه و سفید",
                    }[printFolder.bindingOptions.coverColor],
                  ]),
              `${intl.formatNumber(printFolder.countOfCopies || 1)} نسخه`,
            ].join(" / ")}
          </div>
          {printFolder.description && (
            <div>توضیحات: {printFolder.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
