import Head from "next/head";
import Link from "next/link";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import BarChart from "@/admin/components/BarChart";
import Button from "@/shared/components/Button";
import { ReactElement } from "react";

export default function DashboardFinancialRecordsTotalIncome() {
  return (
    <>
      <Head>
        <title>داشبورد - درامد کل</title>
      </Head>
      <SectionHeader
        title="سوابق مالی"
        description="سوابق مالی را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="درامد کل"
          end={
            <Link href="/dashboard/financial-records">
              <Button varient="content-title-none">
                بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/financial-records"
          title="درامد کل"
        />
        <BarChart
          data={{
            "05/10": 4,
            "05/11": 5,
            "05/12": 6,
            "05/13": 8,
            "05/14": 10,
            "05/15": 8,
            "05/16": 6,
            "05/17": 8,
            "05/18": 13,
            "05/19": 15,
            "05/20": 20,
            "05/21": 18,
            "05/22": 14,
            "05/23": 13,
            "05/24": 11,
            "05/25": 10,
            "05/26": 13,
            "05/27": 10,
            "05/28": 7,
            "05/29": 5,
            "05/30": 4,
          }}
        />
      </SectionContent>
    </>
  );
}

DashboardFinancialRecordsTotalIncome.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
