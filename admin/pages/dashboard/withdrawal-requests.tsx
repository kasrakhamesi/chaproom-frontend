import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { WithdrawalRequest } from "@/shared/types";
import {
  doWithdrawalRequests,
  getWithdrawalRequests,
  rejectWithdrawalRequests,
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
import WithdrawalRequestTable from "@/admin/components/WithdrawalRequestTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WithdrawalRequestDoneDialog from "@/admin/components/WithdrawalRequestDoneDialog";
import WithdrawalRequestRejectDialog from "@/admin/components/WithdrawalRequestRejectDialog";

export default function DashboardWithdrawalRequests() {
  const [data, setData] = useState<{
    countOfItems: number;
    withdrawals: WithdrawalRequest[];
  }>({ countOfItems: 0, withdrawals: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsStatus, setItemsStatus] = useState<"done" | "rejected" | null>(
    null
  );

  const [
    pendingWithdrawalRequestDoneRequest,
    setPendingWithdrawalRequestDoneRequest,
  ] = useState<number | null>(null);
  const [
    pendingWithdrawalRequestRejectRequest,
    setPendingWithdrawalRequestRejectRequest,
  ] = useState<number | null>(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - درخواست های برداشت</title>
      </Head>
      <SectionHeader
        title="درخواست های برداشت"
        description="درخواست های برداشت از این بخش را مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه درخواست ها"
          end={
            <SwitchButtons
              options={[
                {
                  id: "done",
                  label: "انجام شده",
                },
                {
                  id: "rejected",
                  label: "رد شده",
                },
              ]}
              value={itemsStatus}
              onChange={setItemsStatus}
              nullable
            />
          }
        />
        <MobileContentHeader backTo="/dashboard" title="همه درخواست ها" />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "جستجو کاربر با نام یا موبایل" }}
              value={search}
              setValue={setSearch}
            />
          }
        />
        <DataLoader
          load={() =>
            getWithdrawalRequests(
              search,
              page,
              itemsStatus === null ? "pending" : itemsStatus
            )
          }
          deps={[search, page, itemsStatus]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <WithdrawalRequestTable
            withdrawalRequests={data.withdrawals}
            onDoneWithdrawalRequest={setPendingWithdrawalRequestDoneRequest}
            onRejectWithdrawalRequest={setPendingWithdrawalRequestRejectRequest}
            itemsStatus={itemsStatus === null ? "pending" : itemsStatus}
          />
          {!data.withdrawals.length && (
            <EmptyNote>هیچ درخواست برداشتی وجود ندارید</EmptyNote>
          )}
          <WithdrawalRequestDoneDialog
            open={pendingWithdrawalRequestDoneRequest !== null}
            onClose={() => setPendingWithdrawalRequestDoneRequest(null)}
            onDoneWithdrawalRequest={(transactionDate, trackingCode) =>
              doWithdrawalRequests(
                pendingWithdrawalRequestDoneRequest!,
                trackingCode
              )
                .then((message) => {
                  toast.success(message);
                  setPendingWithdrawalRequestDoneRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
          />
          <WithdrawalRequestRejectDialog
            open={pendingWithdrawalRequestRejectRequest !== null}
            onClose={() => setPendingWithdrawalRequestRejectRequest(null)}
            onRejectWithdrawalRequest={(reason) =>
              rejectWithdrawalRequests(
                pendingWithdrawalRequestRejectRequest!,
                reason
              )
                .then((message) => {
                  toast.success(message);
                  setPendingWithdrawalRequestRejectRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardWithdrawalRequests.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
