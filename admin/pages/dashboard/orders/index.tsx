import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/router";
import { Order } from "@/shared/types";
import {
  cancelOrder,
  confirmOrder,
  getOrders,
  markOrderSent,
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
import OrderTable from "@/admin/components/OrderTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import OrderCancelDialog from "@/admin/components/OrderCancelDialog";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import OrderSentDialog from "@/admin/components/OrderSentDialog";

export default function DashboardOrderList() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    orders: Order[];
  }>({ countOfItems: 0, orders: [] });

  const [itemsStatus, setItemsStatus] = useState<
    "canceled" | "pending" | "preparing" | "sent" | null
  >("pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pendingOrderCancelRequest, setPendingOrderCancelRequest] = useState<
    number | null
  >(null);
  const [pendingOrderConfirmRequest, setPendingOrderConfirmRequest] = useState<
    number | null
  >(null);
  const [pendingMarkOrderSentRequest, setPendingMarkOrderSentRequest] =
    useState<number | null>(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>?????????????? - ?????????? ????</title>
      </Head>
      <SectionHeader
        title="?????????? ????"
        description="?????????????? ???? ???? ?????? ?????? ???????????? ????????"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="?????? ?????????? ????"
          end={
            <SwitchButtons
              options={[
                {
                  id: "canceled",
                  label: "?????? ??????",
                },
                {
                  id: "pending",
                  label: "???? ???????????? ??????????",
                },
                {
                  id: "preparing",
                  label: "???? ?????? ?????????? ????????",
                },
                {
                  id: "sent",
                  label: "?????????? ??????",
                },
              ]}
              value={itemsStatus}
              onChange={setItemsStatus}
              nullable
            />
          }
        />
        <MobileContentHeader backTo="/dashboard" title="?????? ?????????? ????" />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "?????????? ???? ??????????" }}
              value={search}
              setValue={setSearch}
            />
          }
        />
        <DataLoader
          load={() => getOrders(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <OrderTable
            orders={data.orders}
            onSeeOrderDetails={(orderId) =>
              router.push(`/dashboard/orders/${orderId}/details`)
            }
            onCancelOrder={setPendingOrderCancelRequest}
            onConfirmOrder={setPendingOrderConfirmRequest}
            onMarkOrderSent={setPendingMarkOrderSentRequest}
            itemsStatus={itemsStatus}
          />
          {!data.orders.length && <EmptyNote>?????? ???????????? ???????? ????????????</EmptyNote>}
          <OrderCancelDialog
            open={pendingOrderCancelRequest !== null}
            onClose={() => {
              setPendingOrderCancelRequest(null);
            }}
            onCancelOrder={(reason) =>
              cancelOrder(pendingOrderCancelRequest!, reason)
                .then((message) => {
                  toast.success(message);
                  setPendingOrderCancelRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
          />
          <WarningConfirmDialog
            open={pendingOrderConfirmRequest !== null}
            onClose={() => {
              setPendingOrderConfirmRequest(null);
            }}
            onConfirm={() =>
              confirmOrder(pendingOrderConfirmRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingOrderConfirmRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
            message="???? ???????????? ???????? ?????? ?????????? ?????????? ????????????"
            confirmButtonText="????????????"
          />
          <OrderSentDialog
            open={pendingMarkOrderSentRequest !== null}
            onClose={() => setPendingMarkOrderSentRequest(null)}
            onMarkOrderSent={(trackingCode) =>
              markOrderSent(pendingMarkOrderSentRequest!, trackingCode)
                .then((message) => {
                  toast.success(message);
                  setPendingMarkOrderSentRequest(null);
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

DashboardOrderList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
