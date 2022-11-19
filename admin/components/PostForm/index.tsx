import styles from "./style.module.scss";
import { useRef, useState } from "react";
import { PostCategory } from "@/shared/types";
import TextArea from "@/shared/components/TextArea";
import TextInput from "@/shared/components/TextInput";
import InfoTooltip from "@/shared/components/InfoTooltip";
import Radio from "@/shared/components/Radio";
import Editor from "@/admin/components/PostForm/Editor";
import Button from "@/shared/components/Button";
import BottomActions from "@/shared/components/Dashboard/BottomActions";
import PostCategoryMultiSelect from "@/admin/components/PostCategoryMultiSelect";
import PostThumbnailUpload from "@/admin/components/PostThumbnailUpload";

interface PostFormData {
  slug: string;
  pageTitle: string;
  title: string;
  categories: PostCategory[];
  keywords: string;
  metaDescription: string;
  thumbnailUrl: string | null;
  thumbnailAlt: string | null;
  display: boolean;
  body: string;
}

interface PostFormProps {
  defaultValues?: Partial<PostFormData>;
  onSave: (data: PostFormData) => Promise<any>;
}

export default function PostForm({ defaultValues, onSave }: PostFormProps) {
  const [slug, setSlug] = useState(defaultValues?.slug || "");
  const [pageTitle, setPageTitle] = useState(defaultValues?.pageTitle || "");
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [categories, setCategories] = useState(defaultValues?.categories || []);
  const [keywords, setKeywords] = useState(defaultValues?.keywords || "");
  const [metaDescription, setMetaDescription] = useState(
    defaultValues?.metaDescription || ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    defaultValues?.thumbnailUrl || null
  );
  const [thumbnailAlt, setThumbnailAlt] = useState(
    defaultValues?.thumbnailAlt || ""
  );
  const [display, setDisplay] = useState(defaultValues?.display || false);
  const getPostBodyRef = useRef<(() => string | null) | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Form}>
          <div className={styles.Label}>عنوان نمایشی:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "عنوان نمایشی" }}
              value={title}
              onChange={setTitle}
            />
          </div>
          <div className={styles.Label}>عنوان صفحه:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "عنوان صفحه" }}
              value={pageTitle}
              onChange={setPageTitle}
            />
          </div>
          <div className={styles.Label}>لینک صفحه:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "لینک صفحه" }}
              value={slug}
              onChange={setSlug}
            />
          </div>
          <div className={styles.Label}>دسته بندی ها:</div>
          <div className={styles.Input}>
            <PostCategoryMultiSelect
              value={categories}
              onSelectCategory={(category) =>
                setCategories([...categories, category])
              }
              onUnSelectCategory={(category) =>
                setCategories(
                  categories.filter((item) => item.id !== category.id)
                )
              }
              placeholder="دسته بندی ها"
            />
          </div>
          <div className={styles.Label}>کلمات کلیدی:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "کلمات کلیدی" }}
              value={keywords}
              onChange={setKeywords}
              suffix={
                <InfoTooltip message="کلمات کلیدی را با استفاده از کاما از هم جدا کنید" />
              }
              boxProps={{
                style: {
                  paddingLeft: 10,
                },
              }}
            />
          </div>
          <div className={styles.Label}>توضیحات متا:</div>
          <div className={styles.Input}>
            <TextArea
              placeholder="توضیحات متا"
              value={metaDescription}
              onTextChange={setMetaDescription}
              rows={4}
            />
          </div>
        </div>
        <div className={styles.Form}>
          <div className={styles.Label}>تصویر:</div>
          <div className={styles.Input}>
            <PostThumbnailUpload
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
            />
          </div>
          <div className={styles.Label}>تصویر Alt:</div>
          <div className={styles.Input}>
            <TextInput
              inputProps={{ placeholder: "Alt تصویر" }}
              value={thumbnailAlt}
              onChange={setThumbnailAlt}
            />
          </div>
          <div className={styles.Label}>نوع:</div>
          <div className={styles.Input}>
            <div className={styles.RadioList}>
              <div>
                <Radio
                  checked={display === false}
                  onChecked={() => setDisplay(false)}
                />
                پیش نویس
              </div>
              <div>
                <Radio
                  checked={display === true}
                  onChecked={() => setDisplay(true)}
                />
                انتشار
              </div>
            </div>
          </div>
        </div>
        <div>
          <Editor
            id="PostBody"
            initialContent={defaultValues?.body}
            getContentRef={getPostBodyRef}
          />
        </div>
      </div>
      <BottomActions>
        <Button
          varient="filled"
          style={{ minWidth: 100 }}
          onClick={() => {
            setIsSubmitting(true);
            onSave({
              slug,
              pageTitle,
              title,
              categories,
              keywords,
              metaDescription,
              thumbnailUrl,
              thumbnailAlt,
              display,
              body: getPostBodyRef.current
                ? getPostBodyRef.current() || ""
                : "",
            }).finally(() => setIsSubmitting(false));
          }}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          ذخیره
        </Button>
      </BottomActions>
    </>
  );
}
