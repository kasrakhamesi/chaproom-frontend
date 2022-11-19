import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { AdminUserRole } from "@/shared/types";
import { deleteAdmin, getAdmins } from "@/admin/api";
import AddIcon from "@/shared/assets/icons/add.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import DataLoader from "@/shared/components/DataLoader";
import IconButton from "@/shared/components/IconButton";
import ButtonList from "@/shared/components/ButtonList";
import Button from "@/shared/components/Button";
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import AdminTable from "@/admin/components/AdminTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardAdminList() {
  const router = useRouter();

  const [pendingAdminDeleteRequest, setPendingAdminDeleteRequest] = useState<
    number | null
  >(null);

  const [data, setData] = useState<{
    countOfItems: number;
    admins: {
      id: number;
      name: string;
      phoneNumber: string;
      role: AdminUserRole;
    }[];
  }>({ countOfItems: 0, admins: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - ادمین ها</title>
      </Head>
      <SectionHeader
        title="ادمین ها"
        description="ادمین ها را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه ادمین ها"
          end={
            <ButtonList>
              <Link href="/dashboard/users">
                <Button
                  varient="content-title-outlined"
                  style={{ minWidth: 130 }}
                >
                  کاربران
                </Button>
              </Link>
              <Link href="/dashboard/users/admins/new">
                <Button varient="content-title-none">
                  افزودن ادمین <AddIcon />
                </Button>
              </Link>
            </ButtonList>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/users"
          title="همه ادمین ها"
          end={
            <Link href="/dashboard/users/admins/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "جستجو کاربر با نام یا موبایل" }}
              value={search}
              setValue={setSearch}
            />
          }
        />
        <DataLoader
          load={() => getAdmins(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <AdminTable
            admins={data.admins}
            onDeleteAdmin={setPendingAdminDeleteRequest}
            onEditAdmin={(adminId) =>
              router.push(`/dashboard/users/admins/${adminId}/edit`)
            }
          />
          {!data.admins.length && <EmptyNote>هیچ ادمینی وجود ندارید</EmptyNote>}
          <WarningConfirmDialog
            open={pendingAdminDeleteRequest !== null}
            onClose={() => {
              setPendingAdminDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteAdmin(pendingAdminDeleteRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingAdminDeleteRequest(null);
                  if (reloadRef.current) reloadRef.current();
                })
                .catch(toast.error)
            }
            message="از حذف این کاربر مطمئن هستید؟"
            confirmButtonText="حذف"
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardAdminList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
