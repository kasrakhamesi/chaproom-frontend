import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { getAdmin, updateAdmin } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import AdminForm from "@/admin/components/AdminForm";

export default function DashboardEditAdmin() {
  const router = useRouter();
  const adminId = parseInt(router.query.adminId as string);

  const [data, setData] = useState({
    phoneNumber: "",
    name: "",
  });

  return (
    <>
      <Head>
        <title>داشبورد - ویرایش ادمین</title>
      </Head>
      <SectionHeader
        title="ادمین ها"
        description="ادمین ها را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ویرایش کردن ادمین"
          end={
            <Link href="/dashboard/users/admins">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/users/admins"
          title="ویرایش کردن ادمین"
        />
        <DataLoader
          load={() => {
            if (router.isReady) return getAdmin(adminId);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <AdminForm
            defaultValues={data}
            isEdit={true}
            onSave={(userFormData) =>
              updateAdmin(adminId, userFormData)
                .then((message) => {
                  toast.success(message);
                  router.push("/dashboard/users/admins");
                })
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardEditAdmin.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
