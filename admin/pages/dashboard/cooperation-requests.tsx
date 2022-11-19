import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { CooperationRequest } from "@/shared/types";
import { getCooperationRequests, updateCooperationRequest } from "@/admin/api";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import SwitchButtons from "@/shared/components/SwitchButtons";
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import DataLoader from "@/shared/components/DataLoader";
import CooperationRequestTable from "@/admin/components/CooperationRequestTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import CooperationRequestAcceptDialog from "@/admin/components/CooperationRequestAcceptDialog";
import CooperationRequestRejectDialog from "@/admin/components/CooperationRequestRejectDialog";

export default function DashboardCooperationRequests() {
  const [itemsStatus, setItemsStatus] = useState<
    "approved" | "rejected" | "pending"
  >("pending");

  const [data, setData] = useState<{
    countOfItems: number;
    cooperations: CooperationRequest[];
  }>({ countOfItems: 0, cooperations: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [
    pendingCooperationRequestAcceptRequest,
    setPendingCooperationRequestAcceptRequest,
  ] = useState<{ id: number; description: string | null } | null>(null);
  const [
    pendingCooperationRequestRejectRequest,
    setPendingCooperationRequestRejectRequest,
  ] = useState<{ id: number; description: string | null } | null>(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - درخواست های همکاری</title>
      </Head>
      <SectionHeader
        title="درخواست های همکاری"
        description="از این بخش درخواست های همکاری را مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه درخواست ها"
          end={
            <SwitchButtons
              options={[
                {
                  id: "pending",
                  label: "در انتظار بررسی",
                },
                {
                  id: "approved",
                  label: "قبول شده",
                },
                {
                  id: "rejected",
                  label: "رد شده",
                },
              ]}
              value={itemsStatus}
              onChange={setItemsStatus}
            />
          }
        />
        <MobileContentHeader backTo="/dashboard" title="همه درخواست ها" />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "جستجو شماره موبایل" }}
              value={search}
              setValue={setSearch}
            />
          }
        />
        <DataLoader
          load={() => getCooperationRequests(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <CooperationRequestTable
            cooperationRequests={data.cooperations}
            onAcceptCooperationRequest={(
              cooperationRequestId,
              cooperationRequestDescription
            ) => {
              setPendingCooperationRequestAcceptRequest({
                id: cooperationRequestId,
                description: cooperationRequestDescription,
              });
            }}
            onRejectCooperationRequest={(
              cooperationRequestId,
              cooperationRequestDescription
            ) => {
              setPendingCooperationRequestRejectRequest({
                id: cooperationRequestId,
                description: cooperationRequestDescription,
              });
            }}
            showDescription={itemsStatus !== "pending"}
            itemsStatus={itemsStatus}
          />
          {!data.cooperations.length && (
            <EmptyNote>هیچ درخواست همکاری ندارید</EmptyNote>
          )}
          <CooperationRequestAcceptDialog
            open={pendingCooperationRequestAcceptRequest !== null}
            onClose={() => {
              setPendingCooperationRequestAcceptRequest(null);
            }}
            defaultValues={{
              description:
                pendingCooperationRequestAcceptRequest?.description ||
                undefined,
            }}
            onAcceptCooperationRequest={(cooperationRequestAcceptData) =>
              updateCooperationRequest(
                pendingCooperationRequestAcceptRequest!.id,
                "approved",
                cooperationRequestAcceptData.description
              )
                .then((message) => {
                  toast.success(message);
                  setPendingCooperationRequestAcceptRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
          />
          <CooperationRequestRejectDialog
            open={pendingCooperationRequestRejectRequest !== null}
            onClose={() => {
              setPendingCooperationRequestRejectRequest(null);
            }}
            defaultValues={{
              description:
                pendingCooperationRequestRejectRequest?.description ||
                undefined,
            }}
            onRejectCooperationRequest={(cooperationRequestRejectData) =>
              updateCooperationRequest(
                pendingCooperationRequestRejectRequest!.id,
                "rejected",
                cooperationRequestRejectData.description
              )
                .then((message) => {
                  toast.success(message);
                  setPendingCooperationRequestRejectRequest(null);
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

DashboardCooperationRequests.getLayout = function getLayout(
  page: ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
