import { ReactElement } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
import { newUser } from "@/admin/api";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import UserForm from "@/admin/components/UserForm";

export default function DashboardNewUser() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - افزودن کاربر</title>
      </Head>
      <SectionHeader
        title="کاربران"
        description="کاربران را از این بخش اضافه و ویرایش کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="افزودن کاربر جدید"
          end={
            <Link href="/dashboard/users">
              <Button varient="content-title-none">
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/users"
          title="افزودن کاربر جدید"
        />
        <UserForm
          onSave={(userFormData) =>
            newUser(userFormData)
              .then((message) => {
                toast.success(message);
                router.push("/dashboard/users");
              })
              .catch(toast.error)
          }
        />
      </SectionContent>
    </>
  );
}

DashboardNewUser.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
