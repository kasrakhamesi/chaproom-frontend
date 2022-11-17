import styles from "./style.module.scss";
import { ReactElement, useState } from "react";
import { FormattedDate, FormattedNumber } from "react-intl";
import StickyBox from "react-sticky-box";
import Head from "next/head";
import Layout from "@/main/components/Layout";
import DateIcon from "@/shared/assets/icons/date.svg";
import ViewIcon from "@/shared/assets/icons/view.svg";
import Radio from "@/shared/components/Radio";
import Button from "@/shared/components/Button";

export default function Blog() {
  const [category, setCategory] = useState("");

  return (
    <>
      <Head>
        <title>وبلاگ</title>
      </Head>
      <div className={styles.Container}>
        <div className={styles.Posts}>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
          <div className={styles.Post}>
            <div className={styles.PostThumbnail}>
              <img
                src="/assets/images/post-thumbnail.jpg"
                alt="چاپ کتاب با یک کلیک!"
              />
            </div>
            <div className={styles.PostTitle}>چاپ کتاب با یک کلیک!</div>
            <div className={styles.PostContent}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای
              زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و
              متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان
              رایانه ای علی الخصوص طراحان خلاقی
            </div>
            <div className={styles.PostFooter}>
              <div>
                <div>
                  <DateIcon /> <FormattedDate value={new Date()} />
                </div>
                <div>
                  <ViewIcon /> <FormattedNumber value={20} />
                </div>
              </div>
              <Button varient="filled">مشاهده بیشتز</Button>
            </div>
          </div>
        </div>
        <div>
          <StickyBox offsetTop={30} offsetBottom={30}>
            <div className={styles.Sidebar}>
              <div className={styles.Widget}>
                <div className={styles.WidgetTitle}>دسته بندی</div>
                <div className={styles.CategoryList}>
                  <div onClick={() => setCategory("")}>
                    <Radio checked={category === ""} />
                    <div>همه</div>
                    <div>221</div>
                  </div>
                  <div onClick={() => setCategory("book-print")}>
                    <Radio checked={category === "book-print"} />
                    <div>چاپ کتاب</div>
                    <div>93</div>
                  </div>
                  <div onClick={() => setCategory("cheap-print")}>
                    <Radio checked={category === "cheap-print"} />
                    <div>پرینت ارزان</div>
                    <div>79</div>
                  </div>
                  <div onClick={() => setCategory("colorful-print")}>
                    <Radio checked={category === "colorful-print"} />
                    <div>پرینت رنگی</div>
                    <div>21</div>
                  </div>
                  <div onClick={() => setCategory("black-and-white-print")}>
                    <Radio checked={category === "black-and-white-print"} />
                    <div>پرینت سیاه سفید</div>
                    <div>4</div>
                  </div>
                  <div onClick={() => setCategory("picture-print")}>
                    <Radio checked={category === "picture-print"} />
                    <div>چاپ عکس</div>
                    <div>24</div>
                  </div>
                </div>
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
          </StickyBox>
        </div>
      </div>
    </>
  );
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
