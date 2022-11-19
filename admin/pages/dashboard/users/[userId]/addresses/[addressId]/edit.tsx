import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Address } from "@/shared/types";
import { getAddress, updateAddress } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import AddressForm from "@/shared/components/Dashboard/AddressForm";

export default function DashboardUserAddressEdit() {
  const router = useRouter();
  const userId = parseInt(router.query.userId as string);
  const addressId = parseInt(router.query.addressId as string);
  // TODO 404

  const [data, setData] = useState<Address>();

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش آدرس</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="کاربران را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن آدرس"
          end={
            <Link href={`/dashboard/users/${userId}/addresses`}>
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo={`/dashboard/users/${userId}/addresses`}
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
            defaultValues={data}
            onSave={(addressFormData) =>
              updateAddress(addressId, addressFormData)
                .then((message) => {
                  toast.success(message);
                  router.push(`/dashboard/users/${userId}/addresses`);
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardUserAddressEdit.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
