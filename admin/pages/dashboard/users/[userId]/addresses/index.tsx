import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { Address } from "@/shared/types";
import { deleteAddress, getUserAddresses } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import AddressList from "@/shared/components/Dashboard/AddressList";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardUserAddressList() {
  const router = useRouter();
  const userId = parseInt(router.query.userId as string); // TODO 404

  const [data, setData] = useState<{
    countOfItems: number;
    addresses: Address[];
  }>({ countOfItems: 0, addresses: [] });

  const [page, setPage] = useState(1);

  const [pendingAddressDeleteRequest, setPendingAddressDeleteRequest] =
    useState<number | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - آدرس ها</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="کاربران را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="آدرس ها"
          end={
            <Link href="/dashboard/users">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader backTo="/dashboard/users" title="آدرس ها" />
        <DataLoader
          load={() => {
            if (router.isReady) return getUserAddresses(userId, page);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <AddressList
            addresses={data.addresses}
            onEditAddress={(addressId) =>
              router.push(
                `/dashboard/users/${userId}/addresses/${addressId}/edit`
              )
            }
            onDeleteAddress={setPendingAddressDeleteRequest}
          />
          {!data.addresses.length && (
            <EmptyNote>این کاربر هیچ آدرسی ندارید</EmptyNote>
          )}
          <WarningConfirmDialog
            open={pendingAddressDeleteRequest !== null}
            onClose={() => {
              setPendingAddressDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteAddress(pendingAddressDeleteRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingAddressDeleteRequest(null);
                })
                .catch(toast.error)
            }
            message="از حذف این آدرس مطمئن هستید؟"
            confirmButtonText="حذف"
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardUserAddressList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
