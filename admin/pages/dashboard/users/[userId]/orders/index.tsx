import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Order } from "@/shared/types";
import {
  cancelOrder,
  confirmOrder,
  getUserOrders,
  markOrderSent,
} from "@/admin/api";
import DataLoader from "@/shared/components/DataLoader";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import OrderTable from "@/admin/components/OrderTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import OrderCancelDialog from "@/admin/components/OrderCancelDialog";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import OrderSentDialog from "@/admin/components/OrderSentDialog";

export default function DashboardUserOrderList() {
  const router = useRouter();
  const userId = parseInt(router.query.userId as string); // TODO 404

  const [data, setData] = useState<{
    countOfItems: number;
    orders: Order[];
  }>({ countOfItems: 0, orders: [] });

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

  return (
    <>
      <Head>
        <title>داشبورد - سفارش ها</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="کاربران را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه سفارش ها"
          end={
            <Link href="/dashboard/users">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader backTo="/dashboard/users" title="همه سفارش ها" />
        <DataLoader
          load={() => {
            if (router.isReady) return getUserOrders(userId, search, page);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <OrderTable
            orders={data.orders}
            onSeeOrderDetails={(orderId) =>
              router.push(
                `/dashboard/users/${userId}/orders/${orderId}/details`
              )
            }
            onCancelOrder={setPendingOrderCancelRequest}
            onConfirmOrder={setPendingOrderConfirmRequest}
            onMarkOrderSent={setPendingMarkOrderSentRequest}
            itemsStatus={null}
          />
          {!data.orders.length && (
            <EmptyNote>این کاربر هیچ سفارشی ندارید</EmptyNote>
          )}
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
                })
                .catch(toast.error)
            }
            message="از تأیید کردن این سفارش مطمئن هستید؟"
            confirmButtonText="تأیید"
          />
          <OrderSentDialog
            open={pendingMarkOrderSentRequest !== null}
            onClose={() => {
              setPendingMarkOrderSentRequest(null);
            }}
            onMarkOrderSent={(trackingCode) =>
              markOrderSent(pendingMarkOrderSentRequest!, trackingCode)
                .then((message) => {
                  toast.success(message);
                  setPendingMarkOrderSentRequest(null);
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardUserOrderList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
