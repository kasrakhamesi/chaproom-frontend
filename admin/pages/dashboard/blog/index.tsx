import { ReactElement, useRef, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Link from "next/link";
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
import ButtonList from "@/shared/components/ButtonList";
import Button from "@/shared/components/Button";
import Controls from "@/admin/components/Controls";
import SearchInput from "@/admin/components/SearchInput";
import DataLoader from "@/shared/components/DataLoader";
import PostGrid from "@/admin/components/PostList";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import Pagination from "@/shared/components/Pagination";
import WarningConfirmDialog from "@/shared/components/Dashboard/WarningConfirmDialog";

export default function DashboardBlog() {
  const router = useRouter();

  const [data, setData] = useState<{
    totalCount: number;
    pageSize: number;
    posts: Post[];
  }>({ totalCount: 0, pageSize: 0, posts: [] });

  const [search, setSearch] = useState("");
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
        description="- وبلاگ را از این بخش مدیریت کنید"
        isAdmin
      />
      <SectionContent>
        <ContentHeader
          title="همه وبلاگ ها"
          end={
            <ButtonList>
              <Link href="/dashboard/blog/categories">
                <Button
                  varient="content-title-outlined"
                  style={{ minWidth: 170 }}
                >
                  مدیریت دسته بندی ها
                </Button>
              </Link>
              <Link href="/dashboard/blog/posts/new">
                <Button varient="content-title-none">
                  ایجاد وبلاگ <AddIcon />
                </Button>
              </Link>
            </ButtonList>
          }
        />
        <MobileContentHeader
          backTo="/dashboard"
          title="همه وبلاگ ها"
          end={
            <Link href="/dashboard/blog/posts/new">
              <IconButton varient="filled">
                <AddIcon />
              </IconButton>
            </Link>
          }
        />
        <Controls
          start={
            <SearchInput
              inputProps={{ placeholder: "جستجو بلاگ با عنوان" }}
              value={search}
              setValue={(newValue) => {
                setSearch(newValue);
                setPage(1);
              }}
            />
          }
        />
        <DataLoader
          load={() => getBlogPosts(search, page)}
          deps={[search, page]}
          setData={setData}
          reloadRef={reloadRef}
        >
          <PostGrid
            posts={data.posts}
            onDeletePost={setPendingDeleteRequest}
            onEditPost={(postId) =>
              router.push(`/dashboard/blog/posts/${postId}/edit`)
            }
          />
          {!data.posts.length && <EmptyNote>هیچ بلاگی وجود ندارید</EmptyNote>}
          <Pagination
            currentPage={page}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            onPageChange={setPage}
          />
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
            message="از حذف این بلاگ مطمئن هستید؟"
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
