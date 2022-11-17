import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Order } from "@/shared/types";
import { getOrder } from "@/main/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import DataLoader from "@/shared/components/DataLoader";
import OrderDetails from "@/shared/components/Dashboard/OrderDetails";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import Link from "next/link";

export default function DashboardOrderDetails() {
  const router = useRouter();
  const orderId = parseInt(router.query.orderId as string);

  const [data, setData] = useState<Order>();

  return (
    <>
      <Head>
        <title>داشبورد - جزئیات سفارش</title>
      </Head>
      <SectionHeader
        title="سفارش های من"
        description="تاریخچه سفارشات خود را از این بخش مشاهده کنید"
      />
      <SectionContent>
        <ContentHeader
          title="جزئیات سفارش"
          end={
            <Link
              href={
                router.query.fromTransactions === "true"
                  ? "/dashboard/transactions"
                  : "/dashboard/orders"
              }
            >
              <Button style={{ padding: 0 }}>
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo={
            router.query.fromTransactions === "true"
              ? "/dashboard/transactions"
              : "/dashboard/orders"
          }
          title="جزئیات سفارش"
        />
        <DataLoader
          load={() => {
            if (router.isReady) return getOrder(orderId);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <OrderDetails order={data!} />
          <BottomActions>
            <Button varient="filled" style={{ minWidth: 100 }}>
              دریافت فاکتور
            </Button>
          </BottomActions>
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardOrderDetails.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
