import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { deleteAddress, getAddresses } from "@/main/api";
import { Address } from "@/shared/types";
import AddIcon from "@/shared/assets/icons/add.svg";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import AddressList from "@/shared/components/Dashboard/AddressList";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardAddresseList() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    addresses: Address[];
  }>({ countOfItems: 0, addresses: [] });

  const [page, setPage] = useState(1);

  const [pendingDeleteRequest, setPendingDeleteRequest] = useState<
    number | null
  >(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - آدرس های من</title>
      </Head>
      <SectionHeader
        title="آدرس های من"
        description="آدرس های خود را از این بخش مدیریت کنید"
      />
      <SectionContent>
        <ContentHeader
          title="کل آدرس های من"
          end={
            <Link href="/dashboard/addresses/new">
              <Button style={{ padding: 0 }}>
                افزودن آدرس <AddIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="کل آدرس های من"
          end={
            <Link href="/dashboard/addresses/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getAddresses(page)}
          deps={[page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <AddressList
            addresses={data.addresses}
            onEditAddress={(addressId) =>
              router.push(`/dashboard/addresses/${addressId}/edit`)
            }
            onDeleteAddress={setPendingDeleteRequest}
          />
          {!data.addresses.length && (
            <EmptyNote>شما هیچ آدرسی ندارید</EmptyNote>
          )}
        </DataLoader>
        <WarningConfirmDialog
          open={pendingDeleteRequest !== null}
          onClose={() => {
            setPendingDeleteRequest(null);
          }}
          onConfirm={() =>
            deleteAddress(pendingDeleteRequest!)
              .then((message) => {
                toast.success(message);
                setPendingDeleteRequest(null);
                if (reloadRef.current) reloadRef.current();
              })
              .catch(toast.error)
          }
          message="از حذف این آدرس مطمئن هستید؟"
          confirmButtonText="حذف"
        />
      </SectionContent>
    </>
  );
}

DashboardAddresseList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
