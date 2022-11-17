import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import ArrowBackIcon from "@/shared/assets/icons/arrowBack.svg";
import DashboardLayout from "@/admin/components/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import Button from "@/shared/components/Button";
import PostForm from "@/admin/components/PostForm";
import { newBlogPost } from "@/admin/api";
import toast from "react-hot-toast";

export default function DashboardNewPost() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>داشبورد - ایجاد بلاگ</title>
      </Head>
      <SectionHeader
        title="وبلاگ"
        description="وبلاگ را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="ایجاد بلاگ جدید"
          end={
            <Link href="/dashboard/blog">
              <Button style={{ padding: 0 }}>
                انصراف و بازگشت <ArrowBackIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard/blog"
          title="ایجاد بلاگ جدید"
        />
        <PostForm
          onSave={(postFormData) => newBlogPost(postFormData).then((message) => {
            toast.success(message);
            router.push("/dashboard/blog");
          }).catch(toast.error)}
        />
      </SectionContent>
    </>
  );
}

DashboardNewPost.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
