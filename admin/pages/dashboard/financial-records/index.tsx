import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
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
import DataLoader from "@/shared/components/DataLoader";
import FinancialRecordTable from "@/admin/components/FinancialRecordTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import toast from "react-hot-toast";

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
  const [page, setPage] = useState(1);

  const [
    pendingFinancialRecordCodeDeleteRequest,
    setPendingFinancialRecordCodeDeleteRequest,
  ] = useState<number | null>(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - سوابق مالی</title>
      </Head>
      <SectionHeader
        title="سوابق مالی"
        description="سوابق مالی را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه سوابق مالی"
          end={
            <ButtonList>
              <Link href="/dashboard/financial-records/total-income">
                <Button varient="filled">کل درآمد</Button>
              </Link>
              <Link href="/dashboard/financial-records/new">
                <Button style={{ padding: 0 }}>
                  ایجاد سند <AddIcon />
                </Button>
              </Link>
            </ButtonList>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه سوابق مالی"
          end={
            <Link href="/dashboard/financial-records/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getFinancialRecords(search, page, null)}
          deps={[search, page]}
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
          {!data.records.length && <EmptyNote>هیچ سندی وجود ندارید</EmptyNote>}
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
            message="از حذف این سند مطمئن هستید؟"
            confirmButtonText="حذف"
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
