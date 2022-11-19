import { ReactElement } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { newFinancialRecord } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import FinancialRecordForm from "@/admin/components/FinancialRecordForm";

export default function DashboardNewFinancialRecord() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - ایجاد سند</title>
      </Head>
      <SectionHeader
        title="سوابق مالی"
        description="سوابق مالی را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ایجاد سند جدید"
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
          title="ایجاد سند جدید"
        />
        <FinancialRecordForm
          onSave={(financialRecordData) =>
            newFinancialRecord({
              ...financialRecordData,
              userId: financialRecordData.user.id,
            })
              .then((message) => {
                toast.success(message);
                router.push("/dashboard/financial-records");
              })
              .catch(toast.error)
          }
        />
      </SectionContent>
    </>
  );
}

DashboardNewFinancialRecord.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
