import styles from "./style.module.scss";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import SuccessfulOrderImage from "@/main/assets/images/successfulOrder.svg";
import Button from "@/shared/components/Button";
import Link from "next/link";

export default function DashboardOrderPaymentResult() {
  const router = useRouter();
  const { isSuccessful, orderId } = router.query;

  return (
    <>
      <Head>
        <title>
          داشبورد - {isSuccessful === "true" ? "سفارش موفق" : "سفارش نا موفق"}
        </title>
      </Head>
      <SectionHeader
          title="کل سفارشات من"
          description="تاریخچه سفارشات خود را از این قسمت مشاهده کنید"
      />
      <SectionContent>
        <div className={styles.Container}>
          <div className={styles.SiteLogo}>
            <LogoWithName />
          </div>
          <div className={styles.Image}>
            {isSuccessful === "true" ? (
              <SuccessfulOrderImage />
            ) : (
              <SuccessfulOrderImage />
            )}
          </div>
          <h2>
            {isSuccessful === "true"
              ? "سفارش شما با موفقیت تکمیل شد"
              : "سفارش شما با موفقیت تکمیل نشد"}
          </h2>
          <p>شماره سفارش: {orderId}</p>
          <div className={styles.ButtonList}>
            <Link href={`/dashboard/orders/${orderId}/details`}>
              <Button varient="gradient">مشاهده جزئیات سفارش</Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button varient="outlined">بازگشت به سفارش ها</Button>
            </Link>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

DashboardOrderPaymentResult.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
