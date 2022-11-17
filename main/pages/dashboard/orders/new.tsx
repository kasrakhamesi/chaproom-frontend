import { useRouter } from "next/router";
import { ReactElement } from "react";
import Head from "next/head";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import OrderForm from "@/main/components/Dashboard/OrderForm";

export default function DashboardNewOrder() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - سفارش جدید</title>
      </Head>
      <SectionHeader
          title="کل سفارشات من"
          description="تاریخچه سفارشات خود را از این قسمت مشاهده کنید"
      />
      <SectionContent>
        <OrderForm />
      </SectionContent>
    </>
  );
}

DashboardNewOrder.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
