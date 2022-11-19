import { ReactElement } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { newAdmin } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import AdminForm from "@/admin/components/AdminForm";

export default function DashboardNewAdmin() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - افزودن ادمین</title>
      </Head>
      <SectionHeader
        title="ادمین ها"
        description="ادمین ها را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="افزودن ادمین جدید"
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
          title="افزودن ادمین جدید"
        />
        <AdminForm
          onSave={(adminFormData) =>
            newAdmin(adminFormData)
              .then((message) => {
                toast.success(message);
                router.push("/dashboard/users/admins");
              })
              .catch(toast.error)
          }
        />
      </SectionContent>
    </>
  );
}

DashboardNewAdmin.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
