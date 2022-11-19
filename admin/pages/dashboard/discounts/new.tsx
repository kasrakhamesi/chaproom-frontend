import { ReactElement } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { newDiscount } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DiscountForm from "@/admin/components/DiscountForm";

export default function DashboardNewDiscount() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - ایجاد کد تخفیف</title>
      </Head>
      <SectionHeader
        title="کدهای تخفیف"
        description="کدهای تخفیف را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ایجاد کد تخفیف جدید"
          end={
            <Link href="/dashboard/discounts">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/discounts"
          title="ایجاد کد تخفیف جدید"
        />
        <DiscountForm
          onSave={(discountData) =>
            newDiscount({
              ...discountData,
              userId: discountData.user?.id || null,
            })
              .then((message) => {
                toast.success(message);
                router.push("/dashboard/discounts");
              })
              .catch(toast.error)
          }
        />
      </SectionContent>
    </>
  );
}

DashboardNewDiscount.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
