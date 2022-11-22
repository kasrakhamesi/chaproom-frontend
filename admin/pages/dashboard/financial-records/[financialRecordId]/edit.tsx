import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import FinancialRecordForm from "@/admin/components/FinancialRecordForm";
import { FinancialRecord } from "@/shared/types";
import toast from "react-hot-toast";
import DataLoader from "@/shared/components/DataLoader";
import { getFinancialRecord, updateFinancialRecord } from "@/admin/api";

export default function DashboardFinancialRecordEdit() {
  const router = useRouter();
  const financialRecordId = parseInt(router.query.financialRecordId as string);

  const [data, setData] = useState<FinancialRecord>();

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش سند</title>
      </Head>
      <SectionHeader
        title="سوابق مالی"
        description="- سوابق مالی را از این بخش مدیریت کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن سند"
          end={
            <Link href="/dashboard/financial-records">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/financial-records"
          title="ویرایش کردن سند"
        />
        <DataLoader
          load={() => {
            if (router.isReady) return getFinancialRecord(financialRecordId);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <FinancialRecordForm
            defaultValues={data}
            onSave={(financialRecordData) => {
              updateFinancialRecord(financialRecordId, {
                ...financialRecordData,
                userId: financialRecordData.user.id,
              })
                .then((message) => {
                  toast.success(message);
                  router.push("/dashboard/financial-records");
                })
                .catch(toast.error);
            }}
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardFinancialRecordEdit.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
