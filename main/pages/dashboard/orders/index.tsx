import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Order } from "@/shared/types";
import { cancelOrder, getOrders } from "@/main/api";
import AddIcon from "@/shared/assets/icons/add.svg";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import OrderTable from "@/main/components/Dashboard/OrderTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardOrderList() {
  const router = useRouter();
  const [data, setData] = useState<{
    countOfItems: number;
    orders: Order[];
  }>({
    countOfItems: 0,
    orders: [],
  });

  const [page, setPage] = useState(1);

  const [pendingOrderCancelRequest, setPendingOrderCancelRequest] = useState<
    number | null
  >(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - سفارش های من</title>
      </Head>
      <SectionHeader
        title="سفارش های من"
        description="تاریخچه سفارشات خود را از این قسمت مشاهده کنید"
      />
      <SectionContent>
        <ContentHeader
          title="کل سفارشات من"
          end={
            <Link href="/dashboard/orders/new">
              <Button style={{ padding: 0 }}>
                سفارش جدید <AddIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="کل سفارشات من"
          end={
            <Link href="/dashboard/orders/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getOrders(page)}
          deps={[page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <OrderTable
            orders={data.orders}
            onSeeOrderDetails={(orderId) =>
              router.push(`/dashboard/orders/${orderId}/details`)
            }
            onCancelOrder={setPendingOrderCancelRequest}
          />
          {!data.orders.length && <EmptyNote>شما هیچ سفارشی ندارید</EmptyNote>}
          <WarningConfirmDialog
            open={pendingOrderCancelRequest !== null}
            onClose={() => {
              setPendingOrderCancelRequest(null);
            }}
            onConfirm={() =>
              cancelOrder(pendingOrderCancelRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingOrderCancelRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
            message="از لغو کردن این سفارش مطمئن هستید؟"
            confirmButtonText="لغو کردن"
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardOrderList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
