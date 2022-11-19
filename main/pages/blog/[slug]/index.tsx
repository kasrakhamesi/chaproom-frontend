import styles from "./style.module.scss";
import { FormattedDate, FormattedNumber } from "react-intl";
import Head from "next/head";
import Layout from "@/main/components/Layout";
import DateIcon from "@/shared/assets/icons/date.svg";
import ViewIcon from "@/shared/assets/icons/view.svg";
import { Post } from "@/shared/types";
import { useState } from "react";
import { useRouter } from "next/router";
import DataLoader from "@/shared/components/DataLoader";
import { getBlogPost } from "@/main/api";

export default function BlogPost() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const [data, setData] = useState<Post>();

  return (
    <Layout>
      <Head>
        <title>وبلاگ</title>
      </Head>
      <div className={styles.Container}>
        <DataLoader
          load={() => {
            if (router.isReady) return getBlogPost(slug);
          }}
          deps={[router.isReady]}
          setData={setData}
        >
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              {data?.thumbnailUrl && (
                <img src={data.thumbnailUrl} alt={data.thumbnailAlt || ""} />
              )}
            </div>
            <div className={styles.PostHeader}>
              <div className={styles.PostMetaData}>
                <div>
                  <DateIcon />
                  <FormattedDate value={data?.lastUpdateDate} />
                </div>
                <div>
                  <ViewIcon />
                  <FormattedNumber value={data?.countOfViews || 0} />
                </div>
              </div>
              <h1 className={styles.PostTitle}>{data?.title}</h1>
            </div>
            <div
              className={styles.PostContent}
              dangerouslySetInnerHTML={{ __html: data?.body || "" }}
            />
          </div>
        </DataLoader>
      </div>
    </Layout>
  );
}
