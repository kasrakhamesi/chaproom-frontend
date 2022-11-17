import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { getProfile, updateProfile } from "@/admin/api";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import DataLoader from "@/shared/components/DataLoader";
import ProfileForm from "@/shared/components/Dashboard/ProfileForm";

export default function DashboardProfile() {
  const [data, setData] = useState<{
    avatar: string | null;
    name: string;
    phoneNumber: string;
  }>({
    avatar: null,
    name: "",
    phoneNumber: "",
  });

  return (
    <>
      <Head>
        <title>داشبورد - پروفایل</title>
      </Head>
      <SectionHeader
        title="پروفایل"
        description="تنظیمات پروفایل خود را از این بخش تغییر دهید"
      />
      <SectionContent>
        <ContentHeader title="اطلاعات من" />
        <MobileContentHeader backTo="/dashboard" title="اطلاعات من" />
        <DataLoader load={() => getProfile()} setData={setData}>
          <ProfileForm
            defaultValues={{
              phoneNumber: data.phoneNumber,
              name: data.name,
            }}
            onSave={(userFormData) =>
              updateProfile(userFormData.name, userFormData.password)
                .then(toast.success)
                .catch(toast.error)
            }
          />
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardProfile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
