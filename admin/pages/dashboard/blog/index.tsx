import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { useRouter } from "next/router";
import { Post } from "@/shared/types";
import { deleteBlogPost, getBlogPosts } from "@/admin/api";
import DashboardLayout from "@/admin/components/Layout";
import AddIcon from "@/shared/assets/icons/add.svg";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import IconButton from "@/shared/components/IconButton";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import PostGrid from "@/admin/components/PostList";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";
import Link from "next/link";

export default function DashboardBlog() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    posts: Post[];
  }>({ countOfItems: 0, posts: [] });

  const [page, setPage] = useState(1);

  const [pendingDeleteRequest, setPendingDeleteRequest] = useState<
    number | null
  >(null);

  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <>
      <Head>
        <title>داشبورد - وبلاگ</title>
      </Head>
      <SectionHeader
        title="وبلاگ"
        description="وبلاگ را از این بخش مدیریت کنید"
        hideBackToSiteButton
      />
      <SectionContent>
        <ContentHeader
          title="همه وبلاگ ها"
          end={
            <Link href="/dashboard/blog/new">
              <Button style={{ padding: 0 }}>
                ایجاد وبلاگ <AddIcon />
              </Button>
            </Link>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه وبلاگ ها"
          end={
            <Link href="/dashboard/blog/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <DataLoader
          load={() => getBlogPosts(page)}
          deps={[page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <PostGrid
            posts={data.posts}
            onDeletePost={setPendingDeleteRequest}
            onEditPost={(postId) =>
              router.push(`/dashboard/blog/${postId}/edit`)
            }
          />
          {!data.posts.length && <EmptyNote>هیچ بلاگی وجود ندارید</EmptyNote>}
          <WarningConfirmDialog
            open={pendingDeleteRequest !== null}
            onClose={() => {
              setPendingDeleteRequest(null);
            }}
            onConfirm={() =>
              deleteBlogPost(pendingDeleteRequest!)
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

DashboardBlog.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
