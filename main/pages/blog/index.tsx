import styles from "./style.module.scss";
import { ReactElement, useState } from "react";
import { FormattedDate, FormattedNumber } from "react-intl";
import Head from "next/head";
import Layout from "@/main/components/Layout";
import DateIcon from "@/shared/assets/icons/date.svg";
import ViewIcon from "@/shared/assets/icons/view.svg";
import Radio from "@/shared/components/Radio";
import Button from "@/shared/components/Button";
import DataLoader from "@/shared/components/DataLoader";
import {
  getBlogCategories,
  getBlogPosts,
  getBlogPostsByCategory,
} from "@/main/api";
import { Post, PostCategory } from "@/shared/types";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import Link from "next/link";

export default function Blog() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [data, setData] = useState<{
    countOfItems: number;
    pageSize: number;
    posts: Post[];
  }>({
    countOfItems: 0,
    pageSize: 0,
    posts: [],
  });

  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState<PostCategory[]>([]);

  return (
    <>
      <Head>
        <title>وبلاگ</title>
      </Head>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <DataLoader
            load={() =>
              selectedCategoryId !== null
                ? getBlogPostsByCategory(selectedCategoryId, page)
                : getBlogPosts(page)
            }
            deps={[selectedCategoryId, page]}
            setData={setData}
          >
            <div className={styles.Posts}>
              {data.posts.map((post) => (
                <div key={post.id} className={styles.Post}>
                  {post.thumbnailUrl && (
                    <div className={styles.PostThumbnail}>
                      <img
                        src={post.thumbnailUrl}
                        alt={post.thumbnailAlt || ""}
                      />
                    </div>
                  )}
                  <div className={styles.PostTitle}>{post.title}</div>
                  <div className={styles.PostContent}>
                    {post.metaDescription}
                  </div>
                  <div className={styles.PostFooter}>
                    <div>
                      <div>
                        <DateIcon />
                        <FormattedDate value={post.lastUpdateDate} />
                      </div>
                      <div>
                        <ViewIcon />
                        <FormattedNumber value={post.countOfViews} />
                      </div>
                    </div>
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                      <Button varient="filled">مشاهده بیشتز</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {!data.posts.length && <EmptyNote>هیچ بلاگی وجود ندارد</EmptyNote>}
          </DataLoader>
        </div>
        <div>
          <div className={styles.Sidebar}>
            <div className={styles.Widget}>
              <div className={styles.WidgetTitle}>دسته بندی</div>
              <DataLoader
                load={() => getBlogCategories()}
                setData={setCategories}
              >
                <div className={styles.CategoryList}>
                  <div onClick={() => setSelectedCategoryId(null)}>
                    <Radio checked={selectedCategoryId === null} />
                    <div>همه</div>
                    <div>
                      <FormattedNumber value={221} /> {/* TODO */}
                    </div>
                  </div>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategoryId(category.id)}
                    >
                      <Radio checked={selectedCategoryId === category.id} />
                      <div>{category.name}</div>
                      <div>
                        <FormattedNumber value={category.countOfBlogs} />
                      </div>
                    </div>
                  ))}
                </div>
              </DataLoader>
            </div>
            <div className={styles.Widget}>
              <div className={styles.WidgetTitle}>محبوبترین مقالات</div>
              <div className={styles.PopularPosts}>
                <div>
                  <div>
                    <img
                      src="/assets/images/post-thumbnail.jpg"
                      alt="چاپ کتاب با یک کلیک!"
                    />
                  </div>
                  <div>
                    <div>چاپ کتاب با یک کلیک!</div>
                    <div>
                      <FormattedDate value={new Date()} />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src="/assets/images/post-thumbnail.jpg"
                      alt="چاپ کتاب با یک کلیک!"
                    />
                  </div>
                  <div>
                    <div>چاپ کتاب با یک کلیک!</div>
                    <div>
                      <FormattedDate value={new Date()} />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src="/assets/images/post-thumbnail.jpg"
                      alt="چاپ کتاب با یک کلیک!"
                    />
                  </div>
                  <div>
                    <div>چاپ کتاب با یک کلیک!</div>
                    <div>
                      <FormattedDate value={new Date()} />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src="/assets/images/post-thumbnail.jpg"
                      alt="چاپ کتاب با یک کلیک!"
                    />
                  </div>
                  <div>
                    <div>چاپ کتاب با یک کلیک!</div>
                    <div>
                      <FormattedDate value={new Date()} />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src="/assets/images/post-thumbnail.jpg"
                      alt="چاپ کتاب با یک کلیک!"
                    />
                  </div>
                  <div>
                    <div>چاپ کتاب با یک کلیک!</div>
                    <div>
                      <FormattedDate value={new Date()} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
