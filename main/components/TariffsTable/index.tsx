import styles from "./style.module.scss";
import { FormattedNumber } from "react-intl";
import { PrintPrice, Tariffs } from "@/shared/types";
import Tabs from "@/main/components/Dashboard/Tabs";
import { useRef, useState } from "react";

interface TariffsTableProps {
  tariffs: Tariffs;
  section: "a4" | "a5" | "a3" | "binding";
}

export default function TariffsTable({ tariffs, section }: TariffsTableProps) {
  const [printColor, setPrintColor] = useState<
    "blackAndWhite" | "normalColor" | "fullColor"
  >("blackAndWhite");
  const [bindingType, setBindingType] = useState<
    "springNormal" | "springPapco" | "stapler"
  >("springNormal");

  return (
    <>
      <Tabs
        currentTabId={section !== "binding" ? printColor : bindingType}
        setCurrentTabId={section !== "binding" ? setPrintColor : setBindingType}
        tabs={
          section !== "binding"
            ? [
                {
                  id: "blackAndWhite",
                  label: "سیاه و سفید",
                },
                {
                  id: "normalColor",
                  label: "رنگی معمولی",
                },
                {
                  id: "fullColor",
                  label: "تمام رنگی",
                },
              ]
            : [
                {
                  id: "springNormal",
                  label: "فنر با طلق معمولی",
                },
                {
                  id: "springPapco",
                  label: "فنر با طلق پاپکو",
                },
                {
                  id: "stapler",
                  label: "منگنه",
                },
              ]
        }
      />
      {section !== "binding" ? (
        <PrintPriceView printPrice={tariffs.print[section][printColor]} />
      ) : (
        <table className={styles.TariffsTable}>
          <thead>
            <tr>
              <th>سایز</th>
              <th>قیمت</th>
            </tr>
          </thead>
          <tbody>
            {bindingType !== "stapler" ? (
              <>
                <tr>
                  <td>A4</td>
                  <td>
                    <FormattedNumber
                      value={tariffs.binding[bindingType].a4}
                      useGrouping={false}
                    />{" "}
                    تومان
                  </td>
                </tr>
                <tr>
                  <td>A5</td>
                  <td>
                    <FormattedNumber
                      value={tariffs.binding[bindingType].a5}
                      useGrouping={false}
                    />{" "}
                    تومان
                  </td>
                </tr>
                <tr>
                  <td>A3</td>
                  <td>
                    <FormattedNumber
                      value={tariffs.binding[bindingType].a3}
                      useGrouping={false}
                    />{" "}
                    تومان
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td>تمام سایز ها</td>
                <td>
                  <FormattedNumber
                    value={tariffs.binding[bindingType]}
                    useGrouping={false}
                  />{" "}
                  تومان
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

interface PrintPriceViewProps {
  printPrice: PrintPrice;
}

function PrintPriceView({ printPrice }: PrintPriceViewProps) {
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

  const data = useRef(() => {});

  return (
    <table className={styles.TariffsTable}>
      <thead>
        <tr>
          <th>تعداد برگ</th>
          <th>قیمت یک رو</th>
          <th>قیمت دو رو</th>
        </tr>
      </thead>
      <tbody>
        {breakpoints.map((breakpoint, index) => {
          const nextBreakpoints = breakpoints[index + 1];

          return (
            <tr key={index}>
              <td>
                {nextBreakpoints ? (
                  <>
                    <FormattedNumber
                      value={breakpoint.at}
                      useGrouping={false}
                    />
                    -
                    <FormattedNumber
                      value={nextBreakpoints.at - 1}
                      useGrouping={false}
                    />
                  </>
                ) : (
                  <>
                    <FormattedNumber value={breakpoint.at} /> به بالا
                  </>
                )}
              </td>
              <td>
                <FormattedNumber
                  value={breakpoint.singleSided}
                  useGrouping={false}
                />{" "}
                تومان
              </td>
              <td>
                <FormattedNumber
                  value={breakpoint.doubleSided}
                  useGrouping={false}
                />{" "}
                تومان
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
