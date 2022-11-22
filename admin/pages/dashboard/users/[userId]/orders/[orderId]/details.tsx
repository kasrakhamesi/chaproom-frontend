import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Order } from "@/shared/types";
import { getOrder } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import DataLoader from "@/shared/components/DataLoader";
import OrderDetails from "@/shared/components/Dashboard/OrderDetails";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";

export default function DashboardUserOrderDetails() {
  const router = useRouter();
  const userId = parseInt(router.query.userId as string);
  const orderId = parseInt(router.query.orderId as string);
  // TODO 404

  const [data, setData] = useState<Order>();

  return (
    <>
      <Head>
        <title>داشبورد - جزئیات سفارش</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="- کاربران را از این بخش اضافه و ویرایش کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="جزئیات سفارش"
          end={
            <Link href={`/dashboard/users/${userId}/orders`}>
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo={`/dashboard/users/${userId}/orders`}
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

DashboardUserOrderDetails.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
