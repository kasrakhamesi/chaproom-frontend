import { ReactElement, useState } from "react";
import Head from "next/head";
import {
  DedicatedDiscountCodeReport,
  DedicatedLinkReport,
} from "@/shared/types";
import {
  getDedicatedDiscountCodeReports,
  getDedicatedLinkReports,
} from "@/admin/api";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import SwitchButtons from "@/shared/components/SwitchButtons";
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import DataLoader from "@/shared/components/DataLoader";
import DedicatedLinkReportTable from "@/admin/components/DedicatedLinkReportTable";
import DedicatedDiscountCodeReportTable from "@/admin/components/DedicatedDiscountCodeReportTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import Pagination from "@/shared/components/Pagination";

export default function DashboardMarketingReport() {
  const [tab, setTab] = useState<"link" | "discount-code">("link");

  const [dedicatedLinkData, setDedicatedLinkData] = useState<{
    totalCount: number;
    pageSize: number;
    reports: DedicatedLinkReport[];
  }>({ totalCount: 0, pageSize: 0, reports: [] });

  const [dedicatedDiscountCodeData, setDedicatedDiscountCodeData] = useState<{
    totalCount: number;
    pageSize: number;
    reports: DedicatedDiscountCodeReport[];
  }>({ totalCount: 0, pageSize: 0, reports: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <Head>
        <title>داشبورد - گزارش بازاریابی</title>
      </Head>
      <SectionHeader
        title="گزارش بازاریابی"
        description="- گزارش بازاریابی را از این بخش مشاهده کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="همه گزارش ها"
          end={
            <SwitchButtons
              options={[
                {
                  id: "link",
                  label: "لینک اختصاصی",
                },
                {
                  id: "discount-code",
                  label: "کد تخفیف اختصاصی",
                },
              ]}
              value={tab}
              onChange={(newTab) => {
                setTab(newTab);
                setPage(1);
              }}
            />
          }
        />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "جستجو کاربر با نام یا موبایل" }}
              value={search}
              setValue={(newValue) => {
                setSearch(newValue);
                setPage(1);
              }}
            />
          }
        />
        <MobileContentHeader backTo="/dashboard" title="همه گزارش ها" />
        {tab === "link" && (
          <DataLoader
            load={() => getDedicatedLinkReports(search, page)}
            deps={[search, page]}
            setData={setDedicatedLinkData}
          >
            <DedicatedLinkReportTable
              dedicatedLinkReports={dedicatedLinkData.reports}
            />
            {!dedicatedLinkData.reports.length && (
              <EmptyNote>هیچ گزارشی وجود ندارید</EmptyNote>
            )}
            <Pagination
              currentPage={page}
              totalCount={dedicatedLinkData.totalCount}
              pageSize={dedicatedLinkData.pageSize}
              onPageChange={setPage}
            />
          </DataLoader>
        )}
        {tab === "discount-code" && (
          <DataLoader
            load={() => getDedicatedDiscountCodeReports(search, page)}
            deps={[search, page]}
            setData={setDedicatedDiscountCodeData}
          >
            <DedicatedDiscountCodeReportTable
              dedicatedDiscountCodeReports={dedicatedDiscountCodeData.reports}
            />
            {!dedicatedDiscountCodeData.reports.length && (
              <EmptyNote>هیچ گزارشی وجود ندارید</EmptyNote>
            )}
            <Pagination
              currentPage={page}
              totalCount={dedicatedDiscountCodeData.totalCount}
              pageSize={dedicatedDiscountCodeData.pageSize}
              onPageChange={setPage}
            />
          </DataLoader>
        )}
      </SectionContent>
    </>
  );
}

DashboardMarketingReport.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
