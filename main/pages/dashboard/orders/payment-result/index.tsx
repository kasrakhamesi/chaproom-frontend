import styles from "./style.module.scss";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import LogoWithName from "@/shared/assets/images/logoWithName.svg";
import SuccessfulOrderImage from "@/main/assets/images/successfulOrder.svg";
import UnuccessfulOrderImage from "@/main/assets/images/unsuccessfulOrder.svg";
import Button from "@/shared/components/Button";
import Link from "next/link";
import { FormattedNumber } from "react-intl";

export default function DashboardOrderPaymentResult() {
  const router = useRouter();
  const isSuccessful = router.query.isSuccessful as string;
  const orderId = router.query.orderId as string;

  return (
    <>
      <Head>
        <title>
          داشبورد - {isSuccessful === "true" ? "سفارش موفق" : "سفارش نا موفق"}
        </title>
      </Head>
      <SectionHeader
        title="سفارش ها"
        description="_ تاریخچه سفارشات خود را از این قسمت مشاهده کنید"
      />
      <SectionContent>
        <div className={styles.Container}>
          <div className={styles.SiteLogo}>
            <LogoWithName />
          </div>
          {!router.isReady ? (
            <></>
          ) : isSuccessful === "true" ? (
            <>
              <div className={styles.Image}>
                <SuccessfulOrderImage />
              </div>
              <h2 className={styles.SuccessfulTitle}>
                سفارش شما با موفقیت تکمیل شد
              </h2>
              <p className={styles.SuccessfulOrderId}>
                شماره سفارش:{" "}
                <FormattedNumber
                  value={parseInt(orderId)}
                  useGrouping={false}
                />
              </p>
              <Link href="/dashboard/orders">
                <Button varient="gradient" style={{ minWidth: 300 }}>
                  بازگشت به سفارش های من
                </Button>
              </Link>
            </>
          ) : (
            <>
              <div className={styles.Image}>
                <UnuccessfulOrderImage />
              </div>
              <h1 className={styles.UnsuccessfulTitle}>پرداخت ناموفق!</h1>
              <h2 className={styles.UnsuccessfulSubtitle}>
                متاسفانه پرداخت اخیر شما انجام نشد
              </h2>
              <p className={styles.UnsuccessfulMessage}>
                در صورت کسر موجودی از حساب شما تا <FormattedNumber value={72} />{" "}
                ساعت به حساب شما باز می‌گردد، در غیر این صورت با ما تماس بگیرید{" "}
                <Link href="/contact-us">
                  <a>[ تماس با ما ]</a>
                </Link>
              </p>
              <Link href="/dashboard/orders">
                <Button varient="gradient" style={{ minWidth: 300 }}>
                  بازگشت به سفارش های من
                </Button>
              </Link>
            </>
          )}
        </div>
      </SectionContent>
    </>
  );
}

DashboardOrderPaymentResult.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
