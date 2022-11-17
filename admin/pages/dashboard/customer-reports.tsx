import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import Head from "next/head";
import { CustomerReport } from "@/shared/types";
import { getCustomerReports, getCustomerReportsExcel } from "@/admin/api";
import DownloadIcon from "@/admin/assets/icons/download.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import CustomerReportTable from "@/admin/components/CustomerReportTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import toast from "react-hot-toast";

export default function DashboardCustomerReport() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    reports: CustomerReport[];
  }>({ countOfItems: 0, reports: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  return (
    <>
      <Head>
        <title>داشبورد - گزارش مشتریان</title>
      </Head>
      <SectionHeader
        title="گزارش مشتریان"
        description="گزارش مشتریان را از این بخش مشاهده کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه گزارش ها"
          end={
            <Button
              style={{ padding: 0 }}
              disabled={isGeneratingExcel}
              onClick={() => {
                setIsGeneratingExcel(true);
                getCustomerReportsExcel(search)
                  .then(window.open)
                  .catch(toast.error)
                  .finally(() => setIsGeneratingExcel(false));
              }}
            >
              دانلود اکسل براساس فیلتر <DownloadIcon />
            </Button>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه گزارش ها"
          end={
            <IconButton
              varient="filled"
              disabled={isGeneratingExcel}
              onClick={() => {
                setIsGeneratingExcel(true);
                getCustomerReportsExcel(search)
                  .then(window.open)
                  .catch(toast.error)
                  .finally(() => setIsGeneratingExcel(false));
              }}
            >
              <DownloadIcon />
            </IconButton>
          }
        />
        <DataLoader
          load={() => getCustomerReports(search, page)}
          setData={setData}
        >
          <CustomerReportTable
            customerReports={data.reports}
            onSeeUserOrderList={(userId) =>
              router.push(`/dashboard/users/${userId}/orders`)
            }
          />
          {!data.reports.length && (
            <EmptyNote>هیچ گزارشی وجود ندارید</EmptyNote>
          )}
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardCustomerReport.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
