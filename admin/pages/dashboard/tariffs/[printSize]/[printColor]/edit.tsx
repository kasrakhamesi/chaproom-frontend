import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { PrintTariffs } from "@/shared/types";
import { getPrintTariffs, updatePrintPrice } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import PrintPriceForm from "@/admin/components/PrintPriceForm";

export default function DashboardEditPrintPrices() {
  const router = useRouter();
  const printSize = router.query.printSize as "a4" | "a5" | "a3";
  const printColor = {
    "black-and-white": "blackAndWhite",
    "normal-color": "normalColor",
    "full-color": "fullColor",
  }[router.query.printColor as string] as
    | "blackAndWhite"
    | "normalColor"
    | "fullColor";

  if (!["a4", "a5", "a3"].includes(printSize) || !printColor) {
    /* TODO 404 */
  }

  const [data, setData] = useState<PrintTariffs>();

  const printPrice = data ? data[printSize][printColor] : undefined;

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش تعرفه ها</title>
      </Head>
      <SectionHeader
        title="تعرفه ها"
        description="- تعرفه های چاپ را از این بخش مدیریت کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن تعرفه ها"
          end={
            <Link href="/dashboard/tariffs">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/tariffs"
          title="ویرایش کردن تعرفه ها"
        />
        <DataLoader load={() => getPrintTariffs()} setData={setData}>
          <PrintPriceForm
            printSize={printSize}
            printColor={printColor}
            defaultValues={printPrice}
            onSave={(printPriceData) =>
              updatePrintPrice({
                ...data!,
                [printSize]: {
                  ...data![printSize],
                  [printColor]: printPriceData,
                },
              })
                .then((message) => {
                  toast.success(message);
                  router.push("/dashboard/tariffs");
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardEditPrintPrices.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
