import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Discount } from "@/shared/types";
import { deleteDiscount, getDiscounts } from "@/admin/api";
import DashboardLayout from "@/admin/components/Layout";
import AddIcon from "@/shared/assets/icons/add.svg";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import DiscountTable from "@/admin/components/DiscountTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardDiscountList() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    discounts: Discount[];
  }>({ countOfItems: 0, discounts: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [pendingDeleteRequest, setPendingDeleteRequest] = useState<
    number | null
  >(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - کدهای تخفیف</title>
      </Head>
      <SectionHeader
        title="کدهای تخفیف"
        description="کدهای تخفیف را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه کدهای تخفیف"
          end={
            <Link href="/dashboard/discounts/new">
              <Button style={{ padding: 0 }}>
                ایجاد کد تخفیف <AddIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه کدهای تخفیف"
          end={
            <Link href="/dashboard/discounts/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getDiscounts(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <DiscountTable
            discounts={data.discounts}
            onEditDiscount={(discountId) =>
              router.push(`/dashboard/discounts/${discountId}/edit`)
            }
            onDeleteDiscount={setPendingDeleteRequest}
          />
          {!data.discounts.length && (
            <EmptyNote>هیچ کد تخفیفی وجود ندارید</EmptyNote>
          )}
          <WarningConfirmDialog
            open={pendingDeleteRequest !== null}
            onClose={() => {
              setPendingDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteDiscount(pendingDeleteRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingDeleteRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
            message="از حذف این کد تخفیف مطمئن هستید؟"
            confirmButtonText="حذف"
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardDiscountList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
