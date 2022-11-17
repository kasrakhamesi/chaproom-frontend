import styles from "./style.module.scss";
import { PrintTariffs, PrintPrice } from "@/shared/types";
import { FormattedNumber } from "react-intl";

interface PrintTariffsTableProps {
  printTariffs: PrintTariffs;
  onEditPrintPrices: (
    printSize: "a4" | "a5" | "a3",
    printColor: "blackAndWhite" | "normalColor" | "fullColor"
  ) => void;
}

export default function PrintTariffsTable({
  printTariffs,
  onEditPrintPrices,
}: PrintTariffsTableProps) {
  return (
    <table className={styles.PrintTariffsTable}>
      <thead>
        <tr>
          <th>سایز</th>
          <th>رنگ</th>
          <th>یک رو</th>
          <th>دو رو</th>
          <th>یک رو گلاسه</th>
          <th>دو رو گلاسه</th>
          <th>ویرایش</th>
        </tr>
      </thead>
      <tbody>
        {(
          [
            ["a4", "blackAndWhite"],
            ["a4", "normalColor"],
            ["a4", "fullColor"],
            ["a5", "blackAndWhite"],
            ["a5", "normalColor"],
            ["a5", "fullColor"],
            ["a3", "blackAndWhite"],
            ["a3", "normalColor"],
            ["a3", "fullColor"],
          ] as [
            "a4" | "a5" | "a3",
            "blackAndWhite" | "normalColor" | "fullColor"
          ][]
        ).map(([size, color]) => (
          <tr key={`${size}-${color}`}>
            <td>
              <span className={styles.MobileLabel}>سایز:</span>
              {
                {
                  a4: "A4",
                  a5: "A5",
                  a3: "A3",
                }[size]
              }
            </td>
            <td>
              <span className={styles.MobileLabel}>رنگ:</span>
              {
                {
                  blackAndWhite: "سیاه و سفید",
                  normalColor: "رنگی معمولی",
                  fullColor: "تمام رنگی",
                }[color]
              }
            </td>
            <td>
              <span className={styles.MobileLabel}>یک رو:</span>
              <PrintPriceView
                printPrice={printTariffs[size][color]}
                printSide="singleSided"
              />
            </td>
            <td>
              <span className={styles.MobileLabel}>دو رو:</span>
              <PrintPriceView
                printPrice={printTariffs[size][color]}
                printSide="doubleSided"
              />
            </td>
            <td>
              <span className={styles.MobileLabel}>یک رو گلاسه:</span>
              <PrintPriceView
                printPrice={printTariffs[size][color]}
                printSide="singleSidedGlossy"
              />
            </td>
            <td>
              <span className={styles.MobileLabel}>دو رو گلاسه:</span>
              <PrintPriceView
                printPrice={printTariffs[size][color]}
                printSide="doubleSidedGlossy"
              />
            </td>
            <td>
              <button
                className={styles.EditButton}
                onClick={() => onEditPrintPrices(size, color)}
              >
                ویرایش
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface PrintPriceViewProps {
  printPrice: PrintPrice;
  printSide:
    | "singleSided"
    | "doubleSided"
    | "singleSidedGlossy"
    | "doubleSidedGlossy";
}

function PrintPriceView({ printPrice, printSide }: PrintPriceViewProps) {
  const breakpoints = [
    {
      at: 1,
      singleSided: printPrice.singleSided,
      doubleSided: printPrice.doubleSided,
      singleSidedGlossy: printPrice.singleSidedGlossy,
      doubleSidedGlossy: printPrice.doubleSidedGlossy,
    },
    ...printPrice.breakpoints,
  ];

  return (
    <div className={styles.PrintPricesView}>
      {breakpoints.map((breakpoint, index) => {
        const nextBreakpoints = breakpoints[index + 1];

        if (nextBreakpoints) {
          return (
            <span key={index}>
              <FormattedNumber value={breakpoint.at} /> -{" "}
              <FormattedNumber value={nextBreakpoints.at - 1} />:{" "}
              <FormattedNumber value={breakpoint[printSide]} /> تومان
            </span>
          );
        } else {
          return (
            <span key={index}>
              <FormattedNumber value={breakpoint.at} /> به بالا:{" "}
              <FormattedNumber value={breakpoint[printSide]} /> تومان
            </span>
          );
        }
      })}
    </div>
  );
}
