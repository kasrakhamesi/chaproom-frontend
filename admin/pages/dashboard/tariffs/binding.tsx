import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { BindingTariffs } from "@/shared/types";
import { getBindingTariffs, updateBindingTariffs } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import BindingTariffsForm from "@/admin/components/BindingTariffsForm";

export default function DashboardBindingPrices() {
  const [data, setData] = useState<BindingTariffs>();

  return (
    <>
      <Head>
        <title>داشبورد - تعرفه های صحافی</title>
      </Head>
      <SectionHeader
        title="تعرفه ها"
        description="- تعرفه های چاپ را از این بخش مدیریت کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="صحافی"
          end={
            <Link href="/dashboard/tariffs">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader backTo="/dashboard/tariffs" title="صحافی" />
        <DataLoader load={() => getBindingTariffs()} setData={setData}>
          <BindingTariffsForm
            defaultValues={data}
            onSave={(bindingTariffsData) =>
              updateBindingTariffs(bindingTariffsData)
                .then(toast.success)
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardBindingPrices.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
