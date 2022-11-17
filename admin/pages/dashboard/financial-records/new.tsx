import { ReactElement } from "react";
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
              <Button style={{ padding: 0 }}>
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
          onSave={(financialRecordData) => {
            // data.dispatch({
            //   type: "DISCOUNT_CODES:PUSH",
            //   payload: {
            //     id: uuidv4(),
            //     ...discountCodeData,
            //   },
            // });
            router.push("/dashboard/financial-records");
          }}
        />
      </SectionContent>
    </>
  );
}

DashboardNewFinancialRecord.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
