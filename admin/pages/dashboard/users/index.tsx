import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { deleteUser, getUsers } from "@/admin/api";
import AddIcon from "@/shared/assets/icons/add.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import DataLoader from "@/shared/components/DataLoader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import ButtonList from "@/shared/components/ButtonList";
import UserTable from "@/admin/components/UserTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import UserMarketingDetailsDialog from "@/admin/components/UserMarketingDetailsDialog";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardUserList() {
  const router = useRouter();

  const [showAdminUsers, setShowAdminUsers] = useState<true | null>(null);
  const [showUserMarketingDetails, setShowUserMarketingDetails] = useState<
    number | null
  >(null);
  const [pendingUserDeleteRequest, setPendingUserDeleteRequest] = useState<
    number | null
  >(null);

  const [data, setData] = useState<{
    countOfItems: number;
    users: {
      id: number;
      name: string;
      phoneNumber: string;
      marketingBalance: number;
      walletBalance: number;
      countOfOrders: number;
    }[];
  }>({ countOfItems: 0, users: [] });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - کاربران</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="کاربران را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه کاربران"
          end={
            <ButtonList>
              <Link href="/dashboard/users/admins">
                <Button varient="filled">ادمین ها</Button>
              </Link>
              <Link href="/dashboard/users/new">
                <Button style={{ padding: 0 }}>
                  افزودن کاربر <AddIcon />
                </Button>
              </Link>
            </ButtonList>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه کاربران"
          end={
            <Link href="/dashboard/users/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getUsers(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <UserTable
            users={data.users}
            onSeeUserMarketingDetails={setShowUserMarketingDetails}
            onSeeUserOrderList={(userId) =>
              router.push(`/dashboard/users/${userId}/orders`)
            }
            onSeeUserAddressList={(userId) =>
              router.push(`/dashboard/users/${userId}/addresses`)
            }
            onDeleteUser={setPendingUserDeleteRequest}
            onLoginAsUser={(userId) =>
              router.push(`/dashboard/users/${userId}/edit`)
            }
            onEditUser={(userId) =>
              router.push(`/dashboard/users/${userId}/edit`)
            }
          />
          {!data.users.length && <EmptyNote>هیچ کاربری وجود ندارید</EmptyNote>}
          <UserMarketingDetailsDialog
            open={showUserMarketingDetails !== null}
            onClose={() => {
              setShowUserMarketingDetails(null);
            }}
            userId={showUserMarketingDetails!}
          />
          <WarningConfirmDialog
            open={pendingUserDeleteRequest !== null}
            onClose={() => {
              setPendingUserDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteUser(pendingUserDeleteRequest!)
                .then((message) => {
                  toast.success(message);
                  setPendingUserDeleteRequest(null);
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

DashboardUserList.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
