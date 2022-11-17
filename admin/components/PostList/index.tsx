import styles from "./styles.module.scss";
import { FormattedNumber } from "react-intl";
import { Post } from "@/shared/types";
import ViewIcon from "@/shared/assets/icons/view.svg";
import ButtonList from "@/shared/components/ButtonList";

interface PostGridProps {
  posts: Post[];
  onEditPost: (postId: number) => void;
  onDeletePost: (postId: number) => void;
}

export default function PostGrid({
  posts,
  onEditPost,
  onDeletePost,
}: PostGridProps) {
  return (
    <div className={styles.PostGrid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.Post}>
          {post.thumbnailUrl && (
            <div className={styles.PostThumbnail}>
              <img src={post.thumbnailUrl} alt={post.thumbnailAlt || ""} />
            </div>
          )}
          <div className={styles.PostTitle}>{post.title}</div>
          <div className={styles.PostAuthor}>نویسنده: {post.admin.name}</div>
          <div className={styles.PostCategories}>
            دسته بندی ها:{" "}
            {post.categories.map((category) => category.name).join("، ")}
          </div>
          <div className={styles.PostExcerpt}>{post.metaDescription}</div>
          <div className={styles.PostBottom}>
            <div className={styles.PostMetaData}>
              <div>
                <ViewIcon /> <FormattedNumber value={20} />
              </div>
            </div>
            <ButtonList>
              <button
                className={styles.DeleteButton}
                onClick={() => onDeletePost(post.id)}
              >
                حذف
              </button>
              <button
                className={styles.EditButton}
                onClick={() => onEditPost(post.id)}
              >
                ویرایش
              </button>
            </ButtonList>
          </div>
        </div>
      ))}
    </div>
  );
}
