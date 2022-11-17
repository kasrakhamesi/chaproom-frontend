import styles from "./style.module.scss";
import { ReactElement, useState } from "react";
import { FormattedNumber } from "react-intl";
import Head from "next/head";
import { Tariffs } from "@/shared/types";
import { getTariffs } from "@/main/api";
import Layout from "@/main/components/Layout";
import DataLoader from "@/shared/components/DataLoader";
import PrintPriceCalculator from "@/main/components/PrintPriceCalculator";
import SwitchButtons from "@/shared/components/SwitchButtons";
import Switch from "@/shared/components/Switch";
import TariffsTable from "@/main/components/TariffsTable";

export default function TariffsPage() {
  const [tariffsTableSection, setTariffsTableSection] = useState<
    "a4" | "a5" | "a3" | "binding"
  >("a4");
  const [data, setData] = useState<Tariffs>({
    print: {},
    binding: {},
  } as Tariffs);

  return (
    <DataLoader load={() => getTariffs()} setData={setData}>
      <Head>
        <title>تماس با ما</title>
      </Head>
      <div className={styles.Container}>
        <div>
          <h1>سفارش پرینت</h1>
          <PrintPriceCalculator printTariffs={data.print} />
        </div>
        <div>
          <h1>تعرفه پرینت</h1>
          <div>
            <div>
              <SwitchButtons
                options={[
                  {
                    id: "a4",
                    label: "سایز A4",
                  },
                  {
                    id: "a5",
                    label: "سایز A5",
                  },
                  {
                    id: "a3",
                    label: "سایز A3",
                  },
                  {
                    id: "binding",
                    label: "صحافی",
                  },
                ]}
                value={tariffsTableSection}
                onChange={setTariffsTableSection}
              />
            </div>
            <Switch
              currentViewId={tariffsTableSection}
              views={[
                {
                  id: "a4",
                  content: <TariffsTable tariffs={data} section="a4" />,
                },
                {
                  id: "a5",
                  content: <TariffsTable tariffs={data} section="a5" />,
                },
                {
                  id: "a3",
                  content: <TariffsTable tariffs={data} section="a3" />,
                },
                {
                  id: "binding",
                  content: <TariffsTable tariffs={data} section="binding" />,
                },
              ]}
            />
            <div>
              <p>توضیحات:</p>
              <p>
                - قیمت ها بر اساس{" "}
                <u>
                  کاغذ تحریر <FormattedNumber value={80} /> گرمی درجه{" "}
                  <FormattedNumber value={1} />
                </u>{" "}
                می باشد.
              </p>
              <p>
                - برای سفارش روی کاغذ گلاسه{" "}
                <u>
                  <FormattedNumber value={125} /> گرمی
                </u>{" "}
                به قیمت های فوق مبلغ <FormattedNumber value={800} /> تومان اضافه
                می گردد.
              </p>
              <p>
                - <u>رنگی معمولی</u> یعنی پس زمینه تصویر سفید است اما المان های
                رنگی مانند نمودار، متون رنگی، شکل، سرصفحه، پا صفحه، لوگو و ...
                دارد. (تا نصف صفحه رنگی باشد)
              </p>
              <p>
                - <u>تمام رنگی</u> یعنی پس زمینه تصویر رنگی است و شامل صفحاتی می
                شود که تقریبا تمامی صفحات آنها رنگی می باشد. (بیش از نصف صفحه
                رنگی باشد)
              </p>
            </div>
          </div>
        </div>
      </div>
    </DataLoader>
  );
}

TariffsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
