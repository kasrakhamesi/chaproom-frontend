import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Address } from "@/shared/types";
import { updateAddress, getAddress } from "@/main/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import AddressForm from "@/shared/components/Dashboard/AddressForm";

export default function DashboardEditAddresse() {
  const router = useRouter();
  const addressId = parseInt(router.query.addressId as string);

  const [data, setData] = useState<Address>();

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش آدرس</title>
      </Head>
      <SectionHeader
          title="کل آدرس های من"
          description="_ آدرس های خود را از این قسمت مدیریت کنید"
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن آدرس"
          end={
            <Link href="/dashboard/addresses">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/addresses"
          title="ویرایش کردن آدرس"
        />
        <DataLoader
          load={() => {
            if (router.isReady) return getAddress(addressId);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <AddressForm
            inputsVarient="shadow"
            defaultValues={data}
            onSave={(addressData) =>
              updateAddress(addressId, addressData)
                .then((message) => {
                  toast.success(message);
                  router.push("/dashboard/addresses");
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardEditAddresse.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
