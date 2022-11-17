import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Discount } from "@/shared/types";
import { getDiscount, updateDiscount } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DiscountForm from "@/admin/components/DiscountForm";
import DataLoader from "@/shared/components/DataLoader";

export default function DashboardEditUser() {
  const router = useRouter();
  const discountId = parseInt(router.query.discountId as string);

  const [data, setData] = useState<Discount>();

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش بلاگ</title>
      </Head>
      <SectionHeader
        title="وبلاگ"
        description="وبلاگ را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن بلاگ"
          end={
            <Link href="/dashboard/discounts">
              <Button style={{ padding: 0 }}>
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/discounts"
          title="ویرایش کردن کد تخفیف"
        />
        <DataLoader
          load={() => {
            if (router.isReady) return getDiscount(discountId);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <DiscountForm
            defaultValues={data}
            onSave={(discountData) =>
              updateDiscount(discountId, discountData)
                .then((message) => {
                  toast.success(message);
                  router.push("/dashboard/discounts");
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardEditUser.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
