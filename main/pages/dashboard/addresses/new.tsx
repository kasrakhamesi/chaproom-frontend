import { ReactElement } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { newAddress } from "@/main/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import AddressForm from "@/shared/components/Dashboard/AddressForm";

export default function DashboardNewAddresse() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - افزودن آدرس</title>
      </Head>
      <SectionHeader
          title="کل آدرس های من"
          description="آدرس های خود را از این قسمت مدیریت کنید"
      />
      <SectionContent>
        <ContentHeader
          title="افزودن آدرس جدید"
          end={
            <Link href="/dashboard/addresses">
              <Button style={{ padding: 0 }}>
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/addresses"
          title="افزودن آدرس جدید"
        />
        <AddressForm
          inputsVarient="shadow"
          onSave={(addressData) =>
            newAddress(
              addressData.label,
              addressData.recipientName,
              addressData.recipientPhoneNumber,
              addressData.recipientPostalCode,
              addressData.recipientDeliveryProvince,
              addressData.recipientDeliveryCity,
              addressData.recipientDeliveryAddress
            )
              .then((message) => {
                toast.success(message);
                router.push("/dashboard/addresses");
              })
              .catch(toast.error)
          }
        />
      </SectionContent>
    </>
  );
}

DashboardNewAddresse.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
