import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { FinancialRecord } from "@/shared/types";
import { deleteFinancialRecord, getFinancialRecords } from "@/admin/api";
import AddIcon from "@/shared/assets/icons/add.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import ButtonList from "@/shared/components/ButtonList";
import Button from "@/shared/components/Button";
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import DataLoader from "@/shared/components/DataLoader";
import FinancialRecordTable from "@/admin/components/FinancialRecordTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import Filters from "@/admin/components/Filters";
import FilterSelect from "@/admin/components/FilterSelect";
import FilterDate from "@/admin/components/FilterDate";

export default function DashboardFinancialRecordList() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    records: FinancialRecord[];
  }>({
    countOfItems: 0,
    records: [],
  });

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "successful" | "unsuccessful" | null
  >(null);
  const [page, setPage] = useState(1);

  const [
    pendingFinancialRecordCodeDeleteRequest,
    setPendingFinancialRecordCodeDeleteRequest,
  ] = useState<number | null>(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>?????????????? - ?????????? ????????</title>
      </Head>
      <SectionHeader
        title="?????????? ????????"
        description="?????????? ???????? ???? ???? ?????? ?????? ???????????? ????????"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="?????? ?????????? ????????"
          end={
            <ButtonList>
              <Link href="/dashboard/financial-records/total-income">
                <Button
                  varient="content-title-outlined"
                  style={{ minWidth: 130 }}
                >
                  ???? ??????????
                </Button>
              </Link>
              <Link href="/dashboard/financial-records/new">
                <Button varient="content-title-none">
                  ?????????? ?????? <AddIcon />
                </Button>
              </Link>
            </ButtonList>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="?????? ?????????? ????????"
          end={
            <Link href="/dashboard/financial-records/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
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
                setStartDate(null);
                setEndDate(null);
                setPaymentStatus(null);
              }}
              rows={[
                [
                  <FilterDate
                    value={startDate}
                    onChange={setStartDate}
                    width={140}
                    maxWidth={140}
                  />,
                  <FilterDate
                    value={endDate}
                    onChange={setEndDate}
                    width={140}
                    maxWidth={140}
                  />,
                  <FilterSelect
                    placeholder="?????????? ????????????"
                    options={{
                      successful: "????????",
                      unsuccessful: "????????????",
                    }}
                    value={paymentStatus}
                    onChange={setPaymentStatus}
                    width={150}
                    maxWidth={150}
                  />,
                ],
              ]}
            />
          }
        />
        <DataLoader
          load={() =>
            getFinancialRecords(search, startDate, endDate, paymentStatus, page)
          }
          deps={[search, startDate, endDate, paymentStatus, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <FinancialRecordTable
            financialRecords={data.records}
            onSeeDetails={(orderId) =>
              router.push(`/dashboard/orders/${orderId}/details`)
            }
            onEditFinancialRecord={(financialRecordId) =>
              router.push(
                `/dashboard/financial-records/${financialRecordId}/edit`
              )
            }
            onDeleteFinancialRecord={setPendingFinancialRecordCodeDeleteRequest}
          />
          {!data.records.length && <EmptyNote>?????? ???????? ???????? ????????????</EmptyNote>}
          <WarningConfirmDialog
            open={pendingFinancialRecordCodeDeleteRequest !== null}
            onClose={() => {
              setPendingFinancialRecordCodeDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteFinancialRecord(pendingFinancialRecordCodeDeleteRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingFinancialRecordCodeDeleteRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
            message="???? ?????? ?????? ?????? ?????????? ????????????"
            confirmButtonText="??????"
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardFinancialRecordList.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
