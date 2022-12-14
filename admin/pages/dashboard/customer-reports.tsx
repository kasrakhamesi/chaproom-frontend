import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useIntl } from "react-intl";
import toast from "react-hot-toast";
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
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import DataLoader from "@/shared/components/DataLoader";
import CustomerReportTable from "@/admin/components/CustomerReportTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import FilterSelect from "@/admin/components/FilterSelect";
import Filters from "@/admin/components/Filters";

export default function DashboardCustomerReport() {
  const intl = useIntl();
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    reports: CustomerReport[];
  }>({ countOfItems: 0, reports: [] });

  const [search, setSearch] = useState("");
  const [paperSize, setPaperSize] = useState<"a4" | "a5" | "a3" | null>(null);
  const [paperColor, setPaperColor] = useState<
    "blackAndWhite" | "fullColor" | "normalColor" | null
  >(null);
  const [paperSide, setPaperSide] = useState<
    "singleSided" | "doubleSided" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<
    | "withoutOrder"
    | "oneOrder"
    | "twoOrder"
    | "threeAndMoreOrder"
    | "mostToLowestOrder"
    | "lowestToMostOrder"
    | "mostToLowestBalance"
    | "lowestToMostBalance"
    | "mostToLowestPayment"
    | "lowestToMostPayment"
  >("mostToLowestOrder");
  const [page, setPage] = useState(1);

  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  function generatrExcel() {
    setIsGeneratingExcel(true);
    getCustomerReportsExcel(search, paperSize, paperColor, paperSide, sortOrder)
      .then(window.open)
      .catch(toast.error)
      .finally(() => setIsGeneratingExcel(false));
  }

  return (
    <>
      <Head>
        <title>?????????????? - ?????????? ??????????????</title>
      </Head>
      <SectionHeader
        title="?????????? ??????????????"
        description="?????????? ?????????????? ???? ???? ?????? ?????? ???????????? ????????"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="?????? ?????????? ????"
          end={
            <Button
              varient="content-title-none"
              style={{ padding: 0 }}
              disabled={isGeneratingExcel}
              loading={isGeneratingExcel}
              onClick={() => generatrExcel()}
            >
              ???????????? ???????? ???????????? ?????????? <DownloadIcon />
            </Button>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="?????? ?????????? ????"
          end={
            <IconButton
              varient="filled"
              disabled={isGeneratingExcel}
              loading={isGeneratingExcel}
              onClick={() => generatrExcel()}
            >
              <DownloadIcon />
            </IconButton>
          }
        />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "?????????? ?????????? ???? ?????? ???? ????????????" }}
              value={search}
              setValue={setSearch}
            />
          }
          end={
            <Filters
              removeFilters={() => {
                setPaperSize(null);
                setPaperColor(null);
                setPaperSide(null);
              }}
              rows={[
                [
                  <FilterSelect
                    placeholder="????????????"
                    options={{
                      a4: "A4",
                      a5: "A5",
                      a3: "A3",
                    }}
                    value={paperSize}
                    onChange={setPaperSize}
                    width={130}
                    maxWidth={130}
                  />,
                  <FilterSelect
                    placeholder="??????"
                    options={{
                      blackAndWhite: "???????? ?? ????????",
                      fullColor: "???????? ????????",
                      normalColor: "?????? ????????????",
                    }}
                    value={paperColor}
                    onChange={setPaperColor}
                    width={130}
                    maxWidth={130}
                  />,
                  <FilterSelect
                    placeholder="???? ???? / ???? ????"
                    options={{
                      singleSided: "???? ????",
                      doubleSided: "???? ????",
                    }}
                    value={paperSide}
                    onChange={setPaperSide}
                    width={130}
                    maxWidth={130}
                  />,
                ],
                [
                  <FilterSelect
                    options={{
                      mostToLowestOrder: "?????????????? ???? ???????????? ?????????? ??????????",
                      lowestToMostOrder: "???????????? ???? ?????????????? ?????????? ??????????",
                      mostToLowestBalance: "?????????????? ???? ???????????? ????????????",
                      lowestToMostBalance: "???????????? ???? ?????????????? ????????????",
                      mostToLowestPayment: "?????????????? ???? ???????????? ??????????????",
                      lowestToMostPayment: "???????????? ???? ?????????????? ??????????????",
                      withoutOrder: "???????? ??????????",
                      oneOrder: `${intl.formatNumber(1)} ??????????`,
                      twoOrder: `${intl.formatNumber(2)} ??????????`,
                      threeAndMoreOrder: `${intl.formatNumber(
                        3
                      )} ?????????? ?? ??????????`,
                    }}
                    value={sortOrder}
                    onChange={setSortOrder}
                    width={250}
                    maxWidth={250}
                  />,
                ],
              ]}
            />
          }
        />
        <DataLoader
          load={() =>
            getCustomerReports(
              search,
              paperSize,
              paperColor,
              paperSide,
              sortOrder,
              page
            )
          }
          deps={[search, paperSize, paperColor, paperSide, sortOrder, page]}
          setData={setData}
        >
          <CustomerReportTable
            customerReports={data.reports}
            onSeeUserOrderList={(userId) =>
              router.push(`/dashboard/users/${userId}/orders`)
            }
          />
          {!data.reports.length && (
            <EmptyNote>?????? ???????????? ???????? ????????????</EmptyNote>
          )}
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardCustomerReport.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
